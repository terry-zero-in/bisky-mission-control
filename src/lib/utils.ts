import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function daysUntilLaunch(): number {
  const launch = new Date("2026-05-22");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  launch.setHours(0, 0, 0, 0);
  return Math.max(0, Math.ceil((launch.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
}
