"use client";
import React, { createContext, useContext, useState } from "react";

interface FilterState {
  [key: string]: string | number;
}

interface FilterContextProps {
  filters: FilterState;
  setFilter: (key: string | FilterState, value?: string | number) => void;
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [filters, setFilters] = useState<FilterState>({});

  const setFilter = (key: string | FilterState, value?: string | number) => {
    if (typeof key === "string" && value !== undefined) {
      // If key is a string, update a single filter
      setFilters((prev) => ({
        ...prev,
        [key]: value,
      }));
    } else if (typeof key === "object" && key !== null) {
      // If key is an object, update multiple filters at once
      setFilters((prev) => ({
        ...prev,
        ...key,
      }));
    }
  };

  return (
    <FilterContext.Provider value={{ filters, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }
  return context;
};
