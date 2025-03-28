import * as React from "react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarRail } from "@/components/ui/sidebar";
import SidebarFooterMenu from "./sidebar-footer-menu";
import SidebarNavigation from "./sidebar-navigation";
import SidebarHeaderMenu from "./sidebar-header-menu";
import { auth } from "@/auth";



export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const session = await auth();
  const roleType = session?.user_type ;
  const user = {
    name: `${session.first_name} ${session.last_name ? session.last_name : ""}`,
    email: session?.user?.email,
    avatar: "",
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeaderMenu />
      <SidebarContent>
        <SidebarNavigation roleType={roleType} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarFooterMenu user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
