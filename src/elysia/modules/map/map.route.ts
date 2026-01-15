import { MARK_TYPES } from '@/types/map';
import { Elysia } from 'elysia';
import z from 'zod';

export const MarkCoordinatesSchema = z.tuple([z.number(), z.number()]);

export const CoordinatesSchema = z.union([
  MarkCoordinatesSchema,
  z.array(MarkCoordinatesSchema),
]);

export const mapRoutes = new Elysia({
  name: 'map_routes',
})
  .get('/map', () => {
    return { mapData: 'data' };
  })
  .post(
    '/createMapMark',
    ({ body }) => {
      console.log(body);
      return body;
    },
    {
      body: z.object({
        type: z.literal(MARK_TYPES),
        id: z.string,
        coordinates: CoordinatesSchema,
      }),
    },
  )
  .put('/updateMarks', () => {
    return { mark: 'updated' };
  })
  .delete('/deleteMarks', () => {
    return {
      markDeleted: true,
    };
  });
