"use client"

import { useState } from "react"
import { 
  User, 
  Mail, 
  Bell, 
  Shield, 
  CreditCard,
  LogOut
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function SettingsPage() {
  const [loading, setLoading] = useState(false)

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <nav className="space-y-1">
          {[
            { label: "Profile", icon: User, active: true },
            { label: "Security", icon: Shield, active: false },
            { label: "Billing", icon: CreditCard, active: false },
            { label: "Notifications", icon: Bell, active: false },
          ].map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className={`w-full justify-start gap-3 ${item.active ? 'bg-white/5 text-violet-400' : 'text-muted-foreground'}`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Button>
          ))}
        </nav>

        <div className="md:col-span-3 space-y-8">
          <Card className="border-white/5 bg-white/5">
            <CardHeader>
              <CardTitle>Public Profile</CardTitle>
              <CardDescription>This information will be visible to other users.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-violet-600/20 border-2 border-violet-600/30 flex items-center justify-center text-3xl font-bold text-violet-400">
                  I
                </div>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5">Change Avatar</Button>
                  <p className="text-xs text-muted-foreground">JPG, GIF or PNG. Max size of 800K</p>
                </div>
              </div>

              <Separator className="bg-white/5" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Username</label>
                  <Input defaultValue="InternUser" className="bg-white/5 border-white/10" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input defaultValue="intern@questmint.ai" className="bg-white/5 border-white/10" disabled />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Bio</label>
                <Input placeholder="Tell us about yourself..." className="bg-white/5 border-white/10" />
              </div>

              <Button className="bg-violet-600 hover:bg-violet-700">Save Changes</Button>
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
                  <div className="font-medium">Delete Account</div>
                  <div className="text-sm text-muted-foreground">Permanently delete your account and all data.</div>
                </div>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
