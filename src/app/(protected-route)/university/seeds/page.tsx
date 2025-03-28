import { auth } from "@/auth";
import SeedListTable from "@/components/core/university/seed-list-table";
import { fetchData } from "@/lib/request/fetch-data";
import axios from "axios";
import { redirect } from "next/navigation";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface ApiResponse {
  data: any;
}
/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function SeedPage({ searchParams }: any) {
  const session = await auth();
  const { per_page, page } = await searchParams;

  const perPage = per_page ? Number(per_page) : 10;
  const pageVal = page ? Number(page) : 1;
  let res: ApiResponse = { data: {} };
  let errorState = { isError: false, msg: "" };
  try {
    res = await fetchData({
      url: `seed/list/pagination?page=${pageVal}&per_page=${perPage}`,
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

  return <SeedListTable data={res.data} url={"seed/list/pagination"} sessionData={session}  isError={errorState.isError} msg={errorState.msg} />;
}
