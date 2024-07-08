export type HelpRequest = {
  id: number;
  requester: number;
  title: string;
  description: string;
  image: Buffer | string;
  goal: number;
  donate_quantity: number | null;
  parcial_amount: number | null;
  update_date_time: Date;
};

export type RequestHelper = {
  message: string;
  data: HelpRequest[];
};
