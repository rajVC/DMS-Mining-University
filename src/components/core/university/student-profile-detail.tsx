"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React, { useEffect } from "react";
import EditStudentForm from "./edit-student";
import { Crown, HomeIcon, IdCard, LucidePhone, MailOpen, OctagonMinus } from 'lucide-react'
import { FIELD_PARAMS } from "@/constant/params";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { Badge } from "@/components/ui/badge";
import { UserFieldProps } from "@/types/user-field";
import { useBreadcrumb } from "@/context/breadcrumb-context";
import { DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import Popup from '@/components/core/popup'
import { useUniversityActions } from '@/hooks/use-university-action'

interface ErrorFieldProps {
    isError: boolean;
    msg: string
  }
  
  type StudentProfileProps = UserFieldProps & ErrorFieldProps;
const StudentProfileDetail = ({ userData,isError, msg }: StudentProfileProps) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const { assignLicense, removeLicense } = useUniversityActions()
    const capitalize = (name) => name.charAt(0).toUpperCase() + name.slice(1);

    const studentName = `${capitalize(userData.first_name)} ${capitalize(
        userData.last_name
    )}`;

    const { setBreadcrumbs } = useBreadcrumb();

    useEffect(() => {
        if(isError) throw new Error(msg || "Something went wrong");
        setBreadcrumbs([
            { label: "Students", href: "/university/students" },
            { label: `${studentName}`, href: "#" },
        ]);
    }, [setBreadcrumbs]);

    return (
        <>
            <Card className="px-7 py-9 bg-gray-50 rounded-sm shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar className="w-16 h-16">
                            <AvatarFallback className="text-white text-lg font-medium" style={{ background: "linear-gradient(221.32deg, #73A9EB 0%, #1B74E1 107.32%)" }}>{userData[FIELD_PARAMS.FIRST_NAME].charAt(0).toUpperCase()}{userData[FIELD_PARAMS.LAST_NAME].charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex gap-3">
                            <h2 className="text-2xl font-semibold">{userData[FIELD_PARAMS.FIRST_NAME]} {userData[FIELD_PARAMS.LAST_NAME]}</h2>
                            <EditStudentForm userData={userData} />
                        </div>
                    </div>
                    <Badge className={userData.status ? "bg-[#84CC16] text-white px-4" : "bg-red-500 text-white px-4"}>
                        {userData.status ? "Active" : "Not Active"}
                    </Badge>
                </CardHeader>

                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { label: "Student ID", value: userData[FIELD_PARAMS.ROLE_ID], icon: <IdCard size={22} className="text-blue-500" /> },
                            { label: "Licence", value: userData[FIELD_PARAMS.LICENSE_NUMBER], icon: <Crown size={22} className="text-blue-500" />, action: "Remove Licence" },
                            { label: "Email", value: userData.email, icon: <MailOpen size={22} className="text-blue-500" /> },
                            { label: "Contact", value: userData.contact, icon: <LucidePhone size={22} className="text-blue-500" /> },
                            { label: "Address", value: userData.address, icon: <HomeIcon size={22} className="text-blue-500" /> },
                        ].map((item, index) => (
                            <Card key={index} className="h-24 flex items-center rounded-md justify-between px-5 py-6 relative">
                                <div className="flex items-center gap-3">
                                    {item.icon}
                                    <div>
                                        <p className="text-xs text-gray-500">{item.label}</p>
                                        <p className="text-sm font-medium break-all">{item.value}</p>
                                    </div>
                                </div>
                                {item.action && <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            {userData[FIELD_PARAMS.ASSIGN_LICENSE] ? <OctagonMinus size={20} className="text-blue-500 cursor-pointer absolute top-3 right-3" onClick={() => setIsOpen(true)} /> : <Crown size={20} className="text-blue-500 cursor-pointer absolute top-3 right-3" onClick={() => setIsOpen(true)} />}
                                        </TooltipTrigger>
                                        <TooltipContent
                                            side="bottom"
                                            align="center"
                                            className="bg-white text-black-700 text-s shadow-lg p-1 rounded-md border border-white"
                                        >
                                            {userData[FIELD_PARAMS.ASSIGN_LICENSE] ? "Remove Licence" : "Assign Licence"}
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>}
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Popup
                open={isOpen}
                onOpenChange={setIsOpen}
                trigger={""}
                title="Confirmation"
                footer={
                    <>
                        <Button onClick={() => setIsOpen(false)} variant={"secondary"}>
                            No
                        </Button>
                        <DialogClose asChild>
                            <Button
                                onClick={() => userData[FIELD_PARAMS.ASSIGN_LICENSE]
                                    ? removeLicense(userData[FIELD_PARAMS.LICENSE_NUMBER])
                                    : assignLicense(userData.id)}
                            >
                                Yes
                            </Button>
                        </DialogClose>
                    </>
                }
            >
                {userData[FIELD_PARAMS.ASSIGN_LICENSE]
                    ? `Are you sure want to de-assign the licence “${userData[FIELD_PARAMS.LICENSE_NUMBER]}”`
                    : `Are you sure want to assign the licence?`}
            </Popup>
        </>
    )
}

export default StudentProfileDetail
