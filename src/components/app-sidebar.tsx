"use client";

import { Home, Inbox, Church } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

const items = [
  {
    title: "Home",
    url: "/Dashboard",
    icon: Home,
  },
  {
    title: "Richieste",
    url: "/Dashboard/Richieste",
    icon: Inbox,
  },
  {
    title: "Gestione Cimiteriale",
    url: "/Dashboard/GestioneCimiteriale",
    icon: Church,
  },
];

export function AppSidebar() {
  const pathname = usePathname() ?? "/";

  const normalize = (p: string) => p.replace(/\/+$/, "") || "/";
  const isActive = (url: string) => normalize(pathname) === normalize(url);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Zerachiel</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
                          active
                            ? "bg-sky-100 text-sky-700 font-semibold"
                            : "text-muted-foreground hover:bg-slate-50"
                        )}
                      >
                        <item.icon
                          className={cn(active ? "text-sky-600" : "")}
                        />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
