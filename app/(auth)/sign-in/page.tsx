'use client';

import { useForm } from 'react-hook-form';

import FooterLink from '@/components/FooterLink';
import InputField from '@/components/InputField';
import { Button } from '@/components/ui/button';

function Page() {
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(data: SignInFormData) {
    try {
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h1 className="form-title">Log In Your Account</h1>
      <form className="space-y-5" onSubmit={void handleSubmit(onSubmit)}>
        <InputField
          name="email"
          label="Email"
          placeholder="contact@emusk.dev"
          register={register}
          error={errors.email}
          validation={{
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Please enter a valid email address',
            },
          }}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          register={register}
          error={errors.password}
          validation={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters',
            },
          }}
        />
        <Button
          className="mt-5 yellow-btn w-full"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Logging in' : 'Log In'}
        </Button>
        <FooterLink
          text="Don’t have an account?"
          linkText="Sign Up"
          href="/sign-up"
        />
      </form>
    </>
  );
}

export default Page;
