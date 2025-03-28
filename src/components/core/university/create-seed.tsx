"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { SeedData, seedSchema } from "@/schema/seed-create";
import { reqeustServer } from "@/actions/reqeust-server-api";
import { FIELD_PARAMS } from "@/constant/params";
import { useBreadcrumb } from "@/context/breadcrumb-context";

export default function CreateSeed() {
  const { setBreadcrumbs } = useBreadcrumb();

  useEffect(() => {
    setBreadcrumbs([{ label: "Seeds Generation", href: "#" }]);
  }, [setBreadcrumbs]);
  
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<SeedData>({
    resolver: zodResolver(seedSchema),
    defaultValues: {
      [FIELD_PARAMS.NUM_OF_SEEDS]: "",
    },
  });

  const handleSubmitForm = async (data: SeedData) => {
    try {
      const res = await reqeustServer({
        body: {
          ...data,
          [FIELD_PARAMS.NUM_OF_SEEDS]: Number(data[FIELD_PARAMS.NUM_OF_SEEDS]),
        },
        url: "seed/create",
        method: "POST",
        token: true,
      });
      if (res.status === "success") {
        toast({
          title: "Create seed successful",
          description: res.message,
        });
        form.reset();
        router.refresh();
        return;
      } else {
        toast({
          variant: "destructive",
          title: "Seed Not Created",
          description: res.message,
        });
        form.reset();
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitForm)}
        className="flex flex-col gap-2"
      >
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name={FIELD_PARAMS.NUM_OF_SEEDS}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )}
          />
          <Button
            className="p-1 items-center"
            type="submit"
            disabled={form.formState.isSubmitting}
            variant={"outline"}
          >
            {form.formState.isSubmitting ? (
              <LoaderCircle className="mr-2 size-4 animate-spin" />
            ) : (
              <PlusCircle />
            )}
            <span className="text-sm">Add New</span>
          </Button>
        </div>
      </form>
    </Form>
  );
}
