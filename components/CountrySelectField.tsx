'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import {
  type Control,
  Controller,
  type FieldError,
  type FieldValues as ReactHookFormFieldValues,
  type Path,
} from 'react-hook-form';
import countryList from 'react-select-country-list';
import { twJoin } from 'tailwind-merge';

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Button } from './ui/button';
import { Label } from './ui/label';

const countriesData = countryList().getData();

function transformCountryCodeToFlagEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));

  return String.fromCodePoint(...codePoints);
}

interface Props<FieldValues extends ReactHookFormFieldValues> {
  label: string;
  name: Path<FieldValues>;
  control: Control<FieldValues>;
  error: FieldError | undefined;
  required?: boolean;
}

function CountrySelectField<FieldValues extends ReactHookFormFieldValues>({
  name,
  label,
  control,
  error,
  required,
}: Props<FieldValues>) {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-2">
      <Label className="form-label" htmlFor={name}>
        {label}
      </Label>
      <Controller
        name={name}
        control={control}
        rules={{
          required: required
            ? `Please select ${label.toLocaleLowerCase()}`
            : false,
        }}
        render={({ field }) => (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                className="country-select-trigger"
                variant="outline"
                role="combobox"
                aria-expanded={open}
              >
                {field.value ? (
                  <span className="flex items-center gap-2">
                    <span>{transformCountryCodeToFlagEmoji(field.value)}</span>
                    <span>
                      {
                        countriesData.find(
                          (countryData) => countryData.value === field.value,
                        )?.label
                      }
                    </span>
                  </span>
                ) : (
                  'Select your country...'
                )}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-full border-gray-600 bg-gray-800 p-0"
              align="start"
            >
              <Command className="border-gray-600 bg-gray-800">
                <CommandInput
                  className="country-select-input"
                  placeholder="Search countries..."
                />
                <CommandEmpty className="country-select-empty">
                  No countries found.
                </CommandEmpty>
                <CommandList className="scrollbar-hide-default max-h-60 bg-gray-800">
                  {countriesData.map(({ label, value }) => (
                    <CommandItem
                      className="country-select-item"
                      key={value}
                      onSelect={() => {
                        field.onChange(value);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={twJoin(
                          'mr-2 h-4 w-4 text-yellow-500',
                          field.value === value ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                      <span className="flex items-center gap-2">
                        <span>{transformCountryCodeToFlagEmoji(value)}</span>
                        <span>{label}</span>
                      </span>
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )}
      />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
      <p className="text-xs text-gray-500">
        Helps us show market data and news relevant to you.
      </p>
    </div>
  );
}

export default CountrySelectField;
