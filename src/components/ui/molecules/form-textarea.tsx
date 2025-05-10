"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "../label";
import { RiErrorWarningFill } from "react-icons/ri";

type FormTextAreaProps = {
  id: string;
  label?: string;
  errorMessage?: string;
  maxLength?: number;
  showCount?: boolean;
  className?: string;
  wrapperClassName?: string;
  required?: boolean;
  rows?: number;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const FormTextArea = React.forwardRef<
  HTMLTextAreaElement,
  FormTextAreaProps
>(
  (
    {
      id,
      label,
      errorMessage,
      maxLength,
      showCount = true,
      className,
      wrapperClassName,
      required,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const [value, setValue] = React.useState(props.value?.toString() || "");

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
      props.onChange?.(e);
    };

    return (
      <div className={cn("space-y-1", wrapperClassName)}>
        {label && (
          <Label htmlFor={id}>
            {label}
            {required && <span className='text-destructive ml-1'>*</span>}
          </Label>
        )}

        <textarea
          id={id}
          ref={ref}
          rows={rows}
          maxLength={maxLength}
          value={value}
          onChange={handleChange}
          className={cn(
            "w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none",
            errorMessage && "border-destructive ring-destructive/40",
            className
          )}
          aria-invalid={!!errorMessage}
          {...props}
        />

        {showCount && maxLength && (
          <p className='text-xs text-muted-foreground text-right'>
            {value.length}/{maxLength}
          </p>
        )}

        {errorMessage && (
          <p className='text-sm text-destructive flex items-center gap-1'>
            <RiErrorWarningFill className='text-base' />
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

FormTextArea.displayName = "FormTextArea";
