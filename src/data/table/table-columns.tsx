import { ReactNode } from "react";
import StudentTableAction from "@/components/core/university/student-table-action";
import { Badge } from "@/components/ui/badge";
import CopyToClipboardButton from "@/components/ui/copy-to-clipboard";
import { FIELD_PARAMS } from "@/constant/params";
import { format } from "date-fns";
import Link from "next/link";

export interface TableDataProps {
  id: number;
  email: string;
  contact: string;
  address: string;
  status: boolean;
  actions: ReactNode;
  [FIELD_PARAMS.UNIVERSITY_NAME]: string;
  [FIELD_PARAMS.CREATED_AT]: string;
  [FIELD_PARAMS.EXPIRY_DATE]: string;
  [FIELD_PARAMS.TOTAL_STUDENTS]: number;
  [FIELD_PARAMS.TOTAL_LICENSES]: number;
  [FIELD_PARAMS.ROLE_ID]: string;
  [FIELD_PARAMS.ROLE_ID]: string;
  [FIELD_PARAMS.FIRST_NAME]: string;
  [FIELD_PARAMS.LAST_NAME]: string;
  [FIELD_PARAMS.USER_TYPE]: string;
  [FIELD_PARAMS.LICENSE_NUMBER]: string;
  [FIELD_PARAMS.ASSIGN_LICENSE]: boolean;
  [FIELD_PARAMS.CREATED_AT]: string;
  [FIELD_PARAMS.UNIVERSITY_NAME]: string;
}

export const tableColumn = {
  students_list: [
    {
      key: FIELD_PARAMS.ROLE_ID,
      label: "Student ID",
      render: (props: TableDataProps) => {
        return (
          <Link
            href={`/university/students/view/${props.id}`}
            className="underline text-primary font-medium"
          >
            {props[FIELD_PARAMS.ROLE_ID]}
          </Link>
        );
      },
    },
    {
      key: FIELD_PARAMS.STUDENT_NAME,
      label: "Name",
      render(prop) {
        return `${prop[FIELD_PARAMS.FIRST_NAME]} ${
          prop[FIELD_PARAMS.LAST_NAME]
        }`;
      },
    },
    {
      key: FIELD_PARAMS.CREATED_AT,
      label: "Enrollment Date",
      format: (value: string) => format(new Date(value), "yyyy-MM-dd"),
    },
    {
      key: FIELD_PARAMS.LICENSE_NUMBER,
      label: "License Number",
      render(prop) {
        return prop[FIELD_PARAMS.LICENSE_NUMBER] ? (
          <div className="flex">
            <p className="truncate w-auto pr-2">{prop[FIELD_PARAMS.LICENSE_NUMBER]}</p>
            <CopyToClipboardButton
              textToCopy={prop[FIELD_PARAMS.LICENSE_NUMBER]}
            />
          </div>
        ) : (
          "-"
        );
      },
    },
    {
      key: "status",
      label: "Status",
      render: (props: TableDataProps) => {
        return (
          <Badge
            className={
              props.status ? "bg-[#84CC16] text-white" : "bg-red-500 text-white"
            }
          >
            {props.status ? "Active" : "Not Active"}
          </Badge>
        );
      },
    },
    {
      key: "actions",
      label: "Actions",
      render: (props: TableDataProps) => {
        return <StudentTableAction {...props} />;
      },
    },
  ],
  license_list: [
    {
      key: "id",
      label: "Sr. No",
      render: (props: TableDataProps, index: number, page: number) => {
        const value = (page - 1) * 10 + index + 1;
        return <span>{value}</span>;
      },
    },
    {
      key: FIELD_PARAMS.LICENSE_KEY,
      label: "License Number",
      render(prop) {
        return prop[FIELD_PARAMS.LICENSE_KEY] ? (
          <div className="flex">
            <p className="truncate w-auto pr-2">{prop[FIELD_PARAMS.LICENSE_KEY]}</p>
            <CopyToClipboardButton
              textToCopy={prop[FIELD_PARAMS.LICENSE_KEY]}
            />
          </div>
        ) : (
          "-"
        );
      },
    },
    {
      key: FIELD_PARAMS.EXPIRY_DATE,
      label: "Valid Till",
      format: (value: string) => format(new Date(value), "yyyy-MM-dd"),
    },
    {
      key: FIELD_PARAMS.IS_ASSIGNED,
      label: "Assigned Status",
      render: (props: TableDataProps) => {
        return (
          <Badge
            className={
              props[FIELD_PARAMS.IS_ASSIGNED]
                ? "bg-[#84CC16] text-white"
                : "bg-[#FFC130] text-white"
            }
          >
            {props[FIELD_PARAMS.IS_ASSIGNED] ? "Assigned" : "Not Assigned"}
          </Badge>
        );
      },
    },
  ],
  seed_list: [
    { key: FIELD_PARAMS.SEED_NUMBER, label: "Seed number" },
    {
      key: FIELD_PARAMS.CREATED_AT,
      label: "Created Date",
      format: (value: string) => format(new Date(value), "yyyy-MM-dd"),
    },
  ],
};
