import { FIELD_PARAMS } from "@/constant/params";

export interface DashboardDataProps {
    [FIELD_PARAMS.ASSIGNED_LICENSES]: number;
    [FIELD_PARAMS.UNASSIGNED_LICENSES]: number;
    [FIELD_PARAMS.TOTAL_STUDENTS]: number;
    [FIELD_PARAMS.TOTAL_SEEDS]: number
}


export const dashboardData = {
    university: [
        { dataFields: [FIELD_PARAMS.TOTAL_STUDENTS], label: "Total Students" },
        { dataFields: [FIELD_PARAMS.ASSIGNED_LICENSES, FIELD_PARAMS.UNASSIGNED_LICENSES], label: "Assigned | Unassigned" },
        { dataFields: [FIELD_PARAMS.TOTAL_SEEDS], label: "Total Seeds" },
    ] as {
        dataFields: (keyof DashboardDataProps)[];
        label: string;
    }[]
};
