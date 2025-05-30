export function formatPrice(price: number) {
  const priceFormatted = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    currencyDisplay: "narrowSymbol", // Usa solo "$" sin "ARS"
    minimumFractionDigits: 0,
  });

  return priceFormatted.format(price);
}
