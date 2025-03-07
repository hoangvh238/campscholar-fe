"use client";

import type React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  LayoutDashboard,
  Trophy,
  FileText,
  GraduationCap,
  ChevronLeft,
  Menu,
  User,
  ChevronRight,
} from "lucide-react";

import PlatformNavbar from "../../common/nav-bar/platform-nav";
import UserAvatar from "../../common/nav-bar/user-avatar";
import { initializeUser } from "@/store/slices/auth/userSlice/userSlice";
import { cn } from "@/utils/cn";

export default function AdministrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const isManagePage =
    pathname.endsWith("/problems") ||
    pathname.endsWith("/contests") ||
    pathname.endsWith("/classrooms");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <div className="z-10 w-full border-b border-gray-200 dark:border-gray-800">
        <PlatformNavbar>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleSidebar}
              className="rounded-md p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              <Menu size={20} />
            </button>
            <UserAvatar />
          </div>
        </PlatformNavbar>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {isManagePage && (
          <aside
            className={cn(
              "flex h-full flex-col border-r border-gray-200 shadow-sm transition-all duration-300 ease-in-out dark:border-gray-800",
              sidebarOpen ? "w-64" : "w-0 md:w-16",
            )}
          >
            <div className="flex h-16 items-center justify-between px-4">
              {sidebarOpen && (
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Administration
                </h2>
              )}
              <button
                onClick={toggleSidebar}
                className={cn(
                  "rounded-md p-1.5 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800",
                  !sidebarOpen && "mx-auto",
                )}
                aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
              >
                <ChevronLeft
                  size={18}
                  className={cn(
                    "transition-transform duration-200",
                    !sidebarOpen && "rotate-180",
                  )}
                />
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-1 p-3">
              <SidebarLink
                href="/administration/dashboard"
                icon={<LayoutDashboard size={20} />}
                active={pathname === "/administration/dashboard"}
                collapsed={!sidebarOpen}
              >
                Dashboard
              </SidebarLink>
              <SidebarLink
                href="/administration/contests"
                icon={<Trophy size={20} />}
                active={pathname === "/administration/contests"}
                collapsed={!sidebarOpen}
              >
                Manage Contests
              </SidebarLink>
              <CollapsibleGroup
                title="Manage Problems"
                icon={<FileText size={20} />}
                active={pathname.startsWith("/administration/problems")}
                collapsed={!sidebarOpen}
                defaultExpanded={pathname.startsWith(
                  "/administration/problems",
                )}
              >
                <SidebarSubLink
                  href="/administration/problems"
                  active={pathname === "/administration/problems"}
                  collapsed={!sidebarOpen}
                >
                  All Problems
                </SidebarSubLink>
                <SidebarSubLink
                  href="/administration/problems/create"
                  active={pathname === "/administration/problems/create"}
                  collapsed={!sidebarOpen}
                >
                  Create Problem
                </SidebarSubLink>
                <SidebarSubLink
                  href="#"
                  active={pathname.startsWith("/administration/problems/edit/")}
                  collapsed={!sidebarOpen}
                  disabled
                >
                  Edit Problem
                </SidebarSubLink>
              </CollapsibleGroup>
              <SidebarLink
                href="/administration/classrooms/"
                icon={<GraduationCap size={20} />}
                active={pathname === "/administration/classrooms/"}
                collapsed={!sidebarOpen}
              >
                Manage Classrooms
              </SidebarLink>
            </nav>

            <div className="border-t border-gray-200 p-3 dark:border-gray-800">
              <SidebarLink
                href="/profile"
                icon={<User size={20} />}
                active={pathname === "/profile"}
                collapsed={!sidebarOpen}
              >
                Profile
              </SidebarLink>
            </div>
          </aside>
        )}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-4 md:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}

function SidebarLink({
  href,
  icon,
  active,
  collapsed,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  active: boolean;
  collapsed: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
        active
          ? "bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400"
          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
        collapsed && "justify-center px-2",
      )}
    >
      <span
        className={cn(
          "transition-colors duration-200",
          active
            ? "text-orange-600 dark:text-orange-400"
            : "text-gray-500 dark:text-gray-400",
          "group-hover:text-orange-600 dark:group-hover:text-orange-400",
        )}
      >
        {icon}
      </span>
      {!collapsed && <span>{children}</span>}
      {collapsed && <span className="sr-only">{children}</span>}
    </Link>
  );
}

function CollapsibleGroup({
  title,
  icon,
  active,
  collapsed,
  defaultExpanded = false,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  active: boolean;
  collapsed: boolean;
  defaultExpanded?: boolean;
  children: React.ReactNode;
}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  // Reset expanded state when sidebar collapses
  useEffect(() => {
    if (collapsed) {
      setIsExpanded(false);
    } else {
      setIsExpanded(defaultExpanded);
    }
  }, [collapsed, defaultExpanded]);

  return (
    <div>
      <button
        onClick={() => !collapsed && setIsExpanded(!isExpanded)}
        className={cn(
          "group flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
          active
            ? "bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400"
            : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
          collapsed && "justify-center px-2",
        )}
      >
        <span
          className={cn(
            "transition-colors duration-200",
            active
              ? "text-orange-600 dark:text-orange-400"
              : "text-gray-500 dark:text-gray-400",
            "group-hover:text-orange-600 dark:group-hover:text-orange-400",
          )}
        >
          {icon}
        </span>
        {!collapsed && (
          <>
            <span className="flex-1 text-left">{title}</span>
            <ChevronRight
              size={16}
              className={cn(
                "text-gray-400 transition-transform duration-200",
                isExpanded && "rotate-90",
              )}
            />
          </>
        )}
        {collapsed && <span className="sr-only">{title}</span>}
      </button>
      {!collapsed && (
        <div
          className={cn(
            "overflow-hidden transition-all duration-200 ease-in-out",
            isExpanded ? "mt-1 max-h-48" : "max-h-0",
          )}
        >
          <div className="ml-6 space-y-1 border-l border-gray-200 pl-2 dark:border-gray-700">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

function SidebarSubLink({
  href,
  active,
  collapsed,
  disabled = false,
  children,
}: {
  href: string;
  active: boolean;
  collapsed: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  const linkContent = (
    <>
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full transition-colors duration-200",
          active
            ? "bg-orange-600 dark:bg-orange-400"
            : "bg-gray-300 dark:bg-gray-600",
        )}
      />
      <span
        className={cn(
          "text-sm transition-colors duration-200",
          active
            ? "font-medium text-orange-600 dark:text-orange-400"
            : "text-gray-600 dark:text-gray-400",
          disabled && "opacity-50",
        )}
      >
        {children}
      </span>
    </>
  );

  if (collapsed) return null;

  if (disabled) {
    return (
      <div
        className={cn(
          "flex cursor-not-allowed items-center gap-3 rounded-md px-3 py-2 opacity-50",
          active && "bg-orange-50 dark:bg-orange-900/20",
        )}
      >
        {linkContent}
      </div>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 transition-all duration-200",
        active
          ? "bg-orange-50 dark:bg-orange-900/20"
          : "hover:bg-gray-100 dark:hover:bg-gray-800",
      )}
    >
      {linkContent}
    </Link>
  );
}
