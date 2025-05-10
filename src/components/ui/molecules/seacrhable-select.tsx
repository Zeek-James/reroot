import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../command";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";

type Option = { label: string; value: string } | string;

interface SearchableSelectProps {
  id?: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  selectOptions: Option[];
  placeholder?: string;
  className?: string;
  isDisabled?: boolean;
  required?: boolean;
}

export const SearchableSelect: React.FC<SearchableSelectProps> = ({
  id,
  label,
  value,
  onChange,
  selectOptions,
  placeholder = "Select an option",
  className,
  isDisabled = false,
  required,
}) => {
  const [open, setOpen] = React.useState(false);

  const options = selectOptions.map((opt) =>
    typeof opt === "string" ? { value: opt, label: opt } : opt
  );

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  return (
    <div className='flex flex-col mb-4'>
      {label && (
        <label htmlFor={id} className='text-sm font-medium mb-1'>
          {label}
          {required && <span className='text-red-500 ml-1'>*</span>}
        </label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type='button'
            disabled={isDisabled}
            className={cn(
              "w-full flex items-center justify-between rounded-md border bg-muted px-3 py-2 text-sm shadow-sm",
              isDisabled && "opacity-50 cursor-not-allowed",
              className
            )}
          >
            <span className={cn(!value && "text-muted-foreground")}>
              {selectedLabel || placeholder}
            </span>
            <ChevronsUpDown className='ml-2 h-4 w-4 text-muted-foreground' />
          </button>
        </PopoverTrigger>
        <PopoverContent className='w-[var(--radix-popover-trigger-width)] p-0'>
          <Command>
            <CommandInput placeholder='Search...' className='h-9' />
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {options.map((opt) => (
                <CommandItem
                  key={opt.value}
                  onSelect={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className='cursor-pointer'
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === opt.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {opt.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
