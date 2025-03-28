import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format, parseISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { filterField } from "@/data/table/filter-fields";
import { Label } from "@/components/ui/label";
import { DayPicker } from "react-day-picker";
import { useFilterContext } from "@/context/filter-context";

const Filter = ({ filterType }: { filterType: string }) => {
  const { filters, setFilter } = useFilterContext();

  const field = filterField[filterType as keyof typeof filterField];
  const createdAtValue = filters[field.created_at?.key ?? ""] ?? "";

  const handleKeyDown = (e: React.KeyboardEvent, key: string) => {
    if (e.key === "Enter") {
      const target = e.target as HTMLInputElement;
      setFilter({[key] : target.value, "page" : 1});
    }
  };

  return (
    <div className="flex gap-4 w-full">
      {field.input &&
        field.input.length > 0 &&
        field.input.map((ele, i) => (
          <div
            key={`filter-${ele.key}-${i}`}
            className="flex flex-col gap-3 w-full"
          >
            <Label>{ele.label}</Label>
            <Input
              defaultValue={filters[ele.key] || ""}
              onBlur={(e) => setFilter({[ele.key] : e.target.value, "page" : 1})}
              onKeyDown={(e)=> handleKeyDown(e, ele.key)}
            />
          </div>
        ))}

      {/* Date Picker */}
      {field.created_at && (
        <div className="flex flex-col gap-3 w-full">
          <Label>{field.created_at.label}</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left"
              >
                <CalendarIcon className="h-4 w-4" />
                {createdAtValue
                  ? format(parseISO(createdAtValue.toString()), "yyyy-MM-dd")
                  : "Select Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
              <DayPicker
                mode="single"
                selected={createdAtValue ? parseISO(createdAtValue.toString()) : undefined}
                onSelect={(date) => {
                  if (field.created_at?.key) {
                    setFilter(
                      {[field.created_at?.key] :
                      date ? format(date, "yyyy-MM-dd") : "", "page" : 1}
                    );
                  }
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      )}

      {/* Status Filter */}
      {field.select &&
        field.select.length > 0 &&
        field.select.map((selectItem, index) => (
          <div className="flex flex-col gap-3 w-full" key={`select-${index}`}>
            <Label>{selectItem.label}</Label>
            <Select
              defaultValue={String(filters[selectItem.key] || "all")}
              onValueChange={(value) => {
                if (selectItem.key) {
                  setFilter({[selectItem.key] : value, "page" : 1});
                }
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {selectItem.fields.map((field, i) => (
                  <SelectItem
                    key={`filter-${field.label}-${i}`}
                    value={field.defaultValue}
                  >
                    {field.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
    </div>
  );
};

export default Filter;
