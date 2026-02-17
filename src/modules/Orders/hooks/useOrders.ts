import { TOrders } from '@/types/orders';

export const useOrders = (): { orders: TOrders[] } => {
  return {
    orders: [
      {
        id: '0',
        craetedAt: new Date().toISOString(),
        description: 'description',
        fromWhatDate: new Date().toISOString(),
        onWhichName: {
          assignmentRole: 'battalion_commander',
          commanderId: '1',
          email: 'ee@s.com',
          emailVerified: false,
          id: '2',
          image: null,
          name: 'Robert',
          rank: 'Brigadier General ★',
          statusCode: '800',
          unitId: '33',
        },
        type: 'name',
        updatedAt: new Date().toISOString(),
        whoOrdered: {
          assignmentRole: 'battalion_commander',
          commanderId: '1',
          email: 'ee@s.com',
          emailVerified: false,
          id: '2',
          image: null,
          name: 'Robert',
          rank: 'Brigadier General ★',
          statusCode: '800',
          unitId: '33',
        },
      },
    ],
  };
};
