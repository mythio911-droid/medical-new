import { appointments } from "@/data/dummyData";

const patients = [...new Map(appointments.map(a => [a.patientName, a])).values()];

export default function PatientList() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Patients</h1>
        <p className="text-muted-foreground">View your patient details</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {patients.map((p) => (
          <div key={p.patientName} className="glass-card rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-11 w-11 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
                {p.patientName.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <p className="font-semibold">{p.patientName}</p>
                <p className="text-sm text-muted-foreground">{p.patientAge} years old</p>
              </div>
            </div>
            <div className="text-sm space-y-1 text-muted-foreground">
              <p><span className="font-medium text-foreground">Last visit:</span> {p.date}</p>
              <p><span className="font-medium text-foreground">Symptoms:</span> {p.symptoms || "N/A"}</p>
              <p><span className="font-medium text-foreground">Type:</span> {p.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
