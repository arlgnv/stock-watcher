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
  name: Path<FieldValues>;
  label: string;
  placeholder: string;
  type?: string;
  register: UseFormRegister<FieldValues>;
  error: FieldError | undefined;
  validation?: RegisterOptions<FieldValues>;
  disabled?: boolean;
}

function InputField<FieldValues extends ReactHookFormFieldValues>({
  name,
  label,
  placeholder,
  type = 'text',
  register,
  error,
  validation,
  disabled,
}: Props<FieldValues>) {
  return (
    <div className="space-y-2">
      <Label className="form-label" htmlFor={name}>
        {label}
      </Label>
      <Input
        className={twJoin(
          'form-input',
          disabled && 'cursor-not-allowed opacity-50',
        )}
        id={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        {...register(name, validation)}
      />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
}

export default InputField;
