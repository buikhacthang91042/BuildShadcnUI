import { z } from 'zod'

const userStatusSchema = z.union([
  z.literal('active'),
  z.literal('inactive'),
  z.literal('invited'),
  z.literal('suspended'),
])
export type UserStatus = z.infer<typeof userStatusSchema>

/* const userRoleSchema = z.union([
  z.literal('superadmin'),
  z.literal('admin'),
  z.literal('cashier'),
  z.literal('manager'),
])

const userSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  status: userStatusSchema,
  role: userRoleSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof userSchema>

export const userListSchema = z.array(userSchema)
 */
export const roleItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  tenantId: z.null(),
  isPublic: z.boolean(),
})
export type Role = z.infer<typeof roleItemSchema>

export const roleResponseSchema = z.object({
  items: z.array(roleItemSchema),
  total: z.number().optional(),
})

export type RoleResponse = z.infer<typeof roleResponseSchema>

export type Permission = {
  name: string
  displayName: string | null
  isGranted: boolean
  grantedProviders: any[]
}

export type PermissionNode = {
  name: string
  displayName: string
  children: PermissionNode[]
  permissions: Permission[]
}
