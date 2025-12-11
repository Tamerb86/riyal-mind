"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { OnboardingWizard } from "./onboarding-wizard"

interface OnboardingContextType {
  showWizard: boolean
  setShowWizard: (show: boolean) => void
  hasCompletedOnboarding: boolean
  completeOnboarding: () => void
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (!context) {
    throw new Error("useOnboarding must be used within OnboardingProvider")
  }
  return context
}

interface OnboardingProviderProps {
  children: ReactNode
  userId?: string
}

export function OnboardingProvider({ children, userId }: OnboardingProviderProps) {
  const [showWizard, setShowWizard] = useState(false)
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(true)

  useEffect(() => {
    if (userId) {
      // Check if user has completed onboarding
      const storageKey = `onboarding_completed_${userId}`
      const completed = localStorage.getItem(storageKey)
      
      if (!completed) {
        setHasCompletedOnboarding(false)
        // Show wizard after a short delay for better UX
        setTimeout(() => {
          setShowWizard(true)
        }, 500)
      }
    }
  }, [userId])

  const completeOnboarding = () => {
    if (userId) {
      const storageKey = `onboarding_completed_${userId}`
      localStorage.setItem(storageKey, "true")
      setHasCompletedOnboarding(true)
      setShowWizard(false)
    }
  }

  const handleSkip = () => {
    completeOnboarding()
  }

  return (
    <OnboardingContext.Provider
      value={{
        showWizard,
        setShowWizard,
        hasCompletedOnboarding,
        completeOnboarding,
      }}
    >
      {children}
      {showWizard && (
        <OnboardingWizard
          onComplete={completeOnboarding}
          onSkip={handleSkip}
        />
      )}
    </OnboardingContext.Provider>
  )
}
