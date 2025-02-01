"use client";
import React, { useMemo } from "react";
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
  Microchip,
  Monitor,
  Network,
  Play,
  Power,
  RotateCcw,
  type LucideIcon,
} from "lucide-react";
import { Gauge } from "@suyalcinkaya/gauge";
import { Button } from "@/components/ui/button";
import ContainerTable from "@/components/dashboard/server/manage/ContainerTable";
import { Separator } from "@/components/ui/separator";

dayjs.extend(relativeTime);
dayjs.extend(duration);

export default function ServerManage() {
  const date = new Date("2025-01-29T03:24:00");

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50 flex flex-col gap-4 p-4">
          <h1 className="text-xl font-bold font-[family-name:var(--font-geist-sans)] absolute">
            Server Information
          </h1>
          <div className="flex flex-col items-center justify-center gap-2  h-full relative">
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
                .format("D [gün], H [saat], m [dakika], s [saniye]")}
            />
          </div>
        </div>
        <div className="aspect-video rounded-xl bg-muted/50 p-4 gap-4  flex flex-col ">
          <h1 className="text-xl font-bold font-[family-name:var(--font-geist-sans)] absolute">
            CPU Usage
          </h1>
          <div className="flex flex-row items-center justify-between gap-4 w-full  h-full relative">
            <div className="w-auto flex flex-col gap-4">
              <ServerProps
                icon={Cpu}
                title="CPU"
                className="gap-4"
                value="Intel Xeon E5 2699 v4"
              />
              <ServerProps icon={Microchip} title="CPU Core" value="2" />
              <ServerProps icon={Monitor} title="CPU Usage" value="%14" />
            </div>

            <Gauge
              value={14}
              size={"xl"}
              primary={primaryColorList}
              secondary={secondaryColorList}
              showValue
              showAnimation
            />
          </div>
        </div>
        <div className="aspect-video rounded-xl bg-muted/50 p-4  flex flex-col">
          <h1 className="text-xl font-bold font-[family-name:var(--font-geist-sans)] absolute">
            Manage Server
          </h1>
          <div className="flex flex-row items-center justify-center gap-4  h-full relative">
            <Button className="flex flex-col size-24 rounded-2xl items-center justify-center">
              <Play size={48} />
              <span className="font-[family-name:var(--font-geist-sans)] ">
                Start
              </span>
            </Button>
            <Button
              variant={"destructive"}
              className="flex flex-col size-24 rounded-2xl items-center justify-center"
            >
              <Power className=" size-4" />
              <span className="font-normal">Stop</span>
            </Button>
            <Button
              variant={"outline"}
              className="flex flex-col size-24  rounded-2xl items-center justify-center"
            >
              <RotateCcw className=" size-4" />
              <span className="font-normal">Restart</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4 gap-4 flex flex-col">
        <div className="item-center flex flex-row gap-4">
          <Container />
          <h1 className="text-xl font-bold font-[family-name:var(--font-geist-sans)] ">
            Containers
          </h1>
        </div>
        <div>
          <ContainerTable />
        </div>
      </div>
    </div>
  );
}
const primaryColorList = {
  "0": "#4CAF50",
  "10": "#4CAF50",
  "20": "#4CAF50",
  "30": "#4CAF50",
  "40": "#FFEB3B",
  "50": "#FFEB3B",
  "60": "#FF9800",
  "70": "#FF9800",
  "80": "#F44336",
  "90": "#F44336",
  "100": "#F44336",
};

const secondaryColorList = {
  "0": "rgba(76, 175, 80, 0.25)",
  "10": "rgba(76, 175, 80, 0.25)",
  "20": "rgba(76, 175, 80, 0.25)",
  "30": "rgba(76, 175, 80, 0.25)",
  "40": "rgba(255, 235, 59, 0.25)",
  "50": "rgba(255, 235, 59, 0.25)",
  "60": "rgba(255, 152, 0, 0.25)",
  "70": "rgba(255, 152, 0, 0.25)",
  "80": "rgba(244, 67, 54, 0.25)",
  "90": "rgba(244, 67, 54, 0.25)",
  "100": "rgba(244, 67, 54, 0.25)",
};

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
