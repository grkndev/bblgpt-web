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
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
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
            <TableCell className="bg-emerald-500/50 flex w-fit rounded-full py-1 px-2 items-center gap-1 text-emerald-200">
              <CircleCheck size={16} />
              {task.status}
            </TableCell>
            <TableCell>{task.tag}</TableCell>
            <TableCell>
              {dayjs(task.startedAt).format("DD/MM/YYYY HH:mm:ss")}
            </TableCell>
            <TableCell>
              {dayjs
                .duration(dayjs().diff(task.startedAt))
                .format("D [gün], H [saat], m [dakika], s [saniye]")}
            </TableCell>
            <TableCell className="justify-end flex flex-row w-full  gap-4">
              <Button variant={"ghost"} size={"icon"}>
                <Play />
              </Button>
              <Button variant={"ghost"} size={"icon"}>
                <Power />
              </Button>
              <Button variant={"ghost"} size={"icon"}>
                <RotateCcw />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
