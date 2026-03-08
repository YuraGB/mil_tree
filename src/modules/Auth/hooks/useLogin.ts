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

  /**
   * Initiates an email sign-in with the provided form values and integrates auth lifecycle handlers with form feedback.
   *
   * When the request fails, sets a validation error on the `email` field with the message "Invalid email or password" before delegating to the configured `onError` handler.
   *
   * @param data - Form values for the email sign-in (email and password)
   */
  function onSubmit(data: z.infer<typeof formSchema>) {
    authClient.signIn.email(
      {
        ...data,
      },
      {
        onRequest,
        onError: (context) => {
          form.setError('email', {
            message: 'Invalid email or password',
          });
          onError(context);
        },
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
