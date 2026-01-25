import { api } from '@/elysia/eden';
import { TReportCreateUpdatePayload } from '@/types/reports';
import { useMutation } from '@tanstack/react-query';

export const useCreateUpdateService = () => {
  const {
    data: createdReport,
    mutate: onCreateReport,
    error: errorCreateReport,
    isPending: isCreatingReport,
  } = useMutation({
    mutationFn: async (data: TReportCreateUpdatePayload) =>
      await api.reports.post(data),
  });

  const {
    data: updatedReport,
    mutate: onUpdateReport,
    error: errorUpdateReport,
    isPending: isUpdatingReport,
  } = useMutation({
    mutationFn: async (data: TReportCreateUpdatePayload & { id: string }) =>
      await api.reports.put(data),
  });

  return {
    onCreateReport,
    onUpdateReport,
    createdReport,
    updatedReport,
    errorCreateReport,
    errorUpdateReport,
    isCreatingReport,
    isUpdatingReport,
  };
};
