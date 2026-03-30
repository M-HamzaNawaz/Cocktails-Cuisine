import { z } from 'zod';

export const checkoutSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(10, 'Address must be at least 10 characters'),
  city: z.string().min(2, 'City is required'),
  zipCode: z.string().min(5, 'ZIP code must be at least 5 characters'),
  country: z.string().min(2, 'Country is required'),
  cardNumber: z.string().min(16, 'Card number must be 16 digits').max(16),
  cardName: z.string().min(3, 'Name on card is required'),
  expiryDate: z.string().regex(/^\d{2}\/\d{2}$/, 'Format must be MM/YY'),
  cvv: z.string().min(3, 'CVV must be 3 digits').max(4),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
