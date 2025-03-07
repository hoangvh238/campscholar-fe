import React from "react";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

import { Header } from "./header";
import { Sidebar } from "./sidebar";

import { SidebarProvider } from "@/components/core/common/admin/sidebar";
import { constants } from "@/settings";

function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = JSON.parse(
    getCookie(constants.USER_INFO, { cookies }) ?? `false`,
  );
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto overflow-x-hidden bg-background">
            <div className="container mx-auto px-6 py-8">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default AdminLayout;
