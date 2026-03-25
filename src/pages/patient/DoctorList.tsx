import { useState } from "react";
import { doctors } from "@/data/dummyData";
import { StatusBadge } from "@/components/StatusBadge";
import { Star, Search, Video, Crown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

export default function DoctorList() {
  const [search, setSearch] = useState("");
  const [bookingDoc, setBookingDoc] = useState<string | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const filtered = doctors.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.specialty.toLowerCase().includes(search.toLowerCase())
  );

  const handleBook = () => {
    if (!date || !time) { toast.error("Please select date and time"); return; }
    toast.success("Appointment booked successfully!");
    setBookingDoc(null);
    setDate("");
    setTime("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Find Doctors</h1>
        <p className="text-muted-foreground">Browse and book appointments with specialists</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search by name or specialty..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((doc) => (
          <div key={doc.id} className="glass-card rounded-xl p-5 hover:shadow-md transition-shadow relative">
            {doc.isPremium && (
              <div className="absolute top-3 right-3 flex items-center gap-1 bg-warning/15 text-warning rounded-full px-2 py-0.5 text-[10px] font-bold">
                <Crown className="h-3 w-3" /> Premium
              </div>
            )}
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full medical-gradient flex items-center justify-center font-bold text-primary-foreground">
                {doc.avatar}
              </div>
              <div>
                <p className="font-semibold">{doc.name}</p>
                <p className="text-sm text-muted-foreground">{doc.specialty}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 text-warning fill-warning" /> {doc.rating}</span>
              <span>{doc.experience} yrs exp</span>
              <span>₹{doc.fee}</span>
            </div>
            <div className="flex items-center justify-between">
              <StatusBadge status={doc.status} />
              <Button size="sm" onClick={() => setBookingDoc(doc.id)} disabled={doc.status === "offline"}>
                Book Now
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!bookingDoc} onOpenChange={() => setBookingDoc(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book Appointment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <p className="text-sm text-muted-foreground">
              {doctors.find(d => d.id === bookingDoc)?.name} — {doctors.find(d => d.id === bookingDoc)?.specialty}
            </p>
            <div>
              <label className="text-sm font-medium mb-1 block">Date</label>
              <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Time</label>
              <Input type="time" value={time} onChange={e => setTime(e.target.value)} />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="flex-1 gap-1" onClick={handleBook}>
                In-Person
              </Button>
              <Button className="flex-1 gap-1" onClick={handleBook}>
                <Video className="h-4 w-4" /> Video Call
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
