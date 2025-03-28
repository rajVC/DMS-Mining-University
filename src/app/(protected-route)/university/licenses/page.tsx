import LicenseListTable from "@/components/core/university/license-list-table";
import { fetchData } from "@/lib/request/fetch-data";
import axios from "axios";
import { redirect } from "next/navigation";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface ApiResponse {
  data: any;
}
/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function ManageLicensepage({ searchParams }: any) {
  const { per_page, page, assigned_status, created_at, license_number } = await searchParams;

  const perPage = per_page ? Number(per_page) : 10;
  const pageVal = page ? Number(page) : 1;
  const createdAt = created_at ? created_at : ""
  const assignedStatus = assigned_status ? assigned_status : ""
  const licenseNumber = license_number ? license_number : ""
  let res: ApiResponse = { data: {} };
  let errorState = { isError: false, msg: "" };
  try {
    res = await fetchData({
      url: `license/list?page=${pageVal}&&per_page=${perPage}&created_at=${createdAt}&assigned_status=${assignedStatus}&license_number=${licenseNumber}`,
      method: "GET",
      token: true
    })
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data?.message || error.message;

      if (status === 401) {
        redirect("/auth/login");
      } else {
        errorState = {
          isError: true,
          msg: message
        };
      }
    } else {
      errorState = {
        isError: true,
        msg: error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }


  return <LicenseListTable data={res.data} url="license/list" isError={errorState.isError} msg={errorState.msg}/>;
}
