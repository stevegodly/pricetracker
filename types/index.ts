export type PriceHistoryItem = {
  price: string;
};

export type User = {
  email: string;
};

export type Product = {
  id: number;
  link: string;
  currency: string;
  image: string;
  title: string;
  currentPrice: string;
  oldPrice: string;
  priceHistory: PriceHistoryItem[] | [];
  highestPrice: string;
  lowestPrice: string;
  averagePrice: string;
  buyers:string,
  email?: string,
  password?: string
};

export type NotificationType =
  | "WELCOME"
  | "CHANGE_OF_STOCK"
  | "LOWEST_PRICE"
  | "THRESHOLD_MET";

export type EmailContent = {
  subject: string;
  body: string;
};

export type EmailProductInfo = {
  title: string;
  url: string;
};
