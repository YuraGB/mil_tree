import { Report } from '@/types/client/Reports';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

const FormSchema = z.object({
  to: z.string(),
  from: z.string(),
  type: z.literal(['complaint', 'vacation', 'transfer', 'medical', 'release']),
  status: z.literal(['inProgress', 'approoved', 'declined']),
});
export const useCreateReport = (selectedReport: Report | null) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: selectedReport
      ? {
          to: selectedReport.to.name,
          from: selectedReport.from.name,
          type: selectedReport.type,
          status: selectedReport.status,
        }
      : {
          to: '',
          from: '',
          type: 'complaint',
          status: 'inProgress',
        },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {}

  return {
    onSubmit,
    form,
  };
};
