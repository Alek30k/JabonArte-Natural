"use client";

import { Heart, ShoppingCart, User } from "lucide-react";
import { useRouter } from "next/navigation";
import MenuList from "./MenuList";
import ItemsMenuMobile from "./ItemsMenuMobile";
import ToggleTheme from "./ToggleTheme";
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between p-4 mx-10 cursor-pointer sm-max-w-4xl md-max-w-6xl">
      <div className="">
        <Image
          src="/logo3.png"
          alt="Logo JabonArte Natural"
          width={200}
          height={350}
          priority
        />
      </div>
      <div className="items-center justify-between hidden sm:flex">
        <MenuList />
      </div>
      <div className="flex sm:hidden">
        <ItemsMenuMobile />
      </div>
      <div className="flex items-center justify-between gap-2 sm:gap-7">
        <ShoppingCart
          strokeWidth="1"
          className="cursor-pointer"
          onClick={() => router.push("/cart")}
        />
        <Heart
          strokeWidth="1"
          className="cursor-pointer"
          onClick={() => router.push("/loved-products")}
        />
        <User strokeWidth="1" className="cursor-pointer" />
        <ToggleTheme />
      </div>
    </div>
  );
};

export default Navbar;
