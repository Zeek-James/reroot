import { cn } from "@/lib/utils";
import { Label } from "../label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import { RiErrorWarningFill } from "react-icons/ri";

interface FormSelectProps {
  id: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  errorMessage?: string;
  className?: string;
  wrapperClassName?: string;
  required: boolean;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  id,
  label,
  placeholder = "Select an option",
  value,
  onChange,
  options,
  errorMessage,
  className,
  wrapperClassName,
  required,
}) => {
  return (
    <div className={cn("flex flex-col mb-4", wrapperClassName)}>
      {label && (
        <Label htmlFor={id}>
          {label}
          {required && <span className='text-red-700 text-[14px] ml-1'>*</span>}
        </Label>
      )}

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          id={id}
          className={cn(
            "w-full border bg-muted p-2 pr-10 rounded-md appearance-none",
            errorMessage && "border-destructive ring-destructive/40",
            className
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt, index) => {
            const val = typeof opt === "string" ? opt : opt.value;
            const lbl = typeof opt === "string" ? opt : opt.label ?? opt.value;
            return (
              <SelectItem key={index} value={val}>
                {lbl}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      {errorMessage && (
        <p className='text-sm text-destructive flex items-center gap-1 mt-1'>
          <RiErrorWarningFill />
          {errorMessage}
        </p>
      )}
    </div>
  );
};
