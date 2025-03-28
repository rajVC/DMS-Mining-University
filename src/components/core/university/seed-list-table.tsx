"use client";
import { TableDataProps } from "@/data/table/table-columns";
import DataTable from "@/components/core/table/table";
import { useBreadcrumb } from "@/context/breadcrumb-context";
import { useEffect } from "react";
import CreateSeed from "./create-seed";
import { FilterProvider } from "@/context/filter-context";
import DownloadFile from "../download";
import { Session } from "next-auth";

interface TableComponentProps {
    data: {
        data: TableDataProps[];
        pages: number
    }
    url: string,
    sessionData:Session;
    isError: boolean;
  msg: string
}

export default function SeedListTable({
    data,
    url,
    sessionData,
    isError,
    msg
}: TableComponentProps) {
    const { setBreadcrumbs } = useBreadcrumb();
    const queryParams = {
        university_id: Number(sessionData?.id)
    }
    useEffect(() => {
        if(isError) throw new Error(msg || "Something went wrong");
        setBreadcrumbs([{ label: "Seeds", href: "#" }]);
    }, [setBreadcrumbs]);

    return (
        <div className="space-y-4">
            <FilterProvider>
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                        <CreateSeed />
                    </div>
                    <div>
                        <DownloadFile url="seed/download" params={queryParams} />
                    </div>
                </div>
                {/* Table */}
                <DataTable data={data} role={"seed_list"} isPagination={true} url={url} />
            </FilterProvider>
        </div>
    );
}
