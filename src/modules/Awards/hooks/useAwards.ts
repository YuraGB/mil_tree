import { AWARDSNAMES } from '@/constants';
import { TAwardName } from '@/types/persons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

const FormSchema = z.object({
  award_selector: z
    .enum(AWARDSNAMES, {
      message: 'Please select an award.',
    })
    .or(z.literal('')) // <-- додає "" як валідне значення
    .optional(),
});

export const useAwards = (addAwardHandler: (awardName: TAwardName) => void) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      award_selector: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!data.award_selector) return;
    addAwardHandler(data.award_selector);
    form.reset({ award_selector: '' });
  }

  const currentSelectedAward = form.watch('award_selector');

  return {
    form,
    onSubmit,
    currentSelectedAward,
  };
};
