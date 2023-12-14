'use client';

import * as React from 'react';
import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type TComboboxProps = React.PropsWithChildren & {
  fields: {
    value: string;
    label: string;
  }[];
  value: string;
  setValue: (val: string) => void;
  searchEmptyMessage?: string;
  popoverTriggerProps?: typeof PopoverTrigger.defaultProps;
  popoverContentProps?: typeof PopoverContent.defaultProps;
};

export function Combobox({
  fields,
  setValue,
  children,
  value,
  searchEmptyMessage = 'No result found',
  popoverTriggerProps = {},
  popoverContentProps: {
    className: popoverContentClassName,
    ...restPopoverContentProps
  } = {},
}: TComboboxProps) {
  return (
    <Popover>
      <PopoverTrigger asChild {...popoverTriggerProps}>
        {children}
      </PopoverTrigger>
      <PopoverContent
        {...restPopoverContentProps}
        className={cn('w-[200px] p-0', popoverContentClassName)}
      >
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>{searchEmptyMessage}</CommandEmpty>
          <CommandGroup>
            {fields.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? '' : currentValue);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === framework.value ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
