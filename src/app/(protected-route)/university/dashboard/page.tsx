import DashboardPage from "@/components/core/dashboard/dashboard";
import { fetchData } from "@/lib/request/fetch-data";
import axios from "axios";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface ApiResponse {
  data: any;
}
const Dashboard = async () => {
  let res: ApiResponse = { data: {} };
  let errorState = { isError: false, msg: "" };
  try {
    res = await fetchData({
      url: `client/dashboard`,
      method: "GET",
      token: true,
    });
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

  return (
    <div>
      <DashboardPage data={res.data} role="university" isError={errorState.isError}
      msg={errorState.msg} />
    </div>
  );
};

export default Dashboard;
