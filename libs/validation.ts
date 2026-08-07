import { z } from "zod";

export const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.email("Enter a valid email"),
  phone: z.string().min(10, "Phone number is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  country: z.string().min(2, "Country is required"),
  zipCode: z.string().min(4, "Zip code is required"),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;