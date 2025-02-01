"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import dayjs from "dayjs";
import { CircleCheck, Play, Power, RotateCcw } from "lucide-react";

export default function ContainerTable() {
  const taskList = [
    {
      id: "INV001",
      name: "VCT Updates",
      status: "Active",
      tag: "VCT",
      startedAt: new Date("2025-01-29T03:24:00"),
    },
    {
      id: "INV002",
      name: "VCT Updates Mobile Notifications",
      status: "Active",
      tag: "VCTM",
      startedAt: new Date("2025-01-29T03:24:00"),
    },
    {
      id: "INV003",
      name: "Friday Bot",
      status: "Active",
      tag: "Discord Bot",
      startedAt: new Date("2025-01-29T03:24:00"),
    },
  ];

  // Mobile card view component
  const MobileCardView = () => (
    <div className="flex flex-col gap-4 md:hidden">
      {taskList.map((task) => (
        <Card key={task.id}>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="font-bold">{task.id}</span>
                <span className="flex items-center gap-2">
                  <CircleCheck className="h-4 w-4 text-green-500" />
                  {task.status}
                </span>
              </div>
              <div className="font-medium">{task.name}</div>
              <div className="text-sm text-muted-foreground">{task.tag}</div>
              <div className="text-sm text-muted-foreground">
                Started: {dayjs(task.startedAt).format("DD/MM/YYYY HH:mm")}
              </div>
              <div className="text-sm text-muted-foreground">
                Uptime: {dayjs().from(task.startedAt, true)}
              </div>
              <div className="flex gap-2 mt-2">
                <Button size="sm" className="flex-1">
                  <Play className="h-4 w-4 mr-1" /> Start
                </Button>
                <Button size="sm" variant="destructive" className="flex-1">
                  <Power className="h-4 w-4 mr-1" /> Stop
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <RotateCcw className="h-4 w-4 mr-1" /> Restart
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  // Desktop table view
  const DesktopTableView = () => (
    <div className="hidden md:block overflow-x-auto">
      <Table>
        <TableCaption>A list of containers.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Task ID</TableHead>
            <TableHead>Task Name</TableHead>
            <TableHead>Task Status</TableHead>
            <TableHead>Task Tag</TableHead>
            <TableHead>Started At</TableHead>
            <TableHead>Uptime</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {taskList.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">{task.id}</TableCell>
              <TableCell>{task.name}</TableCell>
              <TableCell className="flex items-center gap-2">
                <CircleCheck className="h-4 w-4 text-green-500" />
                {task.status}
              </TableCell>
              <TableCell>{task.tag}</TableCell>
              <TableCell>
                {dayjs(task.startedAt).format("DD/MM/YYYY HH:mm")}
              </TableCell>
              <TableCell>{dayjs().from(task.startedAt, true)}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button size="sm">
                  <Play className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="destructive">
                  <Power className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <>
      <MobileCardView />
      <DesktopTableView />
    </>
  );
}
