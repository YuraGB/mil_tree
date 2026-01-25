import { api } from '@/elysia/eden';
import { TDBPerson } from '@/types/persons';
import { useQueryClient } from '@tanstack/react-query';

export const getAllPersonsData = async () => {
  const response = await api.persons.get();
  return response.data;
};

export const useReportService = ({
  persons,
}: {
  persons: TDBPerson[] | [];
}) => {
  const queryClient = useQueryClient();
  if (persons.length) {
    queryClient.setQueryData(['persons'], persons);
  }
};
