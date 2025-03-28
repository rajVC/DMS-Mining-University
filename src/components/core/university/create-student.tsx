"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LoaderCircle,
  PlusCircle,
  TriangleAlert,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { coreFormData, coreFormSchema } from "@/schema/form-schema";
import Popup from "@/components/core/popup";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FIELD_PARAMS } from "@/constant/params";
import { useUniversityActions } from "@/hooks/use-university-action";
export default function AddSingleUserForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isOpen, setIsOpen] = useState(false);
  const { createStudent } = useUniversityActions();
  const { toast } = useToast();
  const form = useForm<coreFormData>({
    resolver: zodResolver(coreFormSchema),
    defaultValues: {
      email: "",
      contact: "",
      address: "",
      [FIELD_PARAMS.FIRST_NAME]: "",
      [FIELD_PARAMS.LAST_NAME]: "",
      [FIELD_PARAMS.ROLE_ID]: "",
      [FIELD_PARAMS.ASSIGN_LICENSE]: true,
      [FIELD_PARAMS.EMAIL_SENT]: true,
    },
  });

  const handleSubmitForm = async (data: coreFormData) => {
    try {
      await createStudent(data);
    } catch {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <>
      <Popup
        open={isOpen}
        onOpenChange={setIsOpen}
        trigger={
          <Button
            className="p-3"
            variant={"outline"}
            onClick={() => {
              setIsOpen(true);
              if (!isOpen) form.reset();
            }}
          >
            <PlusCircle />
            <span className="text-sm">Add New Student</span>
          </Button>
        }
        title="Add New Student"
      >
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmitForm)}
              className="space-y-4"
            >
              {/* Use grid for two-column layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={FIELD_PARAMS.FIRST_NAME}
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={FIELD_PARAMS.LAST_NAME}
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={FIELD_PARAMS.ROLE_ID}
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Student ID</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Email ID</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contact"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Contact No</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name={FIELD_PARAMS.ASSIGN_LICENSE}
                    render={({ field }) => (
                      <FormItem>
                        <Alert
                          variant="default"
                          className="flex items-center justify-between p-4 bg-zinc-50"
                        >
                          <div className="flex items-center gap-2">
                            <TriangleAlert className="text-yellow-500 size-5" />
                            <AlertDescription>
                              Would you like to Auto assign the license?
                            </AlertDescription>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              type="button"
                              variant={"outline"}
                              className={`${!field.value ? "border-primary" : ""
                                } px-4 py-2`}
                              onClick={() => field.onChange(false)}
                            >
                              No
                            </Button>
                            <Button
                              type="button"
                              variant={"outline"}
                              className={`${field.value ? "border-primary" : ""
                                } px-4 py-2`}
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
              </div>

              {/* Buttons */}
              <div className="flex gap-2 justify-end">
                <Button
                  onClick={() => setIsOpen(false)}
                  type="button"
                  variant="secondary"
                >
                  Cancel
                </Button>
                <Button
                  className="min-w-20"
                  type="submit"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting && (
                    <LoaderCircle className="mr-2 size-4 animate-spin" />
                  )}
                  Add
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </Popup>
    </>
  );
}
