'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import FooterLink from '@/components/FooterLink';
import InputField from '@/components/InputField';
import { Button } from '@/components/ui/button';
import { signInWithEmail } from '@/lib/actions/auth.actions';

function Page() {
  const router = useRouter();
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

  function handleSignIn(event: React.FormEvent<HTMLFormElement>) {
    void handleSubmit(async (data) => {
      const isSuccess = await signInWithEmail(data);

      if (isSuccess) {
        router.push('/');
      } else {
        toast.error('Sign in failed');
      }
    })(event);
  }

  return (
    <>
      <h1 className="form-title">Sign in to Signalist</h1>
      <form className="space-y-5" onSubmit={handleSignIn}>
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
          {isSubmitting ? 'Signing in' : 'Sign In'}
        </Button>
        <FooterLink
          text="Don’t have an account?"
          linkText="Sign up"
          href="/sign-up"
        />
      </form>
    </>
  );
}

export default Page;
