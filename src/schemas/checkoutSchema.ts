import { z } from 'zod';

export const checkoutSchema = z
  .object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    address: z.string().min(5, 'Address is required'),
    city: z.string().min(2, 'City is required'),
    postCode: z.string().min(3, 'Post code is required'),
    country: z.string().min(2, 'Country is required'),
    regionState: z.string().min(2, 'Region/State is required'),
    comment: z.string().optional(),
    paymentMethod: z.enum(['cash', 'upi', 'bank']),
  })
  .superRefine((data, ctx) => {
    if (data.paymentMethod !== 'cash' && !data.comment?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Add a short payment note for non-cash orders',
        path: ['comment'],
      });
    }
  });

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
