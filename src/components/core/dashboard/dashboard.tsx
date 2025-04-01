"use client";
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { FIELD_PARAMS } from '@/constant/params';
import { useBreadcrumb } from '@/context/breadcrumb-context';
import { dashboardData, DashboardDataProps } from "@/data/dashboard-items";
import { useEffect } from 'react';

interface DashboardComponentProps {
    data: DashboardDataProps;
    role: string,
    isError: boolean,
    msg: string
}

export default function DashboardPage({ data, role, isError, msg }: DashboardComponentProps) {
    const columns = dashboardData[role as keyof typeof dashboardData];

    const { setBreadcrumbs } = useBreadcrumb();

    useEffect(() => {
        if (isError) throw new Error(msg || "Something went wrong");
        setBreadcrumbs([
            { label: "Dashboard", href: "#" },
        ]);
    }, [setBreadcrumbs]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-[150px] w-full justify-items-center">
            {columns.length > 0 ? (columns.map((value) => (
                <Card key={value.dataFields.join("-")} className="flex flex-col justify-center items-center gap-3 rounded-m w-full max-w-[450px] min-h-[200px] text-center">
                    {value.dataFields.length === 2 && value.dataFields.includes(FIELD_PARAMS.ASSIGNED_LICENSES) ? (
                        <div className="w-full h-full flex justify-center items-stretch">
                            <div className="w-1/2 flex flex-col justify-center items-center gap-1 md:gap-0 border-r border-black-900">
                                <CardTitle className="text-xl md:text-base lg:text-xl font-medium break-words w-full">
                                    Assigned License
                                </CardTitle>
                                <CardContent className="text-3xl md:text-2xl lg:text-3xl font-semibold p-0">
                                    {data[FIELD_PARAMS.ASSIGNED_LICENSES]}
                                </CardContent>
                            </div>
                            <div className="w-1/2 flex flex-col justify-center items-center gap-1 md:gap-0">
                                <CardTitle className="text-xl md:text-base lg:text-xl font-medium break-words w-full">
                                    Unassigned License
                                </CardTitle>
                                <CardContent className="text-3xl md:text-2xl lg:text-3xl font-semibold p-0">
                                    {data[FIELD_PARAMS.UNASSIGNED_LICENSES]}
                                </CardContent>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-full flex flex-col justify-center items-center gap-1 md:gap-0">
                            <CardTitle className="text-xl md:text-base lg:text-xl font-medium">{value.label}</CardTitle>
                            <CardContent className="text-3xl md:text-2xl lg:text-3xl font-semibold p-0">
                                {value.dataFields.map((key) => data[key])}
                            </CardContent>
                        </div>
                    )}
                </Card>
            ))) : <></>}
        </div>
    )
}
