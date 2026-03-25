import { useState } from "react";
import { medicines } from "@/data/dummyData";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { toast } from "sonner";

export default function MedicineOrder() {
  const [cart, setCart] = useState<Record<string, number>>({});

  const addToCart = (id: string) => setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  const removeFromCart = (id: string) => setCart(prev => {
    const n = (prev[id] || 0) - 1;
    if (n <= 0) { const { [id]: _, ...rest } = prev; return rest; }
    return { ...prev, [id]: n };
  });

  const total = Object.entries(cart).reduce((sum, [id, qty]) => {
    const med = medicines.find(m => m.id === id);
    return sum + (med ? med.price * qty : 0);
  }, 0);

  const handleOrder = () => {
    if (Object.keys(cart).length === 0) { toast.error("Cart is empty"); return; }
    toast.success("Order placed successfully! 🎉");
    setCart({});
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Order Medicines</h1>
        <p className="text-muted-foreground">Order prescribed medicines for delivery</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {medicines.map((med) => (
          <div key={med.id} className="glass-card rounded-xl p-4">
            <h3 className="font-semibold">{med.name}</h3>
            <p className="text-sm text-muted-foreground mb-1">{med.dosage}</p>
            <p className="text-sm font-medium text-primary mb-3">₹{med.price} / strip</p>
            <div className="flex items-center justify-between">
              {cart[med.id] ? (
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => removeFromCart(med.id)}><Minus className="h-3 w-3" /></Button>
                  <span className="font-medium w-6 text-center">{cart[med.id]}</span>
                  <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => addToCart(med.id)}><Plus className="h-3 w-3" /></Button>
                </div>
              ) : (
                <Button size="sm" variant="outline" onClick={() => addToCart(med.id)}>Add to Cart</Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {Object.keys(cart).length > 0 && (
        <div className="glass-card rounded-xl p-4 flex items-center justify-between sticky bottom-4">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-primary" />
            <span className="font-medium">{Object.values(cart).reduce((a, b) => a + b, 0)} items</span>
            <span className="text-muted-foreground">•</span>
            <span className="font-bold text-primary">₹{total}</span>
          </div>
          <Button onClick={handleOrder}>Place Order</Button>
        </div>
      )}
    </div>
  );
}
