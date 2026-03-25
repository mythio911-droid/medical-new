import { useState } from "react";
import { labTests } from "@/data/dummyData";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LabTestBooking() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => setSelected(prev =>
    prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
  );

  const total = selected.reduce((sum, id) => {
    const t = labTests.find(l => l.id === id);
    return sum + (t ? t.price : 0);
  }, 0);

  const handleBook = () => {
    if (selected.length === 0) { toast.error("Select at least one test"); return; }
    toast.success("Lab tests booked successfully! 🧪");
    setSelected([]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Book Lab Tests</h1>
        <p className="text-muted-foreground">Select tests and book for home sample collection</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {labTests.map((test) => {
          const isSelected = selected.includes(test.id);
          return (
            <button
              key={test.id}
              onClick={() => toggle(test.id)}
              className={cn(
                "glass-card rounded-xl p-4 text-left transition-all",
                isSelected && "ring-2 ring-primary bg-primary/5"
              )}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-sm">{test.name}</h3>
                {isSelected && <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center"><Check className="h-3 w-3 text-primary-foreground" /></div>}
              </div>
              <p className="text-xs text-muted-foreground mb-2">{test.description}</p>
              <p className="text-sm font-bold text-primary">₹{test.price}</p>
            </button>
          );
        })}
      </div>

      {selected.length > 0 && (
        <div className="glass-card rounded-xl p-4 flex items-center justify-between sticky bottom-4">
          <div>
            <span className="font-medium">{selected.length} test(s) selected</span>
            <span className="text-muted-foreground mx-2">•</span>
            <span className="font-bold text-primary">₹{total}</span>
          </div>
          <Button onClick={handleBook}>Book Now</Button>
        </div>
      )}
    </div>
  );
}
