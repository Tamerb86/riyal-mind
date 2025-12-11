import { describe, it, expect, vi, beforeEach } from 'vitest'
import { POST as createCheckoutSession } from '@/app/api/stripe/create-checkout-session/route'
import { POST as stripeWebhook } from '@/app/api/stripe/webhook/route'

// Mock dependencies
vi.mock('@/auth', () => ({
  auth: vi.fn(),
}))

vi.mock('@/lib/stripe', () => ({
  stripe: {
    checkout: {
      sessions: {
        create: vi.fn(),
      },
    },
    subscriptions: {
      retrieve: vi.fn(),
    },
    webhooks: {
      constructEvent: vi.fn(),
    },
  },
  STRIPE_PLANS: {
    individual_monthly: 'price_individual_monthly',
    individual_yearly: 'price_individual_yearly',
    family_monthly: 'price_family_monthly',
    family_yearly: 'price_family_yearly',
  },
}))

vi.mock('@/lib/db', () => ({
  prisma: {
    user: {
      update: vi.fn(),
    },
    notification: {
      create: vi.fn(),
    },
  },
}))

describe('Stripe API - Create Checkout Session', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should create a checkout session with trial period', async () => {
    const { auth } = await import('@/auth')
    const { stripe } = await import('@/lib/stripe')
    
    // Mock authenticated user
    vi.mocked(auth).mockResolvedValue({
      user: {
        id: 'test-user-id',
        email: 'test@example.com',
        name: 'Test User',
      },
    } as any)

    // Mock Stripe checkout session creation
    vi.mocked(stripe.checkout.sessions.create).mockResolvedValue({
      id: 'cs_test_123',
      url: 'https://checkout.stripe.com/test',
    } as any)

    const request = new Request('http://localhost:3000/api/stripe/create-checkout-session', {
      method: 'POST',
      body: JSON.stringify({ planType: 'individual_monthly' }),
    })

    const response = await createCheckoutSession(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toHaveProperty('sessionId')
    expect(data).toHaveProperty('url')
    expect(stripe.checkout.sessions.create).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: 'subscription',
        subscription_data: expect.objectContaining({
          trial_period_days: 30,
        }),
      })
    )
  })

  it('should return 401 for unauthenticated users', async () => {
    const { auth } = await import('@/auth')
    
    // Mock unauthenticated user
    vi.mocked(auth).mockResolvedValue(null)

    const request = new Request('http://localhost:3000/api/stripe/create-checkout-session', {
      method: 'POST',
      body: JSON.stringify({ planType: 'individual_monthly' }),
    })

    const response = await createCheckoutSession(request)
    const data = await response.json()

    expect(response.status).toBe(401)
    expect(data).toHaveProperty('error')
  })

  it('should return 400 for invalid plan type', async () => {
    const { auth } = await import('@/auth')
    
    vi.mocked(auth).mockResolvedValue({
      user: {
        id: 'test-user-id',
        email: 'test@example.com',
      },
    } as any)

    const request = new Request('http://localhost:3000/api/stripe/create-checkout-session', {
      method: 'POST',
      body: JSON.stringify({ planType: 'invalid_plan' }),
    })

    const response = await createCheckoutSession(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data).toHaveProperty('error')
  })
})

describe('Stripe API - Webhook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should handle checkout.session.completed event', async () => {
    const { stripe } = await import('@/lib/stripe')
    const { prisma } = await import('@/lib/db')

    const mockEvent = {
      type: 'checkout.session.completed',
      data: {
        object: {
          client_reference_id: 'test-user-id',
          customer: 'cus_test_123',
          subscription: 'sub_test_123',
          metadata: {
            planType: 'individual_monthly',
          },
        },
      },
    }

    vi.mocked(stripe.webhooks.constructEvent).mockReturnValue(mockEvent as any)
    vi.mocked(stripe.subscriptions.retrieve).mockResolvedValue({
      status: 'trialing',
      trial_end: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60, // 30 days from now
    } as any)

    const request = new Request('http://localhost:3000/api/stripe/webhook', {
      method: 'POST',
      headers: {
        'stripe-signature': 'test-signature',
      },
      body: JSON.stringify(mockEvent),
    })

    const response = await stripeWebhook(request)

    expect(response.status).toBe(200)
    expect(prisma.user.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 'test-user-id' },
        data: expect.objectContaining({
          subscriptionStatus: 'trialing',
          hasUsedTrial: true,
        }),
      })
    )
  })

  it('should handle subscription.updated event', async () => {
    const { stripe } = await import('@/lib/stripe')
    const { prisma } = await import('@/lib/db')

    const mockEvent = {
      type: 'customer.subscription.updated',
      data: {
        object: {
          id: 'sub_test_123',
          status: 'active',
          current_period_end: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
        },
      },
    }

    vi.mocked(stripe.webhooks.constructEvent).mockReturnValue(mockEvent as any)

    const request = new Request('http://localhost:3000/api/stripe/webhook', {
      method: 'POST',
      headers: {
        'stripe-signature': 'test-signature',
      },
      body: JSON.stringify(mockEvent),
    })

    const response = await stripeWebhook(request)

    expect(response.status).toBe(200)
    expect(prisma.user.update).toHaveBeenCalled()
  })
})
