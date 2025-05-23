import { Separator } from "@/components/ui/separator";
import { ProductType } from "@/types/product";

export type InfoProductProps = {
  product: ProductType;
};

const InfoProduct = (props: InfoProductProps) => {
  const { product } = props;

  console.log(product);

  return (
    <div className="">
      <div className="justify-between mb-3 sm:flex">
        <h1 className="text-2xl">{product.productName}</h1>
        <div className="flex items-center justify-between gap-3">
          <p className="px-2 py-1 text-xs text-white bg-black rounded-full dark:bg-white dark:text-black w-fit">
            {product.taste}
          </p>
          <p className="px-2 py-1 text-xs text-white bg-yellow-900 rounded-full   w-fit">
            {product.origin}
          </p>
        </div>
      </div>
      <Separator />
    </div>
  );
};

export default InfoProduct;
