import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import { TableDataProps, tableColumn } from "@/data/table/table-columns";
import { useFilterContext } from "@/context/filter-context";
import { reqeustServer } from "@/actions/reqeust-server-api";
import { useToast } from "@/hooks/use-toast";
import PaginationTable from "./pagination";

interface TableProps {
  data: {
    data: TableDataProps[];
    pages: number;
  };
  role: string;
  isPagination?: boolean;
  url: string;
  query?: object;
}
const DataTable = ({
  data,
  role,
  url,
  isPagination = false,
  query = {},
}: TableProps) => {
  const [record, setRecord] = useState({ data: [], pages: 0 });
  const columns = tableColumn[role as keyof typeof tableColumn];
  const { filters } = useFilterContext();
  const { page = 1 } = filters;
  const { toast } = useToast();
  useEffect(() => {
    if (Object.keys(filters).length > 0) {
      fetchData(filters);
    }
  }, [filters]);

  useEffect(() => {
    setRecord(data);
  }, [data]);

  const fetchData = async (filters) => {
    const updatedFilters = {
      ...filters,
      ...query,
      per_page: 10, // Add your static filter here
    };
    const queryString = new URLSearchParams(updatedFilters).toString();
    const res = await reqeustServer({
      url: `${url}?${queryString}`,
      method: "GET",
      token: true,
    });
    if (res.status === "fail") {
      toast({
        variant: "destructive",
        description: res.message,
      });
    } else {
      setRecord(res.data);
    }
  };
  return (
    <>
      <Table className="border-x border-y">
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key}>{column.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {record.data.length ? (
            record.data.map((item, i) => (
              <TableRow key={`${item.id}-${i}`}>
                {columns.map((column) => (
                  <TableCell key={column.key}>
                    {column.format
                      ? column.format(item[column.key] as string)
                      : column.customRender
                      ? column.customRender()
                      : column.render
                      ? column.render(item, i, page)
                      : item[column.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length + 1} className="text-center">
                No data available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {isPagination && <PaginationTable totalPages={record.pages} />}
    </>
  );
};

export default DataTable;
