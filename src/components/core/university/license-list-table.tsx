"use client";
import { TableDataProps } from "@/data/table/table-columns";
import Filter from "@/components/core/table/filter";
import DataTable from "@/components/core/table/table";
import { useBreadcrumb } from "@/context/breadcrumb-context";
import { useEffect } from "react";
import { FilterProvider, useFilterContext } from "@/context/filter-context";
import DownloadFile from "../download";

interface TableComponentProps {
  data: {
    data: TableDataProps[];
    pages: number;
  };
  url: string;
  isError: boolean;
  msg: string
}

interface LicenseComponentProps {
  data: {
    data: TableDataProps[];
    pages: number;
  };
  url: string;
}

export default function LicenseListTable({ data, url ,isError,msg}: TableComponentProps) {
  const { setBreadcrumbs } = useBreadcrumb();

  useEffect(() => {
    if(isError) throw new Error(msg || "Something went wrong");
    setBreadcrumbs([{ label: "Licenses", href: "#" }]);
  }, [setBreadcrumbs]);

  return (
    <FilterProvider>
      <InnerLicenseListTable data={data} url={url} />
    </FilterProvider>
  );
}


function InnerLicenseListTable({ data, url }: LicenseComponentProps) {
  const { filters } = useFilterContext();
  const modifiedFilters = {
    ...Object.fromEntries(Object.entries(filters).map(([key, value]) =>
      key === "assigned_status" ? ["status", value] : [key, value]
    ))
  };

  return (
    <div className="space-y-4">
      <div className="text-right">
        <DownloadFile url="license/download/report" params={modifiedFilters} />
      </div>
      {/* Filter */}
      <Filter filterType={"license_list"} />
      {/* Table */}
      <DataTable data={data} role={"license_list"} url={url} isPagination={true} />
    </div>
  );
}