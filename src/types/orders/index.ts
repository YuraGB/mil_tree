import { TPerson } from '../persons';

export type TOrders = {
  id: string;
  type: string;
  craetedAt: string;
  updatedAt: string;
  fromWhatDate: string;
  whoOrdered: Omit<TPerson, ''>;
  onWhichName: Omit<TPerson, 'subUnits'>;
  description: string;
};
