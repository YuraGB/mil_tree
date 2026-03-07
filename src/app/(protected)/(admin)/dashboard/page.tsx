import { api } from '@/elysia/eden';
import { PersonsList } from '@/modules/Dashboard/PersonsList';
import { Suspense } from 'react';

const DashboardPage = () => {
  const users = api.persons.get();
  return (
    <article className="grid w-full grid-cols-[repeat(auto-fit,_minmax(200px,_400px))] gap-2">
      <Suspense fallback={<p>Loading users...</p>}>
        <PersonsList users={users} />
      </Suspense>
    </article>
  );
};

export default DashboardPage;
