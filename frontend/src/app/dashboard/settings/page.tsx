"use client"

import { useEffect, useState } from "react"
import { 
  User, 
  BrainCircuit,
  Save,
  Loader2
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { createClient } from "@/lib/supabase/client"
import { api } from "@/lib/api"
import { toast } from "sonner"

export default function SettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [usage, setUsage] = useState({ used: 0, limit: 10 })
  
  const supabase = createClient()

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          setFullName(user.user_metadata?.full_name || "")
          setEmail(user.email || "")
        }

        const usageData = await api.getUsage()
        setUsage(usageData)
      } catch (error) {
        console.error("Failed to load settings:", error)
        toast.error("Failed to load account settings")
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const handleUpdateProfile = async () => {
    setSaving(true)
    try {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: fullName }
      })
      if (error) throw error
      toast.success("Profile updated successfully")
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  const usagePercentage = (usage.used / usage.limit) * 100

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-20">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account and view your daily usage.</p>
      </div>

      <div className="space-y-6">
        {/* Profile Section */}
        <Card className="border-white/5 bg-navy-surface/40 backdrop-blur-md rounded-3xl shadow-xl">
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              <CardTitle>Public Profile</CardTitle>
            </div>
            <CardDescription className="font-medium">Update your personal information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Full Name</label>
                <Input 
                  value={fullName} 
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="bg-white/5 border-white/10 focus:border-primary/50 h-12 rounded-xl" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Email Address</label>
                <Input value={email} className="bg-white/5 border-white/10 h-12 rounded-xl" disabled />
                <p className="text-xs text-muted-foreground font-medium">Email cannot be changed.</p>
              </div>
            </div>

            <Button 
              onClick={handleUpdateProfile} 
              disabled={saving}
              className="bg-primary text-primary-foreground hover:bg-primary-hover w-full sm:w-auto h-12"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Usage Section */}
        <Card className="border-white/5 bg-navy-surface/40 backdrop-blur-md rounded-3xl shadow-xl">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-primary" />
              <CardTitle>Daily Usage</CardTitle>
            </div>
            <CardDescription className="font-medium">Quizzes generated in the last 24 hours.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground font-medium">Quizzes Generated</span>
                <span className="font-bold">{usage.used} / {usage.limit}</span>
              </div>
              <Progress value={usagePercentage} className="h-2 bg-white/5" indicatorClassName="bg-primary shadow-[0_0_10px_#3DD9B3]" />
              <p className="text-xs text-muted-foreground font-medium">
                Your limit resets every day at 00:00 UTC.
              </p>
            </div>
            
            <Separator className="bg-white/5" />
            
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
              <p className="text-sm text-primary/80 font-medium">
                <strong className="text-primary uppercase tracking-widest mr-2">Free Tier</strong> 
                You are currently on the free plan with a daily limit of {usage.limit} quizzes.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-500/20 bg-red-500/5">
          <CardHeader>
            <CardTitle className="text-red-400">Danger Zone</CardTitle>
            <CardDescription>Irreversible actions for your account.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-sm">Delete Account</div>
                <div className="text-xs text-muted-foreground">Permanently delete your account and all data.</div>
              </div>
              <Button variant="destructive" size="sm">Delete Account</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
