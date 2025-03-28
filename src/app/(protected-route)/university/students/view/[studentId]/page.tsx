import React from "react";
import ProfilePage from "@/components/core/university/view-student";
import { redirect } from "next/navigation";
import axios from "axios";
import { fetchData } from "@/lib/request/fetch-data";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface ApiResponse {
  data: any;
}
/* eslint-disable @typescript-eslint/no-explicit-any */
const page = async ({ params }: any) => {
  const { studentId } = await params;

  let res: ApiResponse = { data: {} };
  let errorState = { isError: false, msg: "" };
  try {
    res = await fetchData({
      url: `student/retrieve?student_id=${studentId}`,
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
  return <ProfilePage userData={res.data} isError={errorState.isError} msg={errorState.msg}/>;
};

export default page;
