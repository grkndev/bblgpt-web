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
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";
import {
  CircleAlert,
  CircleCheck,
  CircleSlash,
  Play,
  Power,
  RotateCcw,
  Terminal,
} from "lucide-react";
import { getContainers } from "@/lib/utils";
import { TaskStatus } from "@/lib/types";
dayjs.extend(relativeTime);
dayjs.extend(duration);

export default function ContainerTable() {
  const taskList = getContainers();

  const MobileCardView = () => (
    <div className="space-y-4 md:hidden">
      {taskList.map((task) => (
        <Card key={task.id}>
          <CardContent className="pt-6">
            <div className="flex justify-between">
              <span className="font-bold">{task.id}</span>
              <span className="flex items-center gap-2">
                {(() => {
                  switch (task.status) {
                    case TaskStatus.Active:
                      return <CircleCheck className="h-4 w-4 text-green-500" />;
                    case TaskStatus.Inactive:
                      return <CircleAlert className="h-4 w-4 text-red-500" />;
                    case TaskStatus.Stopped:
                      return <Power className="h-4 w-4 text-red-500" />;
                    default:
                      return <RotateCcw className="h-4 w-4 text-yellow-500" />;
                  }
                })()}
                {task.status}
              </span>
            </div>
            <div className="font-medium mt-2">{task.name}</div>
            <div className="text-sm text-muted-foreground">{task.tag}</div>
            <div className="text-sm text-muted-foreground mt-2">
              Started: {dayjs(task.startedAt).format("DD/MM/YYYY HH:mm")}
            </div>
            <div className="text-sm text-muted-foreground">
              Uptime: {dayjs().from(task.startedAt, true)}
            </div>
            <div className="flex gap-2 mt-4">
              <Button
                disabled={task.status === TaskStatus.Active}
                size="sm"
                variant="default"
                className="flex-1"
              >
                <Play className="h-4 w-4 mr-1" /> Start
              </Button>
              <Button
                disabled={task.status !== TaskStatus.Active}
                size="sm"
                variant="destructive"
                className="flex-1"
              >
                <Power className="h-4 w-4 mr-1" /> Stop
              </Button>
            </div>
            <div className="flex gap-2 mt-2">
              <Button
                disabled={task.status !== TaskStatus.Active}
                size="sm"
                variant="outline"
                className="flex-1"
              >
                <RotateCcw className="h-4 w-4 mr-1" /> Restart
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
              >
                <Terminal className="h-4 w-4 mr-1" /> Console
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const DesktopTableView = () => (
    <div className="hidden md:block">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Tag</TableHead>
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
                {(() => {
                  switch (task.status) {
                    case TaskStatus.Active:
                      return <CircleCheck className="h-4 w-4 text-green-500" />;
                    case TaskStatus.Inactive:
                      return <CircleAlert className="h-4 w-4 text-red-500" />;
                    case TaskStatus.Stopped:
                      return <Power className="h-4 w-4 text-red-500" />;
                    default:
                      return <RotateCcw className="h-4 w-4 text-yellow-500" />;
                  }
                })()}
                {task.status}
              </TableCell>
              <TableCell>{task.tag}</TableCell>
              <TableCell>
                {dayjs(task.startedAt).format("DD/MM/YYYY HH:mm")}
              </TableCell>
              <TableCell>{dayjs().from(task.startedAt, true)}</TableCell>
              <TableCell className="justify-self-end w-fit flex space-x-2">
                <Button
                  disabled={task.status === TaskStatus.Active}
                  size="sm"
                  variant="ghost"
                  className="hover:bg-green-100"
                >
                  <Play className="h-4 w-4" />
                </Button>
                <Button
                  disabled={task.status !== TaskStatus.Active}
                  size="sm"
                  variant="ghost"
                  className="hover:bg-red-100"
                >
                  <Power className="h-4 w-4" />
                </Button>
                <Button
                  disabled={task.status !== TaskStatus.Active}
                  size="sm"
                  variant="ghost"
                  className="hover:bg-yellow-100"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="hover:bg-slate-100"
                >
                  <Terminal className="h-4 w-4" />
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
