import { z } from 'zod';
import { formatNumberWithDecimal } from './utils';

const currency = z.string().refine((value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))));

// schema for inserting a product
export const insertProductSchema = z.object({
    sku: z.string(),
    name: z.string().min(3, 'name must be at least 3 characters.'),
    slug: z.string(),
    category: z.string(),
    brand: z.string(),
    description: z.string(),
    stock: z.coerce.number(),
    images: z.array(z.string()).min(1, 'Product must have at least 1 image.'),
    isFeatured: z.boolean().default(false),
    banner: z.string().nullable(),
    price: currency,
    numReviews: z.coerce.number()
});

