// components/form/form-date-picker.tsx
"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface FormDatePickerProps {
  label?: string;
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  errorMessage?: string;
  className?: string;
}

export function FormDatePicker({
  label,
  date,
  onDateChange,
  errorMessage,
  className,
}: FormDatePickerProps) {
  return (
    <div className={cn("space-y-1", className)}>
      {label && <Label>{label}</Label>}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
              errorMessage && "border-destructive"
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {date ? format(date, "PPP") : <span>Select date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0'>
          <Calendar mode='single' selected={date} onSelect={onDateChange} />
        </PopoverContent>
      </Popover>
      {errorMessage && (
        <p className='text-sm text-destructive'>{errorMessage}</p>
      )}
    </div>
  );
}
