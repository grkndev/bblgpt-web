export type Containers = {
    id: string;
    name: string;
    status: TaskStatus;
    tag: string;
    startedAt: Date;
}
export enum TaskStatus {
    Active = "Active",
    Inactive = "Inactive",
    Stopped = "Stopped",
    Unknown = "Unknown",
}