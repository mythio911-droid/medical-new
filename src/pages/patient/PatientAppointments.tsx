import { useState } from "react";
import { appointments as initialAppointments } from "@/data/dummyData";
import { StatusBadge } from "@/components/StatusBadge";
import { Video, MapPin } from "lucide-react";

export default function PatientAppointments() {
  const [apts] = useState(initialAppointments);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Appointments</h1>
        <p className="text-muted-foreground">View and manage your scheduled appointments</p>
      </div>

      <div className="space-y-3">
        {apts.map((apt) => (
          <div key={apt.id} className="glass-card rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full medical-gradient flex items-center justify-center text-sm font-bold text-primary-foreground shrink-0">
                {apt.doctorName.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </div>
              <div>
                <p className="font-medium">{apt.doctorName}</p>
                <p className="text-sm text-muted-foreground">{apt.date} • {apt.time}</p>
                {apt.symptoms && <p className="text-xs text-muted-foreground mt-0.5">{apt.symptoms}</p>}
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                {apt.type === "video" ? <Video className="h-3.5 w-3.5 text-accent" /> : <MapPin className="h-3.5 w-3.5 text-primary" />}
                {apt.type === "video" ? "Video" : "In-person"}
              </span>
              <StatusBadge status={apt.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
