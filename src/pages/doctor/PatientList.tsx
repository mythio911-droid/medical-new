import { useState } from "react";
import { appointments, reports, Report } from "@/data/dummyData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileText, User, MessageSquare, ExternalLink, Calendar, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function PatientList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [patientReports, setPatientReports] = useState<Report[]>(reports);

  // Group appointments by patient to create a unique patient list
  const patients = Array.from(
    new Map(appointments.map((a) => [a.patientId, a])).values()
  ).filter(p =>
    p.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.patientId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNote = (reportId: string, note: string) => {
    setPatientReports(prev => prev.map(r =>
      r.id === reportId ? { ...r, doctorNotes: note } : r
    ));
    toast.success("Note saved for report");
  };

  const currentPatientReports = patientReports.filter(r => r.patientId === selectedPatientId);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Patients Records</h1>
          <p className="text-muted-foreground">Manage and review your patients' medical history and reports.</p>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search patients..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {patients.map((p) => (
          <Dialog key={p.patientId}>
            <DialogTrigger asChild>
              <Card
                className="cursor-pointer hover:shadow-xl transition-all duration-300 border border-white/10 glass-card group overflow-hidden"
                onClick={() => setSelectedPatientId(p.patientId)}
              >
                <CardContent className="p-0">
                  <div className="h-24 bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <User className="h-10 w-10 text-primary/40" />
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="space-y-1">
                      <p className="font-bold text-lg group-hover:text-primary transition-colors">{p.patientName}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                        <span className="font-medium bg-primary/5 px-2 py-0.5 rounded text-primary text-[10px] uppercase">ID: {p.patientId}</span>
                        <span>•</span>
                        <span>{p.patientAge} years</span>
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/5 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Last Visit</span>
                        <span className="font-medium">{p.date}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Reports</span>
                        <span className="font-medium bg-primary/10 text-primary px-2 rounded-full">
                          {reports.filter(r => r.patientId === p.patientId).length}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>

            <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0 glass-card border border-white/20">
              <DialogHeader className="p-6 border-b border-white/10 bg-white/5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center font-bold text-primary text-2xl border border-primary/20 shadow-inner">
                      {p.patientName.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <DialogTitle className="text-2xl font-bold">{p.patientName}</DialogTitle>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                        <span className="bg-primary/10 text-primary px-2 py-0.5 rounded font-medium">Patient ID: {p.patientId}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {p.patientAge} Years Old</span>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Patient Summary Card */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="glass-card p-4 rounded-xl space-y-1">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Symptoms</p>
                    <p className="text-sm font-medium">{p.symptoms || "None reported"}</p>
                  </div>
                  <div className="glass-card p-4 rounded-xl space-y-1">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Last Appt Type</p>
                    <p className="text-sm font-medium capitalize">{p.type}</p>
                  </div>
                  <div className="glass-card p-4 rounded-xl space-y-1">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Recent Visit Date</p>
                    <p className="text-sm font-medium">{p.date} at {p.time}</p>
                  </div>
                </div>

                {/* Reports Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Medical Reports ({currentPatientReports.length})
                  </h3>

                  <div className="grid gap-4">
                    {currentPatientReports.map((report) => (
                      <div key={report.id} className="glass-card p-5 rounded-2xl border border-white/10 hover:border-primary/20 transition-all space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-xl ${report.fileType === 'pdf' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'}`}>
                              <FileText className="h-6 w-6" />
                            </div>
                            <div>
                              <h4 className="font-bold text-lg">{report.title}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{report.description}</p>
                              <div className="flex items-center gap-3 mt-2">
                                <span className="text-[10px] font-bold uppercase py-0.5 px-2 bg-white/5 border border-white/10 rounded-full text-muted-foreground tracking-tighter">
                                  {report.date}
                                </span>
                                <Button variant="link" size="sm" className="h-auto p-0 text-primary text-xs" asChild>
                                  <a href={report.fileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                                    <ExternalLink className="h-3 w-3" /> Preview Document
                                  </a>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-black/20 rounded-xl p-4 border border-white/5 space-y-3">
                          <div className="flex items-center gap-2 text-xs font-semibold text-primary/80 uppercase tracking-widest">
                            <MessageSquare className="h-3 w-3" />
                            Clinical Notes
                          </div>
                          <Textarea
                            placeholder="Add your medical notes or comments on this report..."
                            className="bg-transparent border-white/10 min-h-[80px] text-sm resize-none focus-visible:ring-primary/30"
                            defaultValue={report.doctorNotes}
                            onBlur={(e) => handleAddNote(report.id, e.target.value)}
                          />
                        </div>
                      </div>
                    ))}

                    {currentPatientReports.length === 0 && (
                      <div className="text-center py-10 bg-white/5 rounded-2xl border border-dashed border-white/10">
                        <p className="text-muted-foreground italic">No reports uploaded by this patient yet.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>

      {patients.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">No patients found matching your search.</p>
        </div>
      )}
    </div>
  );
}
