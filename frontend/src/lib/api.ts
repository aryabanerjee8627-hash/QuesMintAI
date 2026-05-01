import { createClient } from "@/lib/supabase/client"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const api = {

  async getAuthHeaders() {
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()
    
    return {
      'Authorization': `Bearer ${session?.access_token}`,
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
  }
}
