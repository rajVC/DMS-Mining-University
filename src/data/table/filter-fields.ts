import { FIELD_PARAMS } from "@/constant/params";

type SelectField = {
    key: string;
    label : string;
    fields: { defaultValue: string; label: string }[];
};

type InputField = {
    key: string;
    label : string
};

type MultipleInputField = InputField[];
type MultipleSelectField = SelectField[];

type FilterFieldType = {
    [key: string]: {
        input?: MultipleInputField;
        created_at?: InputField;
        select?: MultipleSelectField
        multiple_input?: MultipleInputField;
    };
};

export const filterField: FilterFieldType = {
    students_list: {
        input: [
            { key: FIELD_PARAMS.STUDENT_NAME, label : "Student Name" },
            { key: FIELD_PARAMS.LICENSE_NUMBER, label : "License Number" },
        ],
        created_at: {
            label: "Created Date",
            key: FIELD_PARAMS.CREATED_AT,
        },
        select: [{
            key: "status",
            label : "Status",
            fields: [
                { defaultValue: "all", label: "All" },
                { defaultValue: "active", label: "Active" },
                { defaultValue: "inactive", label: "Not Active" },
            ],
        }],
    },
    license_list: {
        input: [
            { key: FIELD_PARAMS.LICENSE_NUMBER, label : "License Number" },
        ],
        created_at: {
            label: "Created Date",
            key: FIELD_PARAMS.CREATED_AT,
        },
        select: [{
            key: FIELD_PARAMS.ASSIGNED_STATUS,
            label : "Assigned Status",
            fields: [
                { defaultValue: "all", label: "All" },
                { defaultValue: "assigned", label: "Assigned" },
                { defaultValue: "not_assigned", label: "Not Assigned" },
            ],
        }],
    },
};
