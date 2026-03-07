import { Elysia } from 'elysia';
import { getAllPersons, getPersonById, updatePerson } from './person.service';
import { array } from 'zod';
import { PersonSchemaFromDB } from '@/types/persons';

export const personRoutes = new Elysia({
  name: 'person_routes',
})
  .get(
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
  )
  .get(
    '/persons/:id',
    async ({ params }) => {
      const { id } = params;
      return await getPersonById(id);
    },
    //Validation Responce
    {
      response: {
        200: PersonSchemaFromDB.nullable(),
      },
    },
  )
  .patch(
    '/persons/:id',
    async ({ params, body }) => {
      const { id } = params;

      return await updatePerson(id, body);
    },
    //Validation Responce
    {
      response: {
        200: PersonSchemaFromDB.nullable(),
      },
      body: PersonSchemaFromDB.omit({
        id: true,
        createdAt: true,
        updatedAt: true,
      }),
    },
  );
