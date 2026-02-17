import authClient from '@/elysia/modules/auth/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { useAuthRequestConfig } from './useAuthRequestConfig';
import { LOGIN_ERROR_TITLE } from '@/constants';

const formSchema = z.object({
  email: z.email().nonempty(),
  password: z.string(),
});

/**
 * Hook for Login form
 * Validate the fields, makes a request, redirect if success
 *
 */
export const useLogin = () => {
  // Similar auth config for sign in and sign up
  const { onError, onRequest, onResponse, onSuccess, loading } =
    useAuthRequestConfig(LOGIN_ERROR_TITLE);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    authClient.signIn.email(
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
