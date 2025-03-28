"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, Download, FileSpreadsheet, HardDriveDownload, HardDriveUpload, LoaderCircle, TriangleAlert, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import Popup from "@/components/core/popup";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { FIELD_PARAMS } from "@/constant/params";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { coreFormData, coreFormSchema } from "@/schema/form-schema";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useUniversityActions } from "@/hooks/use-university-action";

interface Data {
    total_students: number;
    total_assigned_students: number;
    total_unassigned_students: number;
    unassigned_students_link: string
    // Add other properties that you expect to be present in the data object
}
export default function BulkAddStudentForm() {
    const { toast } = useToast()
    const [isOpen, setIsOpen] = useState(false);
    const [isWarningOpen, setIsWarningOpen] = useState(false);
    const { createBulkStudent, downloadSampleFile, downloadUnallocateFile } = useUniversityActions()
    const [data, setData] = useState<Data>({
        total_students: 0,
        total_assigned_students: 0,
        total_unassigned_students: 0,
        unassigned_students_link: ""

    })
    const form = useForm<coreFormData>({
        resolver: zodResolver(coreFormSchema),
        defaultValues: { file: undefined, [FIELD_PARAMS.ASSIGN_LICENSE]: true }
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            form.setValue("file", file);
            form.clearErrors("file");
        }
    };

    const onSubmit = async (data: coreFormData) => {
        const formData = new FormData();
        formData.append("file", data.file);

        try {
            const result = await createBulkStudent(formData, data[FIELD_PARAMS.ASSIGN_LICENSE], setIsWarningOpen)
            if (result) setData(result)
        } catch {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request."
            })
        } finally {
            setIsOpen(false);
        }
    };

    const downloadFile = async (e) => {
        e.stopPropagation();
        try {
            await downloadSampleFile()
        } catch {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request."
            })

        } finally {
            setIsOpen(false);
        }
    }

    return (
        <>
            <Popup
                open={isOpen}
                onOpenChange={setIsOpen}
                trigger={<Button className="p-3" variant="outline" onClick={() => {
                    setIsOpen(true)
                    if (!isOpen) form.reset();
                }}><HardDriveUpload /><span className="text-sm">Bulk Upload</span></Button>}
                title="Add New Students"
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md m-auto space-y-4">
                        <FormField
                            control={form.control}
                            name="file"
                            render={() => (
                                <FormItem>
                                    <Card className="border-dashed border-2 flex flex-col gap-3 border-gray-300 rounded-lg h-40 text-center justify-center">
                                        <Label htmlFor="file-upload" className="cursor-pointer flex flex-col justify-center h-full">
                                            <Upload className="mx-auto text-gray-500" size={40} />
                                            <p className="text-sm mt-2">Drag file here or <span className="text-blue-500">select</span> from device</p>
                                        </Label>
                                        <FormControl>
                                            <Input
                                                id="file-upload"
                                                type="file"
                                                accept=".xls,.xlsx"
                                                className="hidden"
                                                onChange={handleFileChange}
                                            />
                                        </FormControl>
                                    </Card>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <p className="text-xs text-gray-500 mt-2">Supported file format: .xls, .xlsx | Max size: 5MB</p>
                        {form.watch("file") && <p className="text-sm text-center text-green-600">✅ {form.watch("file").name} selected</p>}
                        <Card className="p-4 rounded shadow-sm gap-3 flex bg-zinc-50">
                            <div className="flex flex-col gap-2">
                                <div className="text-sm flex gap-2">
                                    <FileSpreadsheet className="text-green-600" size={24} />
                                    <p className="font-medium">Template File</p>
                                </div>
                                <p className="text-xs text-gray-500">You can download the attached example and use it as a starting point.</p>
                            </div>
                            <Button type="button" onClick={(e) => {
                                downloadFile(e)
                            }} className="p-2 m-auto" variant="outline" ><HardDriveDownload /><span className="text-sm">Download</span></Button>
                        </Card>
                        <div className="md:col-span-2">
                            <FormField
                                control={form.control}
                                name={FIELD_PARAMS.ASSIGN_LICENSE}
                                render={({ field }) => (
                                    <FormItem>
                                        <Alert variant="default" className="flex items-center justify-between p-4 bg-zinc-50">
                                            <div className="flex items-center gap-2">
                                                <TriangleAlert className="text-yellow-500 size-5" />
                                                <AlertDescription>Would you like to Auto assign the license?</AlertDescription>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button
                                                    type="button"
                                                    variant={"outline"}
                                                    className={`${!field.value ? "border-primary" : ""} px-4 py-2`}
                                                    onClick={() => field.onChange(false)}
                                                >
                                                    No
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant={"outline"}
                                                    className={`${field.value ? "border-primary" : ""} px-4 py-2`}
                                                    onClick={() => field.onChange(true)}
                                                >
                                                    Yes
                                                </Button>
                                            </div>
                                        </Alert>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex gap-2 justify-end">
                            <Button onClick={() => setIsOpen(false)} type="button" variant="secondary">Cancel</Button>
                            <Button className="min-w-20" type="submit" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting && <LoaderCircle className="mr-2 size-4 animate-spin" />}
                                Proceed
                            </Button>
                        </div>
                    </form>
                </Form>
            </Popup>
            <Dialog open={isWarningOpen} onOpenChange={setIsWarningOpen}>
                <DialogContent className="max-w-md p-6">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-semibold">Warning</DialogTitle>
                    </DialogHeader>
                    <div className="bg-yellow-100 border-l-4 text-sm border-yellow-500 text-yellow-800 p-4 rounded-md flex items-center gap-3">
                        <AlertTriangle size={45} className=" text-yellow-600" />
                        <div className="text-black">
                            <p>Out of {data.total_students} records, <strong>{data.total_assigned_students} licenses</strong> have been allotted.</p>
                            <p>Download the file for unallocated records.</p>
                        </div>
                        <Button type="button" onClick={() => downloadUnallocateFile(data.unassigned_students_link)} variant="ghost" className="flex w-24 p-2 items-center gap-2 text-white bg-[#FFB60B]">
                            <Download />
                            Download
                        </Button>
                    </div>
                    <DialogFooter className="mt-4 flex justify-end gap-2">
                        <Button onClick={() => setIsWarningOpen(false)}>Ok</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
