export const formatPrice = (price: number) => {
  // return price.toLocaleString("it-IT", { style: "currency", currency: "VND" });
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};
