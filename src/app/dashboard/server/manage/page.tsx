"use client";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";
import {
  Activity,
  Computer,
  Container,
  Cpu,
  HardDrive,
  MemoryStick,
  Network,
  Play,
  Power,
  RotateCcw,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ContainerTable from "@/components/dashboard/server/manage/ContainerTable";
import { Separator } from "@/components/ui/separator";

dayjs.extend(relativeTime);
dayjs.extend(duration);

export default function ServerManage() {
  const date = new Date("2025-01-29T03:24:00");

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      {/* Grid container with responsive columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Server Information Card */}
        <div className="rounded-xl bg-muted/50 flex flex-col gap-4 p-4">
          <h1 className="text-xl font-bold font-[family-name:var(--font-geist-sans)]">
            Server Information
          </h1>
          <div className="flex flex-col items-center justify-between gap-2 h-full">
            <ServerProps icon={Cpu} title="CPU" value="Intel Xeon E5 2699 v4" />
            <Separator />
            <ServerProps
              icon={Network}
              title="IP Address"
              value="192.168.1.1"
            />
            <Separator />

            <ServerProps
              icon={Computer}
              title="OS"
              value="Windows Server 2019 - COMNET"
            />
            <Separator />
            <ServerProps
              icon={Activity}
              title="Uptime"
              value={dayjs
                .duration(dayjs().diff(date))
                .format("D [gün], H [saat]")}
            />
          </div>
        </div>

        {/* CPU Usage Card */}
        <div className="rounded-xl bg-muted/50 p-4 gap-4 flex flex-col">
          <h1 className="text-xl font-bold font-[family-name:var(--font-geist-sans)]">
            Server Usage
          </h1>

          <div className="w-full md:w-auto flex flex-col gap-4">
            <ServerProps icon={Cpu} title="CPU" value="2 Core" />
            <Separator />
            <ServerProps icon={Network} title="Network" value="16 kb/s" />
            <Separator />
            <ServerProps
              icon={MemoryStick}
              title="Memory"
              value="75% - 369/2048 MB"
            />
            <Separator />
            <ServerProps
              icon={HardDrive}
              title="Disk"
              value="46% - 14.19/31 GB"
            />
          </div>
        </div>

        {/* Manage Server Card */}
        <div className="rounded-xl bg-muted/50 p-4 gap-4 flex flex-col md:col-span-1 ">
          <h1 className="text-xl font-bold font-[family-name:var(--font-geist-sans)]">
            Manage Server
          </h1>
          <div className="flex flex-row items-center justify-between sm:justify-center gap-4 h-full">
            <Button className="w-full  flex flex-col h-full sm:size-24 rounded-2xl items-center justify-center">
              <Play className="size-12 mb-2" />
              <span className="font-[family-name:var(--font-geist-sans)]">
                Start
              </span>
            </Button>
            <Button
              variant={"destructive"}
              className="w-full  flex flex-col h-full sm:size-24 rounded-2xl items-center justify-center"
            >
              <Power className="size-12 mb-2" />
              <span className="font-normal">Stop</span>
            </Button>
            <Button
              variant={"outline"}
              className="w-full  flex flex-col h-full sm:size-24 rounded-2xl items-center justify-center"
            >
              <RotateCcw className="size-12 mb-2" />
              <span className="font-normal">Restart</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Containers Section */}
      <div className="flex-1 rounded-xl bg-muted/50 md:min-h-min p-4 gap-4 flex flex-col w-full">
        <div className="flex flex-row items-center gap-2 mb-2">
          <Container className="size-6" />
          <h1 className="text-xl font-bold font-[family-name:var(--font-geist-sans)]">
            Containers
          </h1>
        </div>
        <div className="w-full">
          <ContainerTable />
        </div>
      </div>
    </div>
  );
}

function ServerProps({
  icon: Icon,
  title,
  value,
  className,
}: {
  title: string;
  value: string;
  icon: LucideIcon;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-row items-center justify-between w-full ${className}`}
    >
      <h1 className="font-bold font-[family-name:var(--font-geist-mono)]">
        {Icon && <Icon className="inline-block mr-1 size-5" />} {title}
      </h1>
      <h3 className=" font-[family-name:var(--font-geist-mono)]">{value}</h3>
    </div>
  );
}
