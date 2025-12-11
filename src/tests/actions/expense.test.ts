import { describe, it, expect, vi, beforeEach } from 'vitest'
import { 
  createExpense, 
  updateExpense, 
  deleteExpense, 
  getExpenses 
} from '@/actions/expense'

// Mock dependencies
vi.mock('@/auth', () => ({
  auth: vi.fn(),
}))

vi.mock('@/lib/db', () => ({
  prisma: {
    expense: {
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      findMany: vi.fn(),
      count: vi.fn(),
    },
  },
}))

describe('Expense Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('createExpense', () => {
    it('should create a new expense successfully', async () => {
      const { auth } = await import('@/auth')
      const { prisma } = await import('@/lib/db')

      vi.mocked(auth).mockResolvedValue({
        user: { id: 'test-user-id' },
      } as any)

      const mockExpense = {
        id: 'expense-1',
        userId: 'test-user-id',
        categoryId: 1,
        amount: 100,
        description: 'Test expense',
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      vi.mocked(prisma.expense.create).mockResolvedValue(mockExpense as any)

      const result = await createExpense({
        categoryId: 1,
        amount: 100,
        description: 'Test expense',
        date: new Date(),
      })

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockExpense)
      expect(prisma.expense.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          userId: 'test-user-id',
          categoryId: 1,
          amount: 100,
        }),
      })
    })

    it('should return error for unauthenticated user', async () => {
      const { auth } = await import('@/auth')

      vi.mocked(auth).mockResolvedValue(null)

      const result = await createExpense({
        categoryId: 1,
        amount: 100,
        description: 'Test expense',
        date: new Date(),
      })

      expect(result.success).toBe(false)
      expect(result.error).toBe('غير مصرح')
    })

    it('should validate amount is positive', async () => {
      const { auth } = await import('@/auth')

      vi.mocked(auth).mockResolvedValue({
        user: { id: 'test-user-id' },
      } as any)

      const result = await createExpense({
        categoryId: 1,
        amount: -100,
        description: 'Test expense',
        date: new Date(),
      })

      expect(result.success).toBe(false)
      expect(result.error).toContain('المبلغ')
    })
  })

  describe('updateExpense', () => {
    it('should update an expense successfully', async () => {
      const { auth } = await import('@/auth')
      const { prisma } = await import('@/lib/db')

      vi.mocked(auth).mockResolvedValue({
        user: { id: 'test-user-id' },
      } as any)

      const mockExpense = {
        id: 'expense-1',
        userId: 'test-user-id',
        categoryId: 2,
        amount: 200,
        description: 'Updated expense',
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      vi.mocked(prisma.expense.update).mockResolvedValue(mockExpense as any)

      const result = await updateExpense('expense-1', {
        categoryId: 2,
        amount: 200,
        description: 'Updated expense',
      })

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockExpense)
    })
  })

  describe('deleteExpense', () => {
    it('should delete an expense successfully', async () => {
      const { auth } = await import('@/auth')
      const { prisma } = await import('@/lib/db')

      vi.mocked(auth).mockResolvedValue({
        user: { id: 'test-user-id' },
      } as any)

      vi.mocked(prisma.expense.delete).mockResolvedValue({} as any)

      const result = await deleteExpense('expense-1')

      expect(result.success).toBe(true)
      expect(prisma.expense.delete).toHaveBeenCalledWith({
        where: {
          id: 'expense-1',
          userId: 'test-user-id',
        },
      })
    })
  })

  describe('getExpenses', () => {
    it('should retrieve expenses with pagination', async () => {
      const { auth } = await import('@/auth')
      const { prisma } = await import('@/lib/db')

      vi.mocked(auth).mockResolvedValue({
        user: { id: 'test-user-id' },
      } as any)

      const mockExpenses = [
        {
          id: 'expense-1',
          userId: 'test-user-id',
          categoryId: 1,
          amount: 100,
          description: 'Expense 1',
          date: new Date(),
        },
        {
          id: 'expense-2',
          userId: 'test-user-id',
          categoryId: 2,
          amount: 200,
          description: 'Expense 2',
          date: new Date(),
        },
      ]

      vi.mocked(prisma.expense.findMany).mockResolvedValue(mockExpenses as any)
      vi.mocked(prisma.expense.count).mockResolvedValue(2)

      const result = await getExpenses({ page: 1, limit: 10 })

      expect(result.success).toBe(true)
      expect(result.data).toHaveLength(2)
      expect(result.pagination).toEqual({
        page: 1,
        limit: 10,
        total: 2,
        totalPages: 1,
      })
    })

    it('should filter expenses by date range', async () => {
      const { auth } = await import('@/auth')
      const { prisma } = await import('@/lib/db')

      vi.mocked(auth).mockResolvedValue({
        user: { id: 'test-user-id' },
      } as any)

      const startDate = new Date('2024-01-01')
      const endDate = new Date('2024-01-31')

      await getExpenses({
        page: 1,
        limit: 10,
        startDate,
        endDate,
      })

      expect(prisma.expense.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            date: {
              gte: startDate,
              lte: endDate,
            },
          }),
        })
      )
    })
  })
})
