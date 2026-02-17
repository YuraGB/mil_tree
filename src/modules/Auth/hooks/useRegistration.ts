import authClient from '@/elysia/modules/auth/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { useAuthRequestConfig } from './useAuthRequestConfig';
import { REGISTRATION_ERROR_TITLE } from '@/constants';

const formSchema = z.object({
  name: z.string().nonempty('The name is required').min(2),
  email: z.email(),
  password: z.string().min(6),
});

export const useRegistration = () => {
  // Similar auth config for sign in and sign up
  const { onError, onRequest, onResponse, onSuccess, loading } =
    useAuthRequestConfig(REGISTRATION_ERROR_TITLE);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    authClient.signUp.email(
      {
        ...data,
      },
      {
        onRequest,
        onError,
        onSuccess,
        onResponse,
      },
    );
  }

  return {
    form,
    loading,
    onSubmit,
  };
};
