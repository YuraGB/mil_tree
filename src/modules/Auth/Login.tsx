'use client';
import { Input } from '@/components/ui/input';

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';

import { Controller } from 'react-hook-form';
import { memo } from 'react';
import { useLogin } from './hooks/useLogin';
import ButtonAuthSubmit from './ButtonAuthSubmit';

const Login = () => {
  const { form, loading, onSubmit } = useLogin();

  return (
    <article className="m-auto w-full max-w-2xl">
      <h2>Login form</h2>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="my-2 w-full space-y-6 rounded border p-4"
      >
        <FieldGroup>
          <Controller
            disabled={loading}
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="email"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />{' '}
          <Controller
            name="password"
            disabled={loading}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  placeholder="********"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />{' '}
        </FieldGroup>

        <ButtonAuthSubmit title="Login in" disabled={loading} />
      </form>
    </article>
  );
};

export default memo(Login);
