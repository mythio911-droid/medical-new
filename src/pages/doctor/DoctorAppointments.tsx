import { appointments } from "@/data/dummyData";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import type { Appointment } from "@/data/dummyData";

export default function DoctorAppointments() {
  const [apts, setApts] = useState<Appointment[]>(appointments);

  const handleAction = (id: string, action: "confirmed" | "rejected") => {
    setApts(prev => prev.map(a => a.id === id ? { ...a, status: action } : a));
    toast.success(action === "confirmed" ? "Appointment accepted" : "Appointment rejected");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Appointments</h1>
        <p className="text-muted-foreground">Manage your appointment schedule</p>
      </div>

      <div className="space-y-3">
        {apts.map((apt) => (
          <div key={apt.id} className="glass-card rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="font-medium">{apt.patientName} <span className="text-muted-foreground text-sm">({apt.patientAge} yrs)</span></p>
              <p className="text-sm text-muted-foreground">{apt.date} • {apt.time} • {apt.type}</p>
              {apt.symptoms && <p className="text-xs text-muted-foreground mt-1">{apt.symptoms}</p>}
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status={apt.status} />
              {apt.status === "pending" && (
                <>
                  <Button size="sm" onClick={() => handleAction(apt.id, "confirmed")}>Accept</Button>
                  <Button size="sm" variant="outline" onClick={() => handleAction(apt.id, "rejected")}>Reject</Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
