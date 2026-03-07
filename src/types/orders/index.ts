import { TPerson } from '../persons';

export type TOrders = {
  id: string;
  type: string;
  craetedAt: string;
  updatedAt: string;
  fromWhatDate: string;
  whoOrdered: Omit<
    TPerson,
    | 'subUnits'
    | 'unitId'
    | 'emailVerified'
    | 'image'
    | 'createdAt'
    | 'updatedAt'
    | 'content'
  >;
  onWhichName: Omit<
    TPerson,
    | 'subUnits'
    | 'unitId'
    | 'emailVerified'
    | 'image'
    | 'createdAt'
    | 'updatedAt'
    | 'content'
  >;
  description: string;
};
