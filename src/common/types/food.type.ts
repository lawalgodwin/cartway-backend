export type FoodItem = {
  name: string;
  price: number;
  quantity: number;
};

export type Receiver = {
  name: string;
  phone: string;
};

export type FoodOrder = {
  items: FoodItem | FoodItem[];
  deliveryToAddress: string;
  receiver: Receiver;
};
