import StudentReport from "@/components/core/report/report";
import { redirect } from "next/navigation";
import axios from "axios";
import { fetchData } from "@/lib/request/fetch-data";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface ApiResponse {
  data: any;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function report({ searchParams }: any) {
  const { seed_id, user_id, student_name } = await searchParams;

  if (!seed_id || !user_id) {
    throw new Error("seed number is required");
  }

  let res: ApiResponse = { data: {} };
  let errorState = { isError: false, msg: "" };
  try {
    res = await fetchData({
      url: `seed/selected/player/progress?seed_id=${seed_id}&&user_id=${user_id}`,
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
    <StudentReport
      reportData={res.data}
      seed_id={seed_id}
      student_name={student_name}
      user_id={user_id}
      isError={errorState.isError}
      msg={errorState.msg}
    />
  );
}
