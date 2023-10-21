export type TProduct = {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: TRating;
  title: string;
  quantity: number;
};

type TRating = {
  rate: number;
  count: number;
};
