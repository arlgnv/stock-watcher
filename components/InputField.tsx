import { useId } from 'react';
import type {
  UseFormRegister,
  RegisterOptions,
  FieldError,
  FieldValues as ReactHookFormFieldValues,
  Path,
} from 'react-hook-form';
import { twJoin } from 'tailwind-merge';

import { Input } from './ui/input';
import { Label } from './ui/label';

interface Props<FieldValues extends ReactHookFormFieldValues> {
  label: string;
  placeholder: string;
  name: Path<FieldValues>;
  type?: string;
  register: UseFormRegister<FieldValues>;
  registerOptions?: RegisterOptions<FieldValues>;
  error: FieldError | undefined;
}

function InputField<FieldValues extends ReactHookFormFieldValues>({
  label,
  placeholder,
  name,
  type = 'text',
  register,
  registerOptions,
  error,
}: Props<FieldValues>) {
  const id = useId();

  return (
    <div className="space-y-2">
      <Label className="form-label" htmlFor={id}>
        {label}
      </Label>
      <Input
        className={twJoin(
          'form-input',
          registerOptions?.disabled && 'cursor-not-allowed opacity-50',
        )}
        id={id}
        type={type}
        placeholder={placeholder}
        aria-invalid={error ? 'true' : 'false'}
        {...register(name, registerOptions)}
      />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
}

export default InputField;
