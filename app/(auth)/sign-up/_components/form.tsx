'use client';

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  INVESTMENT_GOAL,
  PREFERRED_INDUSTRIES,
  RISK_TOLERANCE_OPTIONS,
} from '@/app/_shared/constants';
import authClient from '@/auth-client';
import CountrySelectField from '@/components/CountrySelectField';
import InputField from '@/components/InputField';
import SelectField from '@/components/SelectField';
import { Button } from '@/components/ui/button';

function Form() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    mode: 'onBlur',
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      country: 'US',
      investmentGoal: 'Growth',
      riskTolerance: 'Medium',
      preferredIndustry: 'Technology',
    },
  });

  function handleSignUp(event: React.FormEvent<HTMLFormElement>) {
    void handleSubmit(
      async ({
        fullName,
        email,
        password,
        country,
        investmentGoal,
        riskTolerance,
        preferredIndustry,
      }) => {
        const signUpResponse = await authClient.signUp.email({
          name: fullName,
          email,
          password,
          country,
          investment_goal: investmentGoal,
          risk_tolerance: riskTolerance,
          preferred_industry: preferredIndustry,
          callbackURL: '/',
        });

        if (signUpResponse.data) {
          toast.success('User has been created');

          // try {
          //       await inngest.send({
          //         name: 'app/user.created',
          //         data: {
          //           email,
          //           name: fullName,
          //           country,
          //           investmentGoal,
          //           riskTolerance,
          //           preferredIndustry,
          //         },
          //       });
          //     } catch (error) {
          //       console.error('Sending app/user.created inngest event failed', error);
          //     }
        }

        if (signUpResponse.error) {
          toast.error(signUpResponse.error.message ?? 'Sign up failed');
        }
      },
    )(event);
  }

  return (
    <form className="space-y-5" onSubmit={handleSignUp}>
      <InputField
        name="fullName"
        label="Full Name"
        placeholder="Elon Musk"
        register={register}
        error={errors.fullName}
        validation={{ required: 'Full name is required', minLength: 2 }}
      />
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
      <CountrySelectField
        label="Country"
        name="country"
        control={control}
        error={errors.country}
        required
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
      <SelectField
        label="Investment Goal"
        name="investmentGoal"
        options={INVESTMENT_GOAL}
        control={control}
        error={errors.investmentGoal}
        required
      />
      <SelectField
        label="Risk Tolerance"
        name="riskTolerance"
        options={RISK_TOLERANCE_OPTIONS}
        control={control}
        error={errors.riskTolerance}
        required
      />
      <SelectField
        label="Preferred Industry"
        name="preferredIndustry"
        options={PREFERRED_INDUSTRIES}
        control={control}
        error={errors.preferredIndustry}
        required
      />
      <Button
        className="mt-5 yellow-btn w-full"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Creating account' : 'Start Your Investing Journey'}
      </Button>
    </form>
  );
}

export default Form;
