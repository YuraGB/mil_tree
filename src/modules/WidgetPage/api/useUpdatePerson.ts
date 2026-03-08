import { api } from '@/elysia/eden';
import { TPersonsRespons } from '@/types/persons';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

type UpdatePersonPayload = Omit<
  TPersonsRespons,
  'id' | 'createdAt' | 'updatedAt'
>;

export const useUpdatePerson = () => {
  const {
    mutate: updatePerson,
    error,
    isPending,
    data,
  } = useMutation({
    mutationFn: async (updateData: TPersonsRespons) => {
      // Exclude id, createdAt, and updatedAt from the payload
      const { id, createdAt, updatedAt, ...payload } = updateData;
      return await api.persons({ id }).patch(payload as UpdatePersonPayload);
    },
    onSuccess: (data) => {
      if (!data || data.error) {
        toast.error('Failed to update person.');
        return;
      }
      toast.success(`Person updated successfully!`);
    },
    onError: (error) => {
      toast.error(`Error updating person: ${error.message}`);
    },
  });

  return {
    updatePerson,
    error,
    isPending,
    data,
  };
};
