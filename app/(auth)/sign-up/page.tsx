'use client';

import { useForm } from 'react-hook-form';

import {
  INVESTMENT_GOALS,
  PREFERRED_INDUSTRIES,
  RISK_TOLERANCE_OPTIONS,
} from '@/app/_shared/constants';
import CountrySelectField from '@/components/CountrySelectField';
import FooterLink from '@/components/FooterLink';
import InputField from '@/components/InputField';
import SelectField from '@/components/SelectField';
import { Button } from '@/components/ui/button';

function Page() {
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
      investmentGoals: 'Growth',
      riskTolerance: 'Medium',
      preferredIndustry: 'Technology',
    },
  });

  function onSubmit(data: SignUpFormData) {
    try {
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h1 className="form-title">Sign Up & Personalize</h1>
      <form className="space-y-5" onSubmit={void handleSubmit(onSubmit)}>
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
          label="Investment Goals"
          name="investmentGoals"
          options={INVESTMENT_GOALS}
          control={control}
          error={errors.investmentGoals}
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
        <FooterLink
          text="Already have an account?"
          linkText="Sign in"
          href="/sign-in"
        />
      </form>
    </>
  );
}

export default Page;
