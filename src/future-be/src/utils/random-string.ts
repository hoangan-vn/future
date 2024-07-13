const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export const generateString = (length: number) => {
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

export const generateOrderId = () => {
  const createdAt = new Date();
  const orderId = `${createdAt.getFullYear().toString().slice(-2)}${(
    createdAt.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}${createdAt
    .getDate()
    .toString()
    .padStart(2, "0")}${generateString(8)}`;

  return orderId;
};
