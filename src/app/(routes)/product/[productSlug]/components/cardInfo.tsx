"use client";

import PaymentInfo from "../components/PaymentInfo";
import PaymentInfoCompact from "../components/PaymentInfoCompact";

export default function CardInfo() {
  const productPrice = 45000;

  return (
    <main className="container mx-auto  py-8 space-y-8">
      {/* Versión compacta */}
      <div className="space-y-4">
        <div className="max-w-md">
          <PaymentInfoCompact price={productPrice} transferDiscount={5} />
        </div>
      </div>
    </main>
  );
}
