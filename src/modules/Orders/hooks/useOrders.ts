import rawData from "@/lib/testJson/Orders/dummy.json";
import { TOrders } from "@/types/orders";

const data = rawData.orders as unknown as TOrders[];

export const useOrders = () => {
  const orders = data;

  return { orders };
};
