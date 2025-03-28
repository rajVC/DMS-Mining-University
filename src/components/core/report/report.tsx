"use client";
import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { ReportFieldProps } from "@/types/report-data";
import { useBreadcrumb } from "@/context/breadcrumb-context";
import { formatToTwoDecimals } from "@/lib/utils";
import DownloadFile from "../download";

interface ReportDataProps {
  reportData: ReportFieldProps;
  seed_id: string;
  student_name: string;
  user_id: number;
  isError: boolean;
  msg: string
}

const StudentReport = ({
  reportData,
  seed_id,
  student_name,
  user_id,
  isError,
  msg
}: ReportDataProps) => {
  const { setBreadcrumbs } = useBreadcrumb();
  const queryParams = {
    seed_id: Number(seed_id),
    student_id:Number(user_id)
  }
  useEffect(() => {
    if(isError) throw new Error(msg || "Something went wrong");
    setBreadcrumbs([
      { label: "Students", href: "/university/students" },
      {
        label: `${student_name}`,
        href: `/university/students/view/${user_id}`,
      },
      { label: "Report", href: "#" },
    ]);
  }, [setBreadcrumbs]);

  return (
    <div className="w-full">
      <div className="text-right">
        <DownloadFile url="seed/download/report/pdf" params={queryParams} />
      </div>
      {/* Header */}
      <div className="flex justify-between items-center my-3">
        <h1 className="text-3xl font-bold">{seed_id}</h1>
        <div className="flex items-center gap-2 text-gray-500">
          <Calendar size={16} />
          <span>Last Login</span>
          <span className="font-semibold">{reportData?.last_login}</span>
        </div>
      </div>

      {/* Profit Margin & Efficiency */}
      <div className="grid grid-cols-2 gap-6 border-b pb-4">
        <div>
          <p className="text-sm text-blue-600 font-semibold">Profit Margin</p>
          <p className="text-2xl font-semibold">
            $ {formatToTwoDecimals(reportData?.profit_margin)}
          </p>
        </div>
        <div>
          <p className="text-sm text-blue-600 font-semibold">
            Efficiency Ratio (Revenue/Cost)
          </p>
          <p className="text-2xl font-semibold">
            {formatToTwoDecimals(reportData.efficiency_ratio)}
          </p>
        </div>
      </div>

      {/* Sections */}
      <Section title="Production Summary">
        <Grid>
          <InfoItem
            label="Waste Mined"
            value={`${formatToTwoDecimals(reportData?.totalWasteTonsMined)}T`}
          />
          <InfoItem
            label="Low Grade (LG) Ore Mined"
            value={`${formatToTwoDecimals(reportData?.minedLg)}T`}
          />
          <InfoItem
            label="Medium Grade (MG) Ore Mined"
            value={`${formatToTwoDecimals(reportData?.minedMg)}T`}
          />
          <InfoItem label="Total T&C Waste" value="2500T" />
          <InfoItem label="Total Ore" value={`${formatToTwoDecimals(reportData?.totalOreGrade)}T`} />
          <InfoItem
            label="Overall Grade"
            value={`${formatToTwoDecimals(reportData?.overallGrade)}%`}
          />
        </Grid>
      </Section>

      <Section title="Cost Breakdown">
        <Grid>
          <InfoItem
            label="Waste Mined"
            value={`$ ${formatToTwoDecimals(reportData?.wasteMiningCost)}`}
          />
          <InfoItem
            label="Total Ore Mining"
            value={`$ ${formatToTwoDecimals(reportData?.totalOreMiningCost)}`}
          />
          <InfoItem
            label="Total Drilling"
            value={`$ ${formatToTwoDecimals(reportData?.totalDrillingCost)}`}
          />
          <InfoItem
            label="Total Blasting"
            value={`$ ${formatToTwoDecimals(reportData?.totalBlastingCost)}`}
          />
          <InfoItem
            label="Total Load & Haul"
            value={`$ ${formatToTwoDecimals(reportData?.totalLoadHaulCost)}`}
          />
          <InfoItem
            label="Cost Per Ton"
            value={`$ ${formatToTwoDecimals(reportData?.costPerTon)}`}
          />
          <InfoItem
            label="Tons Per Day"
            value={`${formatToTwoDecimals(reportData?.dailyTonsMined)}T`}
          />
          <InfoItem label="Stripping Ration" value={`${formatToTwoDecimals(reportData?.stripping_ratio)}`} />
        </Grid>
      </Section>

      <Section title="Exploration Details">
        <Grid>
          <InfoItem
            label="Exploration Drilling Length"
            value={`${formatToTwoDecimals(reportData?.totalDrillingLengthMeters)}m`}
          />
          <InfoItem
            label="Exploration Cost"
            value={`$ ${formatToTwoDecimals(reportData?.explorationCost)}`}
          />
        </Grid>
      </Section>

      <Section title="Financial Summary">
        <Grid>
          <InfoItem label="Total Cost" value={`$ ${formatToTwoDecimals(reportData?.totalCost)}`} />
          <InfoItem
            label="Total Revenue"
            value={`$ ${formatToTwoDecimals(reportData?.totalRevenue)}`}
          />
          <InfoItem
            label="Operational Budget"
            value={`$ ${formatToTwoDecimals(reportData?.operatingBudget)}`}
          />
        </Grid>
      </Section>
    </div>
  );
};

export default StudentReport;

// Section Wrapper
const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mt-6">
    <h2 className="text-lg font-semibold text-blue-600">{title}</h2>
    {children}
  </div>
);

// Grid Layout
const Grid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-3">{children}</div>
);

// Info Item
const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <Card className="shadow-none border-0 rounded-none p-2 border-b-[1px] border-solid">
    <CardContent className="p-0">
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </CardContent>
  </Card>
);
