"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { changePasswordData, changePassowrdSchema } from "@/schema/change-passoword";
import { reqeustServer } from "@/actions/reqeust-server-api";

export default function ChangePassword({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<changePasswordData>({
        resolver: zodResolver(changePassowrdSchema),
        defaultValues: {
            email: "",
            new_password: "",
            old_password: "",
        },
    });

    const onSubmit = async (data: changePasswordData) => {
        
        try {
            setIsLoading(true);
            const res = await reqeustServer({
                body: data,
                url: "auth/reset/password",
                method: "POST",
                token: true
            })

            if (res.status === "success") {
                toast({
                    title: "Password change successful",
                    description: res.message,
                });
                form.reset();
                return;
            } else {
                toast({
                    variant: "destructive",
                    title: "Cannot change password",
                    description: res.message,
                });
                form.reset();
            }

        } catch  {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request."
            })
        } finally{
            setIsLoading(false)
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Change your password</CardTitle>
                </CardHeader>
                <CardContent>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage>{fieldState.error?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="new_password"
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage>{fieldState.error?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="old_password"
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <FormLabel>Old Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage>{fieldState.error?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />
                            <Button disabled={isLoading} className="w-full">
                                {isLoading && <LoaderCircle className="mr-2 size-4 animate-spin" />}
                                Update Password
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
