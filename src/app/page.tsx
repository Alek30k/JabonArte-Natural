// import BannerDiscount from "@/components/BannerDiscount";
import BannerProduct from "@/components/BannerProduct";
// import CarouselTextBanner from "@/components/CarouselTextBanner";
import ChooseCategory from "@/components/ChooseCategory";
import FeaturedProducts from "@/components/FeaturedProducts";
import ProductsShowcase from "@/components/ProductsShowcase";

export default function Home() {
  return (
    <main className="">
      {/* <CarouselTextBanner /> */}
      <FeaturedProducts />
      {/* <BannerDiscount /> */}
      <ChooseCategory />
      <ProductsShowcase />
      <BannerProduct />
    </main>
  );
}
