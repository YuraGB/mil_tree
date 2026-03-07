import { api } from '@/elysia/eden';
import { PersonCard } from './PersonCard';
import { use } from 'react';

export const PersonsList = ({
  users,
}: {
  users: ReturnType<typeof api.persons.get>;
}) => {
  const response = use(users);
  if (response.data === null || response.error) {
    return (
      <p>
        Error loading users: {response.error?.value.message ?? 'Unknown error'}
      </p>
    );
  }

  return response.data.map((user) => <PersonCard key={user.id} user={user} />);
};
