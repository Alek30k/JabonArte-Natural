import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const ItemsMenuMobile = () => {
  return (
    <div className="">
      <Popover>
        <PopoverTrigger>
          <p>Menu</p>
        </PopoverTrigger>
        <PopoverContent>
          <p>Café Molido</p>
          <p>Café Grano</p>
          <p>Café Capsula</p>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ItemsMenuMobile;
