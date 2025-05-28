import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ProductType } from "@/types/product";
import { toast } from "sonner";

interface CartStore {
  items: ProductType[];
  addItem: (data: ProductType, quantity?: number) => void;
  removeItem: (id: number) => void;
  updateItemQuantity: (id: number, quantity: number) => void;
  getCartTotal: () => number;
  removeAll: () => void;
}

export const UseCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: ProductType, quantity = 1) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.id === data.id
                ? { ...item, quantity: (item.quantity || 1) + quantity }
                : item
            ),
          });
          toast.success("Cantidad actualizada en el carrito!");
        } else {
          set({
            items: [...currentItems, { ...data, quantity }],
          });
          toast.success("Producto agregado al carrito!");
        }
      },

      removeItem: (id: number) => {
        set({ items: get().items.filter((item) => item.id !== id) });
        toast("Producto eliminado del carrito!");
      },

      updateItemQuantity: (id: number, quantity: number) => {
        if (quantity < 1) {
          set({ items: get().items.filter((item) => item.id !== id) });
          toast("Producto eliminado del carrito!");
        } else {
          set({
            items: get().items.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
          });
        }
      },

      getCartTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * (item.quantity || 1),
          0
        );
      },

      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
