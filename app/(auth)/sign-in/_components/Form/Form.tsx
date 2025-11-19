'use client';

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import authClient from '@/auth-client';
import InputField from '@/components/InputField';
import { Button } from '@/components/ui/button';
import { EMAIL_REGULAR_EXPRESSION } from '@/constants';

interface FieldValues {
  email: string;
  password: string;
}

function Form() {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit: rhfHandleSubmit,
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    async function handleSignIn({ email, password }: FieldValues) {
      const signInResponse = await authClient.signIn.email({
        email,
        password,
        callbackURL: '/',
      });

      if (signInResponse.error) {
        toast.error(
          signInResponse.error.message ?? 'Oops! Something went wrong',
        );
      }
    }

    void rhfHandleSubmit(handleSignIn)(event);
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <InputField
        label="Email"
        placeholder="contact@emusk.dev"
        name="email"
        register={register}
        registerOptions={{
          required: 'Email is required',
          pattern: {
            value: EMAIL_REGULAR_EXPRESSION,
            message: 'Email is invalid',
          },
        }}
        error={errors.email}
      />
      <InputField
        label="Password"
        placeholder="*****"
        name="password"
        type="password"
        register={register}
        registerOptions={{
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters',
          },
        }}
        error={errors.password}
      />
      <Button
        className="mt-5 yellow-btn w-full"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Signing in' : 'Sign In'}
      </Button>
    </form>
  );
}

export default Form;
