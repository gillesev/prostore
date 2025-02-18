/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from "@/types";
import ProductCard from "./product-card";

const ProductList = ({ data, title, limit }: { data: Product[]; title?: string; limit?: number }) => {
    const dataSubset = limit ? data.slice(0, limit) : data;

    return (
        <div className="my-10">
            <h2 className="h2-bold mb-4">{title}</h2>
            {dataSubset.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cold-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    { dataSubset.map((product: Product) => (
                        <ProductCard key={product.sku} product={product} />
                    ))}
                </div>
            ): (
                <div>
                    <p>No Products found</p>
                </div>
            )}
        </div>
    );
}

export default ProductList;