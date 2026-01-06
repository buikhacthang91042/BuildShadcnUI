import z from 'zod'

const containerSchema = z.object({
  containerType: z.string(),
})
export type Container = z.infer<typeof containerSchema>
export const containerListSchema = z.array(containerSchema)
