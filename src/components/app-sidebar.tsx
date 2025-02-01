"use client";

import * as React from "react";
import {
  AudioWaveform,
  Bot,
  Command,
  Container,
  Cpu,
  FolderTree,
  GalleryVerticalEnd,
  House,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "BBLGPT",
    email: "bblgpt@grkn.dev",
    avatar: "/avatars/bblgpt.jpg",
  },
  teams: [
    {
      name: "BBLGPT",
      logo: GalleryVerticalEnd,
      plan: "Production",
    },
    {
      name: "BBLGPT-DEV",
      logo: AudioWaveform,
      plan: "Development",
    },
    {
      name: "BBLGPT-TEST",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Home",
      url: "/dashboard",
      icon: House,
    },
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: false,
      items: [
        {
          title: "History",
          url: "/dashboard/playground/history",
        },
        {
          title: "Starred",
          url: "/dashboard/playground/starred",
        },
        {
          title: "Settings",
          url: "/dashboard/playground/settings",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Chat Bot",
          url: "/dashboard/models/chat-bot",
        },
        {
          title: "Image",
          url: "/dashboard/models/image",
        },
        {
          title: "VCT",
          url: "/dashboard/models/vct",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/dashboard/settings/general",
        },
        {
          title: "Twitter API",
          url: "/dashboard/settings/twitter",
        },
        {
          title: "LLM",
          url: "/dashboard/settings/llm",
        },
        {
          title: "Limits",
          url: "/dashboard/settings/limits",
        },
      ],
    },
  ],
  server: [
    {
      name: "Manage",
      url: "/dashboard/server/manage",
      icon: Cpu,
    },
    {
      name: "FTP",
      url: "/dashboard/server/ftp",
      icon: FolderTree,
    },
    {
      name: "Containers",
      url: "/dashboard/server/containers",
      icon: Container,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.server} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
