import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Containers, TaskStatus } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPathArray(path: string) {
  return path.split("/").filter((p) => p).map((p) => p.charAt(0).toUpperCase() + p.slice(1));
}

export function getContainers(){
  const taskList: Containers[] = [
    {
      id: "INV001",
      name: "VCT Updates",
      status: TaskStatus.Active,
      tag: "VCT",
      startedAt: new Date("2025-01-29T03:24:00"),
    },
    {
      id: "INV002",
      name: "VCT Updates Mobile Notifications",
      status: TaskStatus.Inactive,
      tag: "VCTM",
      startedAt: new Date("2025-01-29T03:24:00"),
    },
    {
      id: "INV003",
      name: "Friday Bot",
      status: TaskStatus.Stopped,
      tag: "Discord Bot",
      startedAt: new Date("2025-01-29T03:24:00"),
    },
  ];

  return taskList;
}