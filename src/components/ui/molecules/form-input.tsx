// components/form-input.tsx

import { cn } from "@/lib/utils";
import { RiErrorWarningFill } from "react-icons/ri";
import React from "react";
import { Input } from "../input";
import { Label } from "../label";

type FormInputProps = {
  id: string;
  label?: string;
  errorMessage?: string;
  className?: string;
  type?: string;
  placeholder?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      label,
      errorMessage,
      className,
      type = "text",
      placeholder,
      prefix,
      suffix,
      ...props
    },
    ref
  ) => {
    const hasAddon = prefix || suffix;

    return (
      <div className='space-y-1'>
        {label && <Label htmlFor={id}>{label}</Label>}

        <div
          className={cn(
            "relative flex items-center rounded-md border bg-white",
            errorMessage
              ? "border-destructive ring-destructive/40"
              : "border-input",
            hasAddon && "pl-3 pr-3"
          )}
        >
          {prefix && <div className='mr-2 text-muted-foreground'>{prefix}</div>}

          <Input
            id={id}
            ref={ref}
            type={type}
            placeholder={placeholder}
            className={cn(
              "flex-1 border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0",
              className
            )}
            aria-invalid={!!errorMessage}
            {...props}
          />

          {suffix && <div className='ml-2 text-muted-foreground'>{suffix}</div>}
        </div>

        {errorMessage && (
          <p className='text-sm text-destructive flex items-center gap-1'>
            <RiErrorWarningFill />
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
