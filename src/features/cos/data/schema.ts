import z from 'zod'

const containerSchema = z.object({
  containerType: z.string(),
})
const containerReplaceSchema = z.object({
  id: z.string(),
  shippingLineId: z.string(),
  shippingLineName: z.string(),
  containerTypeReplace: z.string(),
})
export type Container = z.infer<typeof containerSchema>
export const containerListSchema = z.array(containerSchema)
export type ContainerReplace = z.infer<typeof containerReplaceSchema>
export const containerReplaceListSchema = z.array(containerReplaceSchema)
