"use client";

import { UseCart } from "@/hooks/UseCart";

const OrderSummary = () => {
  const { getCartTotal } = UseCart();

  return (
    <div className="flex justify-between font-medium">
      {" "}
      {/* <h2 className="text-lg font-bold">Resumen de Pedido</h2> */}
      <div className="text-xl font-semibold">
        <div>Total</div>
      </div>
      <div className="text-xl font-semibold ">${getCartTotal().toFixed(2)}</div>
    </div>
  );
};

export default OrderSummary;
