"use client";

import React, { createContext, useContext, useState } from "react";

import { cn } from "@/utils/cn";
// Sidebar Wrapper
export function Sidebar({ children }: React.PropsWithChildren) {
  return (
    <div className="flex h-full w-64 flex-col bg-gray-100 shadow-lg dark:bg-shadblack">
      {children}
    </div>
  );
}

// Sidebar Header
export function SidebarHeader({ children }: React.PropsWithChildren) {
  return (
    <div className="border-b border-gray-200 p-4 dark:border-gray-800">
      {children}
    </div>
  );
}

// Sidebar Content
export function SidebarContent({ children }: React.PropsWithChildren) {
  return <div className="flex-1 p-4">{children}</div>;
}

// Sidebar Menu
export function SidebarMenu({ children }: React.PropsWithChildren) {
  return <ul className="space-y-2">{children}</ul>;
}

// Sidebar Menu Item
export function SidebarMenuItem({ children }: React.PropsWithChildren) {
  return <li className="flex items-center space-x-2"> {children}</li>;
}

// Sidebar Menu Button
export function SidebarMenuButton({
  children,
  isActive,
  asChild,
  className,
  ...props
}: React.PropsWithChildren<{
  isActive?: boolean;
  asChild?: boolean;
  className?: string;
}>) {
  return asChild ? (
    React.cloneElement(children as React.ReactElement, {
      className: cn(
        "inline-flex items-center px-4 py-2 rounded-md transition-colors",
        isActive
          ? "bg-osu text-white"
          : "hover:bg-gray-200 dark:hover:bg-gray-700",
        className,
      ),
      ...props,
    })
  ) : (
    <button
      className={cn(
        "inline-flex w-full items-center rounded-md px-4 py-2 text-left transition-colors",
        isActive
          ? "bg-osu text-white"
          : "hover:bg-gray-200 dark:hover:bg-gray-700",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

const SidebarContext = createContext<{
  isOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}>({
  isOpen: false,
  toggleSidebar: () => {},
  closeSidebar: () => {},
});
export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const closeSidebar = () => setIsOpen(false);
  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar, closeSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
