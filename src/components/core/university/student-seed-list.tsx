"use client";

import { reqeustServer } from "@/actions/reqeust-server-api";
import { Card, CardTitle } from "@/components/ui/card";
import {
  CalendarDays,
  CircleChevronRight,
  CircleDollarSign,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "../loader/loader";
import { UserFieldProps } from "@/types/user-field";
import { useToast } from "@/hooks/use-toast";
import DownloadFile from "../download";

interface SeedListProps {
  seed_id: number;
  last_login: string;
  profit_margin: string;
}
const StudentSeedList = ({ userData }: UserFieldProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const [seedList, setSeedList] = useState<SeedListProps[]>([]);
  const [isloading, setIsLoading] = useState(false);
  const queryParams = {
    student_id: userData.id,
  };
  const fetchSeedList = async () => {
    try {
      setIsLoading(true);
      const res = await reqeustServer({
        url: `seed/student/selected?user_id=${userData.id}`,
        method: "GET",
        token: true,
      });
      if (res.status === "success" && res.data.length > 0) {
        setSeedList(res.data);
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchSeedList();
  }, []);
  return (
    <div className="h-[600px]">
      <div className="flex justify-between mb-4">
        <div className="text-lg font-semibold">Reports</div>
        <div className="text-right">
          <DownloadFile url="seed/selected/download/report" params={queryParams} />
        </div>
      </div>

      <div className="relative h-[calc(100%-48px)]">
        {isloading && (
          <div className="absolute inset-0 flex items-center justify-center z-10 h-[calc(100%-300px)]">
            <div className="[&>div]:!h-auto [&>div]:!bg-transparent [&>div]:flex [&>div]:items-center [&>div]:justify-center">
              <Loader />
            </div>
          </div>
        )}
        <div className="h-full overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-1">
            {seedList.length > 0 ? (
              seedList.map((report) => (
                <Card
                  onClick={() => {
                    router.push(
                      `/university/report?seed_id=${report.seed_id}&user_id=${userData.id}&student_name=${userData.first_name} ${userData.last_name}`
                    );
                  }}
                  key={report.seed_id}
                  className=" flex justify-between items-center p-5 gap-3 cursor-pointer rounded-sm"
                >
                  <div>
                    <CardTitle className="text-xl font-medium">
                      Seed No: {report.seed_id}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-gray-600 text-sm mt-2">
                      <CalendarDays className="text-primary" size={16} />
                      <span>Last Login:</span>
                      <span className="font-medium">{report.last_login}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm mt-2">
                      <CircleDollarSign className="text-primary" size={16} />
                      <span>Profit Margin:</span>
                      <span className="font-medium">{report.profit_margin}</span>
                    </div>
                  </div>

                  <CircleChevronRight className="text-primary" />
                </Card>
              ))
            ) : (
              !isloading && <div>No record found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSeedList;
