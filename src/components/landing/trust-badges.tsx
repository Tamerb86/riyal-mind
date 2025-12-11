import { Shield, Lock, CreditCard, CheckCircle2 } from "lucide-react"

export default function TrustBadges() {
  const badges = [
    {
      icon: Shield,
      title: "آمن ومحمي",
      description: "تشفير 256-bit SSL"
    },
    {
      icon: Lock,
      title: "خصوصية تامة",
      description: "بياناتك ملكك فقط"
    },
    {
      icon: CreditCard,
      title: "دفع آمن",
      description: "معالجة عبر Stripe"
    },
    {
      icon: CheckCircle2,
      title: "موثوق",
      description: "10,000+ عائلة سعودية"
    }
  ]

  return (
    <section className="py-12 bg-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, index) => {
            const Icon = badge.icon
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center gap-3"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Icon className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{badge.title}</p>
                  <p className="text-xs text-gray-600">{badge.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
