//'use server';

import { prisma } from '@/db/prisma';
import { LATEST_PRODUCTS_LIMIT } from '../constants';
import { Product } from '@/types';

export const getLatestProducts = async (): Promise<Product[]> => {
    const data = await prisma.product.findMany({
        take: LATEST_PRODUCTS_LIMIT,
        orderBy: { CreatedAt: 'desc' }
    });

    const products: Product[] = data.map((d) => {
        const p: Product = {
            id: d.id,
            brand: d.brand,
            CreatedAt: d.CreatedAt,
            slug: d.slug,
            sku: d.sku,
            description: d.description,
            name: d.name,
            category: d.category,
            stock: d.stock,
            isFeatured: d.isFeatured,
            banner: d.banner,
            images: d.images,
            price: d.price.toString(),
            rating: Number(d.rating),
            numReviews: d.numReviews
        };
        return p;
    });

    return products;
}

export const getProductBySlug = async (slug: string): Promise<Product | null> => {
    const d = await prisma.product.findFirst({
        where: {
            slug: slug
        }
    });

    if (d !== null) {
        const p: Product = {
            id: d.id,
            brand: d.brand,
            CreatedAt: d.CreatedAt,
            slug: d.slug,
            sku: d.sku,
            description: d.description,
            name: d.name,
            category: d.category,
            stock: d.stock,
            isFeatured: d.isFeatured,
            banner: d.banner,
            images: d.images,
            price: d.price.toString(),
            rating: Number(d.rating),
            numReviews: d.numReviews
        };

        return p;
    } else {
        return null;
    }
}