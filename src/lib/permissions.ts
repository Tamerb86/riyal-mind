/**
 * نظام الصلاحيات والتحقق من الوصول
 */

import { auth } from "@/auth"
import { prisma } from "@/config/db"

export type Permission = 
  | "expense:create"
  | "expense:read"
  | "expense:update"
  | "expense:delete"
  | "budget:create"
  | "budget:read"
  | "budget:update"
  | "budget:delete"
  | "group:create"
  | "group:read"
  | "group:update"
  | "group:delete"
  | "group:manage_members"
  | "report:generate"
  | "settings:update"
  | "admin:all"

export type Role = "owner" | "admin" | "member" | "viewer"

/**
 * صلاحيات كل دور
 */
const rolePermissions: Record<Role, Permission[]> = {
  owner: [
    "expense:create",
    "expense:read",
    "expense:update",
    "expense:delete",
    "budget:create",
    "budget:read",
    "budget:update",
    "budget:delete",
    "group:create",
    "group:read",
    "group:update",
    "group:delete",
    "group:manage_members",
    "report:generate",
    "settings:update",
    "admin:all",
  ],
  admin: [
    "expense:create",
    "expense:read",
    "expense:update",
    "expense:delete",
    "budget:create",
    "budget:read",
    "budget:update",
    "budget:delete",
    "group:read",
    "group:update",
    "group:manage_members",
    "report:generate",
    "settings:update",
  ],
  member: [
    "expense:create",
    "expense:read",
    "expense:update",
    "budget:read",
    "group:read",
    "report:generate",
  ],
  viewer: [
    "expense:read",
    "budget:read",
    "group:read",
    "report:generate",
  ],
}

/**
 * التحقق من صلاحية المستخدم
 */
export async function hasPermission(
  userId: string,
  permission: Permission,
  resourceId?: string
): Promise<boolean> {
  try {
    // المستخدم دائماً لديه صلاحيات على بياناته الخاصة
    if (!resourceId) {
      return true
    }

    // التحقق من صلاحيات المجموعة
    const groupMember = await prisma.groupMember.findFirst({
      where: {
        userId: userId,
        groupId: resourceId,
      },
    })

    if (!groupMember) {
      return false
    }

    const userRole = groupMember.role as Role
    const permissions = rolePermissions[userRole] || []

    return permissions.includes(permission)
  } catch (error) {
    console.error("Permission check error:", error)
    return false
  }
}

/**
 * التحقق من أن المستخدم هو صاحب المورد
 */
export async function isResourceOwner(
  userId: string,
  resourceType: "expense" | "budget" | "goal" | "group",
  resourceId: string
): Promise<boolean> {
  try {
    switch (resourceType) {
      case "expense": {
        const expense = await prisma.expense.findUnique({
          where: { id: resourceId },
        })
        return expense?.userId === userId
      }
      case "budget": {
        const budget = await prisma.budget.findUnique({
          where: { id: resourceId },
        })
        return budget?.userId === userId
      }
      case "goal": {
        const goal = await prisma.goal.findUnique({
          where: { id: resourceId },
        })
        return goal?.userId === userId
      }
      case "group": {
        const group = await prisma.group.findUnique({
          where: { id: resourceId },
        })
        return group?.createdById === userId
      }
      default:
        return false
    }
  } catch (error) {
    console.error("Resource ownership check error:", error)
    return false
  }
}

/**
 * Middleware للتحقق من الصلاحيات
 */
export async function requireAuth() {
  const session = await auth()
  
  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }
  
  return session.user
}

/**
 * التحقق من صلاحية في المجموعة
 */
export async function requireGroupPermission(
  groupId: string,
  permission: Permission
) {
  const user = await requireAuth()
  
  const hasAccess = await hasPermission(user.id, permission, groupId)
  
  if (!hasAccess) {
    throw new Error("Forbidden: Insufficient permissions")
  }
  
  return user
}
