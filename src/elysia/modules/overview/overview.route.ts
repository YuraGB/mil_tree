import Elysia from 'elysia';
import { getOverview } from './overview.service';

// Routes
export const overviewRoute = new Elysia({
  name: 'overview',
}).get('/overview', async () => {
  return await getOverview('p-0001'); // id root Node -> Brigade
});
