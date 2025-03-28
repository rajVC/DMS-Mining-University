import React, { ReactNode } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/core/sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { BreadcrumbProvider } from "@/context/breadcrumb-context";
import DynamicBreadcumb from "@/components/core/dynamicBreadcumb";
import { Separator } from "@/components/ui/separator"

interface LayoutProps {
  readonly children: ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const session = await auth();

  if (!session || !session.user || !session.user_type) {
    redirect("/auth/login");
  }

  return (
    <main>
      <BreadcrumbProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="mx-auto max-w-screen-2xl">
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-2">
                <SidebarTrigger className="-ml-1" />
              </div>
              <Separator orientation="vertical" className="h-7 bg-gray-500"/>
              <DynamicBreadcumb />
            </header>
            <div className="p-4 pt-0">{children}</div>
          </SidebarInset>
        </SidebarProvider>
      </BreadcrumbProvider>
    </main>
  );
}
