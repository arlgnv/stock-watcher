import {
  type Control,
  Controller,
  type FieldError,
  type FieldValues as ReactHookFormFieldValues,
  type Path,
} from 'react-hook-form';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Label } from './ui/label';

interface Props<FieldValues extends ReactHookFormFieldValues> {
  label: string;
  name: Path<FieldValues>;
  control: Control<FieldValues>;
  options: {
    value: string;
    label: string;
  }[];
  error: FieldError | undefined;
  required?: boolean;
}

function SelectField<FieldValues extends ReactHookFormFieldValues>({
  name,
  label,
  options,
  control,
  required,
  error,
}: Props<FieldValues>) {
  return (
    <div className="space-y-2">
      <Label className="form-label" htmlFor={name}>
        {label}
      </Label>
      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? `${label} is required` : false,
        }}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger className="select-trigger">
              <SelectValue placeholder="Placeholder" />
            </SelectTrigger>
            <SelectContent className="border-gray-600 bg-gray-800 text-white">
              <SelectGroup>
                {options.map((option) => (
                  <SelectItem
                    className="focus:bg-gray-600 focus:text-white"
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
}

export default SelectField;
