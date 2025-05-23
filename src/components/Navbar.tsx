"use client";

import { BaggageClaim, Heart, ShoppingCart, User } from "lucide-react";
import { useRouter } from "next/navigation";
import MenuList from "./MenuList";
import ItemsMenuMobile from "./ItemsMenuMobile";
import ToggleTheme from "./ToggleTheme";
import Image from "next/image";
import { UseCart } from "@/hooks/UseCart";
import { UseLovedProducts } from "@/hooks/UseLovedProducts";

const Navbar = () => {
  const router = useRouter();
  const cart = UseCart();
  const { lovedItems } = UseLovedProducts();

  return (
    <div className="flex items-center justify-between  p-4 mx-10 cursor-pointer sm-max-w-4xl md-max-w-6xl">
      <div className="">
        <Image
          src="/logo3.png"
          alt="Logo JabonArte Natural"
          width={200}
          height={350}
          priority
          onClick={() => router.push("/")}
        />
      </div>
      <div className="items-center justify-between hidden sm:flex">
        <MenuList />
      </div>
      <div className="flex sm:hidden">
        <ItemsMenuMobile />
      </div>
      <div className="flex items-center justify-between gap-2 sm:gap-7">
        {cart.items.length === 0 ? (
          <ShoppingCart
            strokeWidth="1"
            className="cursor-pointer"
            onClick={() => router.push("/cart")}
          />
        ) : (
          <div className="flex gap-1" onClick={() => router.push("/cart")}>
            <BaggageClaim strokeWidth={1} className="cursor-pointer" />
            <span>{cart.items.length}</span>
          </div>
        )}

        <Heart
          strokeWidth="1"
          className={`cursor-pointer ${
            lovedItems.length > 0 && "fill-rose-600 stroke-rose-600"
          }`}
          onClick={() => router.push("/loved-products")}
        />
        <User strokeWidth="1" className="cursor-pointer" />
        <ToggleTheme />
      </div>
    </div>
  );
};

export default Navbar;
