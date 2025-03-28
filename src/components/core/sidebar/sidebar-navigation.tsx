"use client";

import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { sidebarItems } from "@/data/sidebar-items";
import { NavGroup } from "@/data/sidebar-items";

export default function SidebarNavigation({ roleType }: { roleType: string }) {
  const pathname = usePathname(); // Get current path
  const sidebarItemsList: NavGroup[] = sidebarItems[roleType];

  return (
    <>
      {sidebarItemsList.map((navGroup) => (
        <SidebarGroup key={navGroup.id}>
          {navGroup.label && <SidebarGroupLabel>{navGroup.label}</SidebarGroupLabel>}
          <SidebarMenu className="gap-2">
            {navGroup.items.map((item) => {
              const isActive = pathname === item.path || item.subItems?.some(sub => pathname === sub.path);

              return (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem className={isActive ? "bg-[#EFEFEF]" : ""}>
                    <CollapsibleTrigger asChild>
                      <Link
                        href={item.path}
                        className="flex w-full items-center gap-2"
                      >
                        <SidebarMenuButton tooltip={item.title}>
                          {item.icon && <item.icon size={20} />}
                          <span>{item.title}</span>
                          {item.subItems && (
                            <ChevronRight className={`ml-auto transition-transform duration-200 ${isActive ? "rotate-90" : ""}`} />
                          )}
                        </SidebarMenuButton>
                      </Link>
                    </CollapsibleTrigger>
                    {item.subItems && (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.subItems.map((subItem) => {
                            const isSubActive = pathname === subItem.path;
                            return (
                              <SidebarMenuSubItem
                                key={subItem.title}
                                className={isSubActive ? "bg-[#EFEFEF]" : ""}
                              >
                                <SidebarMenuSubButton asChild>
                                  <Link
                                    className="flex items-center gap-2"
                                    href={subItem.path}
                                  >
                                    {subItem.icon && <subItem.icon size={20} />}
                                    <span>{subItem.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            );
                          })}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    )}
                  </SidebarMenuItem>
                </Collapsible>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}
