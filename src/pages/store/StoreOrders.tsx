import { useState } from "react";
import { orders as initialOrders } from "@/data/dummyData";
import { StatusBadge } from "@/components/StatusBadge";
import { Pill, FlaskConical, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { Order } from "@/data/dummyData";

const nextStatus: Record<string, "processing" | "dispatched" | undefined> = {
  received: "processing",
  processing: "dispatched",
};

export default function StoreOrders() {
  const [storeOrders, setOrders] = useState<Order[]>(initialOrders);
  const [filter, setFilter] = useState<"all" | "medicine" | "lab-test">("all");

  const advance = (id: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id !== id) return o;
      const next = nextStatus[o.status];
      if (next) {
        toast.success(`Order ${id} updated to ${next}`);
        return { ...o, status: next };
      }
      return o;
    }));
  };

  const filtered = filter === "all" ? storeOrders : storeOrders.filter(o => o.type === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Orders</h1>
        <p className="text-muted-foreground">View and manage all orders</p>
      </div>

      <div className="flex gap-2">
        {(["all", "medicine", "lab-test"] as const).map((f) => (
          <Button key={f} size="sm" variant={filter === f ? "default" : "outline"} onClick={() => setFilter(f)} className="capitalize">
            {f === "lab-test" ? "Lab Tests" : f === "all" ? "All" : "Medicines"}
          </Button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((order) => (
          <div key={order.id} className="glass-card rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                {order.type === "medicine" ? <Pill className="h-4 w-4 text-primary" /> : <FlaskConical className="h-4 w-4 text-primary" />}
              </div>
              <div>
                <p className="font-medium">#{order.id} — {order.patientName}</p>
                <p className="text-sm text-muted-foreground">{order.items.join(", ")}</p>
                <p className="text-sm text-muted-foreground">{order.date} • ₹{order.total}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status={order.status} />
              {nextStatus[order.status] && (
                <Button size="sm" variant="outline" onClick={() => advance(order.id)} className="gap-1 capitalize">
                  {nextStatus[order.status]} <ArrowRight className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
