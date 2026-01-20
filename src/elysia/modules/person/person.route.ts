import { Elysia } from 'elysia';
import { getAllPersons } from './person.service';

export const personRoutes = new Elysia({
  name: 'person_routes',
}).get('/persons', async () => {
  return await getAllPersons();
});
