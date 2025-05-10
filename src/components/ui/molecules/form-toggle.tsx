import * as React from "react";
import { Switch } from "../switch";
import { Label } from "../label";
import { cn } from "@/lib/utils";
import { RiErrorWarningFill } from "react-icons/ri";

// interface FormToggleProps extends React.ComponentPropsWithoutRef<"input"> {
//   id: string;
//   label?: string;
//   description?: string;
//   checked: boolean;
//   onCheckedChange: (value: boolean) => void;
//   errorMessage?: string;
//   className?: string;
// }

// Fix here: Use correct type for the props passed to the Switch component
interface FormToggleProps
  extends React.ComponentPropsWithoutRef<typeof Switch> {
  id: string;
  label?: string;
  description?: string;
  errorMessage?: string;
  className?: string;
}

export const FormToggle = React.forwardRef<HTMLInputElement, FormToggleProps>(
  ({
    id,
    label,
    description,
    checked,
    onCheckedChange,
    errorMessage,
    className,
    ...props
  }) =>
    // ref
    {
      return (
        <div className='space-y-1'>
          {label && (
            <Label htmlFor={id} className='flex items-center gap-2'>
              {label}
            </Label>
          )}

          <div className='flex items-center gap-2'>
            <Switch
              id={id}
              checked={checked}
              onCheckedChange={onCheckedChange}
              className={cn(className, errorMessage && "border-red-500")}
              {...props}
            />
            {description && (
              <p className='text-muted-foreground text-sm'>{description}</p>
            )}
          </div>

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

FormToggle.displayName = "FormToggle";
