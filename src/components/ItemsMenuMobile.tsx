import { Menu } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Link from "next/link";

const ItemsMenuMobile = () => {
  return (
    <div className="">
      <Popover>
        <PopoverTrigger>
          <Menu />
        </PopoverTrigger>
        <PopoverContent>
          <Link href="/categories/cafe-molido" className="block">
            Café Molido
          </Link>
          <Link href="/categories/cafe-molido" className="block">
            Café Grano
          </Link>
          <Link href="/categories/cafe-molido" className="block">
            Café Capsulas
          </Link>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ItemsMenuMobile;
