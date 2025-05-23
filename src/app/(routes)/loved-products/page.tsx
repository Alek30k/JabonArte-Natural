"use client";

import { UseLovedProducts } from "@/hooks/UseLovedProducts";

const Page = () => {
  const { lovedItems } = UseLovedProducts();

  return (
    <div className="max-w-4xl py-4 mx-auto sm:py-32 sm:px-24">
      <h1 className="sm:text-2xl">Productos que te gustan</h1>
      <div className="">
        <div className="">
          {lovedItems.length === 0 && (
            <p>No hay productos en la sección de Me gusta</p>
          )}
          <ul>
            {lovedItems.map((item) => (
              <p key={item.id}>{item.productName}</p>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page;
