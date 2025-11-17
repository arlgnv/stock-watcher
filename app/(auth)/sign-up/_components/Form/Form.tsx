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
import { EMAIL_REGULAR_EXPRESSION } from '@/constants';

interface FieldValues {
  fullName: string;
  email: string;
  password: string;
  country: string;
  investmentGoal: string;
  riskTolerance: string;
  preferredIndustry: string;
}

function Form() {
  const {
    register,
    formState: { errors, isSubmitting },
    control,
    handleSubmit: rhfHandleSubmit,
  } = useForm<FieldValues>({
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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    async function handleSignUp({
      fullName,
      email,
      password,
      country,
      investmentGoal,
      riskTolerance,
      preferredIndustry,
    }: FieldValues) {
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
    }

    void rhfHandleSubmit(handleSignUp)(event);
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <InputField
        label="Full name"
        placeholder="Elon Musk"
        name="fullName"
        register={register}
        registerOptions={{
          required: 'Full name is required',
          minLength: 2,
        }}
        error={errors.fullName}
      />
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
      <CountrySelectField
        label="Country"
        name="country"
        control={control}
        error={errors.country}
        required
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
      <SelectField
        label="Investment goal"
        name="investmentGoal"
        control={control}
        options={INVESTMENT_GOAL}
        error={errors.investmentGoal}
        required
      />
      <SelectField
        label="Risk tolerance"
        name="riskTolerance"
        control={control}
        options={RISK_TOLERANCE_OPTIONS}
        error={errors.riskTolerance}
        required
      />
      <SelectField
        label="Preferred industry"
        name="preferredIndustry"
        control={control}
        options={PREFERRED_INDUSTRIES}
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
