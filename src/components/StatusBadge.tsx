import { cn } from "@/lib/utils";

type StatusType = "available" | "on-duty" | "offline" | "pending" | "confirmed" | "rejected" | "completed" | "received" | "processing" | "dispatched";

const statusStyles: Record<StatusType, string> = {
  available: "bg-success/15 text-success",
  "on-duty": "bg-warning/15 text-warning",
  offline: "bg-muted text-muted-foreground",
  pending: "bg-warning/15 text-warning",
  confirmed: "bg-success/15 text-success",
  rejected: "bg-destructive/15 text-destructive",
  completed: "bg-info/15 text-info",
  received: "bg-warning/15 text-warning",
  processing: "bg-info/15 text-info",
  dispatched: "bg-success/15 text-success",
};

export const StatusBadge = ({ status }: { status: StatusType }) => (
  <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize", statusStyles[status])}>
    <span className={cn("h-1.5 w-1.5 rounded-full", {
      "bg-success": ["available", "confirmed", "dispatched"].includes(status),
      "bg-warning": ["on-duty", "pending", "received"].includes(status),
      "bg-muted-foreground": status === "offline",
      "bg-destructive": status === "rejected",
      "bg-info": ["completed", "processing"].includes(status),
    })} />
    {status.replace("-", " ")}
  </span>
);
