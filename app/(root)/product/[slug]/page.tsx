import { getProductBySlug } from '@/lib/actions/product.actions';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProductImages from '@/components/shared/product/product-images';

const ProductDetailsPage = async (props: { params: Promise<{ slug: string }> }) => {
    const { slug } = await props.params;

    const p = await getProductBySlug(slug);
    if (!p) { return notFound(); }

    return (
        <>
            <section>
                <div className="grid grid-cols-1 md:grid-cols-5">
                    <div className="col-span-2">
                        <ProductImages images={p.images} />
                    </div>
                    <div className="col-span-2 p-5">
                        <div className="flex flex-col gap-6">
                            <p>
                                { p.brand } { p.category }
                            </p>
                            <h1 className="h3-bold">{ p.name }</h1>
                            <p>
                                { p.rating } of { p.numReviews } reviews.
                            </p>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                <div className="w-24 rounded-full bg-green-100 text-green-700">{ p.price }</div>
                            </div>
                        </div>
                        <div className="mt-10">
                            <p className="font-semibold">Description</p>
                            <p>{ p.description }</p>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <Card>
                            <CardContent className="p-4">
                                <div className="mb-2 flex justify-between">
                                    <div>Price</div>
                                    <div>{ p.price }</div>
                                </div>
                                <div className="mb-2 flex justify-between">
                                    <div>Status</div>
                                    { p.stock > 0 ? (
                                        <Badge variant="outline">In Stock</Badge>
                                    ) : (
                                        <Badge variant="destructive">Out of Stock</Badge>
                                    )}
                                </div>
                                { p.stock > 0 && (
                                    <div className="flex-center">
                                        <Button className="w-full">Add to Cart</Button>
                                    </div>
                                ) }
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProductDetailsPage;