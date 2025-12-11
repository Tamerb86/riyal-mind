"use client"

import { HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useOnboarding } from "./onboarding-provider"

export function ShowWizardButton() {
  const { setShowWizard } = useOnboarding()

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setShowWizard(true)}
      className="flex items-center gap-2"
    >
      <HelpCircle className="w-4 h-4" />
      جولة في التطبيق
    </Button>
  )
}
