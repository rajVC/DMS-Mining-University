"use server";
import { fetchData } from "@/lib/request/fetch-data";
import { FetcherProps } from "@/lib/request/type";
import axios from "axios";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function reqeustServer({
    url,
    method = "GET",
    token = false,
    body = null,
    options = {},
    headerOptions = {},
}: FetcherProps) {
    try {
        const res = await fetchData({
            url,
            method,
            token,
            body,
            options,
            headerOptions
        });

        return res;

    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            if (error.response && error.response.data) {
                return {
                    status: error.response.data.status || "fail",
                    data: error.response.data.data || [],
                    statusCode: error.response.status,
                    message: error.response.data.message || error.message || "Something went wrong",
                }
            } else {
                return {
                    status: "fail",
                    data: [],
                    statusCode: 400,
                    message: "Something went wrong",
                }
            }
        }
    }
}
