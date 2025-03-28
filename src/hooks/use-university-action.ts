'use client'
import { useRouter } from "next/navigation";
import { useToast } from "./use-toast";
import { reqeustServer } from "@/actions/reqeust-server-api";
import { API_PARAMS } from "@/constant/api-params";
import { coreFormData } from "@/schema/form-schema";
import { fileUpload } from "@/actions/file-upload";
export const useUniversityActions = () => {
  const router = useRouter();
  const { toast } = useToast();
  const assignLicense = async (id: number) => {

    const res = await reqeustServer({
      url: `license/student/assign?${API_PARAMS.STUDENT_ID}=${id}`,
      method: "POST",
      token: true
    });

    if (res.status === "fail") {
      toast({
        title: "Not assigned",
        variant: "destructive",
        description: res.message,
      });
      return;
    }
    toast({
      title: "Success",
      description: res.message
    });
    router.refresh();
  };

  const removeLicense = async (license_number: string) => {

    const res = await reqeustServer({
      url: `license/delete?${API_PARAMS.LICENSE_NUMBER}=${license_number}`,
      method: "DELETE",
      token: true
    });

    if (res.status === "fail") {
      toast({
        title: "Not removed",
        variant: "destructive",
        description: res.message,
      });
      return;
    }
    toast({
      title: "Success",
      description: res.message
    });
    router.refresh();
  };

  const createStudent = async (data: coreFormData) => {
    const res = await reqeustServer({
      body: data,
      url: "student/create?user_type=student",
      method: "POST",
      token: true
    })

    if (res.status === "success") {
      toast({
        title: "Create student successful",
        description: res.message,
      });
      router.refresh();
      return;
    } else {
      toast({
        variant: "destructive",
        title: "Student Not crated",
        description: res.message,
      });
    }
  }

  const createBulkStudent = async (formData: FormData, assign_license: boolean, setIsWarningOpen: (isOpen: boolean) => void) => {
    const res = await fileUpload({
      formData,
      assign_license
    })
    if (res.status === "success") {
      toast({
        title: "Create students successful",
        description: res.message,
      });
      if (res.data.total_unassigned_students > 0) { setIsWarningOpen(true) }
      router.refresh();
      return res.data;
    } else {
      toast({
        variant: "destructive",
        title: "Students not created",
        description: res.message,
      });
    }
  }

  const downloadSampleFile = async () => {
    const response = await reqeustServer({
      url: "student/download-sample-excel",
      method: "GET",
      token: true,
      options: { responseType: "blob" },
      headerOptions: { "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }
    })
    const res = JSON.parse(response)

    if (res.status === "success") {
      const url = res.data.download_link;
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "sample_students_data.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({
        title: "Download",
        description: res.message,
      });
      router.refresh();
      return;
    } else {
      toast({
        variant: "destructive",
        title: "Download failed",
        description: res.message,
      });
    }
  }

  const downloadUnallocateFile = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "23412.xlsx");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const deleteStudent = async (id: number) => {
    const res = await reqeustServer({
      url: `student/delete?student_id=${id}`,
      method: "DELETE",
      token: true
    });

    if (res.status === "fail") {
      toast({
        title: "Cannot delete",
        variant: "destructive",
        description: res.message,
      });
      return;
    }
    router.refresh();
    toast({
      title: "Success",
      description: res.message
    });
  }

  const updateStudent = async (data: coreFormData,id: number) => {
    const res = await reqeustServer({
      url: `student/update?student_id=${id}`,
      body: data,
      method: "PUT",
      token: true
    })

    if (res.status === "success") {
      toast({
        title: "Update student successful",
        description: res.message,
      });
      router.refresh();
      return;
    } else {
      toast({
        variant: "destructive",
        title: "Student Not Update",
        description: res.message,
      });
    }
  }

  return {
    assignLicense,
    removeLicense,
    createStudent,
    createBulkStudent,
    downloadSampleFile,
    downloadUnallocateFile,
    deleteStudent,
    updateStudent
  };
};
