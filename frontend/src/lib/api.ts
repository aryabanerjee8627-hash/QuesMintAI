import { createClient } from "@/lib/supabase/client"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const api = {

  async getAuthHeaders() {
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      console.warn("API: No session found in getAuthHeaders")
      throw new Error('No active session found. Please log in.')
    }
    
    const token = session.access_token
    // Safely log the structure of the token for debugging
    console.debug(`API: Sending token with ${token?.split('.').length} segments`)
    
    return {
      'Authorization': `Bearer ${token}`,
    }
  },

  async generateQuiz(formData: FormData) {
    const headers = await this.getAuthHeaders()

    const response = await fetch(`${API_URL}/quiz/generate`, {
      method: 'POST',
      headers: {
        ...headers,
      },
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.detail || 'Failed to generate quiz')
    }

    return response.json()
  },

  async getHistory() {
    const headers = await this.getAuthHeaders()
    
    const response = await fetch(`${API_URL}/quiz/history`, {
      headers: { ...headers }
    })

    if (!response.ok) throw new Error('Failed to fetch history')
    
    return response.json()
  },

  async getQuiz(id: string) {
    const headers = await this.getAuthHeaders()
    
    const response = await fetch(`${API_URL}/quiz/${id}`, {
      headers: { ...headers }
    })

    if (!response.ok) throw new Error('Failed to fetch quiz')
    
    return response.json()
  },

  async deleteQuiz(id: string) {
    const headers = await this.getAuthHeaders()
    
    const response = await fetch(`${API_URL}/quiz/${id}`, {
      method: 'DELETE',
      headers: { ...headers }
    })

    if (!response.ok) throw new Error('Failed to delete quiz')
    
    return response.json()
  },

  async getUsage() {
    const headers = await this.getAuthHeaders()
    
    const response = await fetch(`${API_URL}/quiz/usage`, {
      headers: { ...headers }
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.detail || `Failed to fetch usage stats (Status: ${response.status})`)
    }
    
    return response.json()
  }
}
