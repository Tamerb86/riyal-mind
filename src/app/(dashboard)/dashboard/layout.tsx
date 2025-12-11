import * as React from "react"
import { auth } from "@/auth"
import { OnboardingProvider } from "@/components/onboarding/onboarding-provider"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps): Promise<JSX.Element> {
  const session = await auth()
  const userId = session?.user?.id
  
  return (
    <OnboardingProvider userId={userId}>
      <div className="min-h-screen bg-gray-50">
        {children}
      </div>
    </OnboardingProvider>
  )
}
