import { doctors, appointments } from "@/data/dummyData";
import { StatusBadge } from "@/components/StatusBadge";
import { CalendarDays, Users, Video, Pill, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { label: "Appointments", value: appointments.filter(a => a.status === "confirmed").length, icon: CalendarDays, color: "text-primary" },
  { label: "Doctors Available", value: doctors.filter(d => d.status === "available").length, icon: Users, color: "text-success" },
  { label: "Video Consults", value: appointments.filter(a => a.type === "video").length, icon: Video, color: "text-accent" },
  { label: "Prescriptions", value: 3, icon: Pill, color: "text-warning" },
];

export default function PatientDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome back, John 👋</h1>
        <p className="text-muted-foreground">Here's an overview of your health dashboard</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="glass-card rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </div>
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">Top Doctors</h2>
            <Link to="/doctors" className="text-sm text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {doctors.slice(0, 3).map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full medical-gradient flex items-center justify-center text-sm font-bold text-primary-foreground">
                    {doc.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">{doc.specialty}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-xs text-warning">
                    <Star className="h-3 w-3 fill-current" /> {doc.rating}
                  </div>
                  <StatusBadge status={doc.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">Upcoming Appointments</h2>
            <Link to="/appointments" className="text-sm text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {appointments.filter(a => a.status !== "completed").slice(0, 3).map((apt) => (
              <div key={apt.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium text-sm">{apt.doctorName}</p>
                  <p className="text-xs text-muted-foreground">{apt.date} • {apt.time}</p>
                </div>
                <div className="flex items-center gap-2">
                  {apt.type === "video" && <Video className="h-3.5 w-3.5 text-accent" />}
                  <StatusBadge status={apt.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
