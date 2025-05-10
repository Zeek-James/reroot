// components/form/form-date-range.tsx
"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// import { Calendar } from "../calendar";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "../calendar";

interface FormDateRangeProps {
  label?: string;
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  errorMessage?: string;
  className?: string;
}

export function FormDateRange({
  label,
  dateRange,
  onDateRangeChange,
  errorMessage,
  className,
}: FormDateRangeProps) {
  return (
    <div className={cn("space-y-1", className)}>
      {label && <Label>{label}</Label>}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            className={cn(
              "w-full justify-start text-left font-normal",
              !dateRange?.from && "text-muted-foreground",
              errorMessage && "border-destructive"
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {dateRange?.from ? (
              dateRange.to ? (
                `${format(dateRange.from, "PPP")} - ${format(
                  dateRange.to,
                  "PPP"
                )}`
              ) : (
                format(dateRange.from, "PPP")
              )
            ) : (
              <span>Select date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0'>
          <Calendar
            mode='range'
            selected={dateRange}
            onSelect={onDateRangeChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
      {errorMessage && (
        <p className='text-sm text-destructive'>{errorMessage}</p>
      )}
    </div>
  );
}
