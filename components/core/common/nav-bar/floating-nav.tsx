"use client";
import { useState } from "react";

import { HoveredLink, Menu, MenuItem } from "@/components/core/common/menu";
import { Separator } from "@/components/core/common/separator";
import { cn } from "@/utils/cn";

export default function CompactNavbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed inset-x-0 top-20 z-50 mx-auto max-w-md", className)}
    >
      <Menu setActive={setActive}>
        <MenuItem active={active} item="Account" setActive={setActive}>
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/platform">Platform Home</HoveredLink>
            <HoveredLink href="/user">Profile</HoveredLink>
            <HoveredLink href="/user/settings">Settings</HoveredLink>
            <Separator />
            <HoveredLink href="/logout">Logout</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem active={active} item="Contests" setActive={setActive}>
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/platform/contests">
              Upcoming Contests
            </HoveredLink>
            <HoveredLink href="/platform/contests">Past Contests</HoveredLink>
            <HoveredLink href="/user/contests">My Contests</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem active={active} item="Practice" setActive={setActive}>
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/platform/problems">All Problems</HoveredLink>
            <HoveredLink href="/platform/editorials">Editorials</HoveredLink>
            <HoveredLink href="/platform/problems#submissions">
              My Submissions
            </HoveredLink>
          </div>
        </MenuItem>
        <MenuItem active={active} item="Admin" setActive={setActive}>
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/platform/admin">Profile</HoveredLink>
            <HoveredLink href="/platform/admin/problems">
              Add New Problem
            </HoveredLink>
            <HoveredLink href="/platform/admin/contests">
              Add New Contest
            </HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
