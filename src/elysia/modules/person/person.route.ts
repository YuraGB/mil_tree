import { Elysia } from 'elysia';
import { getAllPersons } from './person.service';
import { array } from 'zod';
import { PersonSchemaFromDB } from '@/types/persons';

export const personRoutes = new Elysia({
  name: 'person_routes',
}).get(
  '/persons',
  async () => {
    return await getAllPersons();
  },
  //Validation Responce
  {
    response: {
      200: array(PersonSchemaFromDB),
    },
  },
);
