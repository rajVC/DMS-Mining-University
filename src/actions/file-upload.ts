"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from "@/auth";
export async function fileUpload({
   formData,
   assign_license
}) {
    const session = await auth();
    const session_id = session?.session_id;
    try {
        const response = await fetch(`${process.env.NEXT_API_ENDPOINT}/student/bulk/create?assign_license=${assign_license}`, {
            method: "POST",
            body: formData,
            headers: {
                Authorization: `Bearer ${session_id}`,
            },
        });
        const result = await response.json();
        return result;
    } catch {
        throw new Error("Something went wrong");
    }
}
