import { api } from '@/elysia/eden';
import { TPersonsRespons } from '@/types/persons';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useUpdatePerson = () => {
  const {
    mutate: updatePerson,
    error,
    isPending,
    data,
  } = useMutation({
    mutationFn: async (updateData: TPersonsRespons) =>
      await api
        .persons({
          id: updateData.id,
        })
        .patch(updateData),
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
