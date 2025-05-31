import ChooseCategory from "@/components/ChooseCategory";
import FeaturedProducts from "@/components/FeaturedProducts";
import ProductsShowcase from "@/components/ProductsShowcase";

export default function Home() {
  return (
    <main className="">
      <FeaturedProducts />
      <ChooseCategory />
      <ProductsShowcase />
    </main>
  );
}
