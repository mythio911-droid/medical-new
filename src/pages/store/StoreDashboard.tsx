import { useState } from "react";
import { orders as initialOrders } from "@/data/dummyData";
import { StatusBadge } from "@/components/StatusBadge";
import { Package, FlaskConical, Pill, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { Order } from "@/data/dummyData";

const nextStatus: Record<string, "processing" | "dispatched" | undefined> = {
  received: "processing",
  processing: "dispatched",
};

export default function StoreDashboard() {
  const [storeOrders, setOrders] = useState<Order[]>(initialOrders);

  const advance = (id: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id !== id) return o;
      const next = nextStatus[o.status];
      if (next) {
        toast.success(`Order ${id} moved to ${next}`);
        return { ...o, status: next };
      }
      return o;
    }));
  };

  const stats = [
    { label: "Total Orders", value: storeOrders.length, icon: Package },
    { label: "Medicine Orders", value: storeOrders.filter(o => o.type === "medicine").length, icon: Pill },
    { label: "Lab Orders", value: storeOrders.filter(o => o.type === "lab-test").length, icon: FlaskConical },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Store Dashboard</h1>
        <p className="text-muted-foreground">Manage pharmacy and lab orders</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="glass-card rounded-xl p-4">
            <s.icon className="h-5 w-5 text-primary mb-2" />
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-xl p-5">
        <h2 className="font-semibold text-lg mb-4">All Orders</h2>
        <div className="space-y-3">
          {storeOrders.map((order) => (
            <div key={order.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-muted/50 gap-3">
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  {order.type === "medicine" ? <Pill className="h-4 w-4 text-primary" /> : <FlaskConical className="h-4 w-4 text-primary" />}
                </div>
                <div>
                  <p className="font-medium text-sm">#{order.id} — {order.patientName}</p>
                  <p className="text-xs text-muted-foreground">{order.items.join(", ")}</p>
                  <p className="text-xs text-muted-foreground">{order.date} • ₹{order.total}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={order.status} />
                {nextStatus[order.status] && (
                  <Button size="sm" variant="outline" onClick={() => advance(order.id)} className="gap-1">
                    {nextStatus[order.status]} <ArrowRight className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
