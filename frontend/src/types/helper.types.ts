export type Helper = {
  id: number;
  requester: number;
  title: string;
  description: string;
  image: Buffer | string;
  goal: number;
  donate_quantity: number | null;
  parcial_amount: number | null;
};
