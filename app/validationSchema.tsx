import z from '@/node_modules/zod/v4/classic/external.cjs';

export const schema = z.object({
    title: z.string().min(1, 'Title is required').max(200),
    description: z.string().min(1, 'Description is required').max(65535),
});
export const patchIssueScheme = z.object({
    title: z.string().min(1, 'Title is required').max(200).optional(),
    description: z.string().min(1, 'Description is required').max(65535).optional(),
    assignedToUserId: z.string()
    .min(1,'Assigned To User ID is required')
    .max(255)
    .optional()
    .nullable() 
});