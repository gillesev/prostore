import ProductList from '@/components/shared/product/product-list';
import { getLatestProducts } from '@/lib/actions/product.actions';

const Homepage = async () => {
  const data = await getLatestProducts();

  return (
    <>
      <ProductList 
        data={data} 
        title="Newest Arrivals"
        limit={4} />
    </>
  );
}

export default Homepage;