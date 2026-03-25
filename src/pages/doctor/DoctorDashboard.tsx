import { useState } from "react";
import { appointments as initialApts } from "@/data/dummyData";
import { StatusBadge } from "@/components/StatusBadge";
import { CalendarDays, Users, CheckCircle, Clock, ToggleLeft, ToggleRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { Appointment } from "@/data/dummyData";

export default function DoctorDashboard() {
  const [isOnline, setIsOnline] = useState(true);
  const [apts, setApts] = useState<Appointment[]>(initialApts);

  const pending = apts.filter(a => a.status === "pending");
  const confirmed = apts.filter(a => a.status === "confirmed");

  const handleAction = (id: string, action: "confirmed" | "rejected") => {
    setApts(prev => prev.map(a => a.id === id ? { ...a, status: action } : a));
    toast.success(action === "confirmed" ? "Appointment accepted" : "Appointment rejected");
  };

  const stats = [
    { label: "Total Appointments", value: apts.length, icon: CalendarDays },
    { label: "Pending", value: pending.length, icon: Clock },
    { label: "Confirmed", value: confirmed.length, icon: CheckCircle },
    { label: "Total Patients", value: new Set(apts.map(a => a.patientName)).size, icon: Users },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Doctor Dashboard</h1>
          <p className="text-muted-foreground">Welcome, Dr. Sarah Johnson</p>
        </div>
        <Button
          variant={isOnline ? "default" : "outline"}
          onClick={() => { setIsOnline(!isOnline); toast.info(isOnline ? "You're now offline" : "You're now online"); }}
          className="gap-2"
        >
          {isOnline ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
          {isOnline ? "Online" : "Offline"}
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="glass-card rounded-xl p-4">
            <s.icon className="h-5 w-5 text-primary mb-2" />
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-xl p-5">
        <h2 className="font-semibold text-lg mb-4">Pending Requests</h2>
        {pending.length === 0 ? (
          <p className="text-muted-foreground text-sm">No pending appointment requests</p>
        ) : (
          <div className="space-y-3">
            {pending.map((apt) => (
              <div key={apt.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-muted/50 gap-3">
                <div>
                  <p className="font-medium">{apt.patientName} <span className="text-muted-foreground text-sm">({apt.patientAge} yrs)</span></p>
                  <p className="text-sm text-muted-foreground">{apt.date} • {apt.time} • {apt.type}</p>
                  {apt.symptoms && <p className="text-xs text-muted-foreground mt-0.5">{apt.symptoms}</p>}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleAction(apt.id, "confirmed")}>Accept</Button>
                  <Button size="sm" variant="outline" onClick={() => handleAction(apt.id, "rejected")}>Reject</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="glass-card rounded-xl p-5">
        <h2 className="font-semibold text-lg mb-4">All Appointments</h2>
        <div className="space-y-3">
          {apts.map((apt) => (
            <div key={apt.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div>
                <p className="font-medium text-sm">{apt.patientName}</p>
                <p className="text-xs text-muted-foreground">{apt.date} • {apt.time}</p>
              </div>
              <StatusBadge status={apt.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
