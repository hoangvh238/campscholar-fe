"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Settings,
  HelpCircle,
  UserPlus,
} from "lucide-react";

import { cn } from "@/utils/cn";
import { Button } from "@/components/core/common/button";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/core/common/admin/sidebar";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Users, label: "Users", href: "/users" },
  { icon: UserPlus, label: "Generate Accounts", href: "/admin/gen-accounts" },
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: HelpCircle, label: "Help", href: "/help" },
];
export function Sidebar() {
  const pathname = usePathname();
  return (
    <ShadcnSidebar>
      <SidebarHeader>
        <Button className="w-full justify-start" variant="ghost">
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Admin Dashboard
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href}>
                <Link
                  className={cn(
                    "flex items-center",
                    pathname === item.href && "font-semibold text-primary",
                  )}
                  href={item.href}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </ShadcnSidebar>
  );
}
