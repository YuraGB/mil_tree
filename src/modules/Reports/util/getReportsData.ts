import { api } from '@/elysia/eden';

export const getReportsData = async () => {
  const [reportsRes, personsRes] = await Promise.allSettled([
    api.reports.get(),
    api.persons.get(),
  ]);

  if (reportsRes.status !== 'fulfilled' || personsRes.status !== 'fulfilled')
    return null;

  const { data: repsData } = reportsRes.value;
  const { data: persData } = personsRes.value;

  return {
    repsData,
    persData,
  };
};
