import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPathArray(path: string) {
  return path.split("/").filter((p) => p).map((p) => p.charAt(0).toUpperCase() + p.slice(1));
}
