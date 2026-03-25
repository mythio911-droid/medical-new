import { useState } from "react";
import { chatMessages as initialMessages } from "@/data/dummyData";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ChatPage({ role = "patient" }: { role?: "patient" | "doctor" }) {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const sender = role;

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, {
      id: `c${Date.now()}`,
      sender,
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }]);
    setInput("");

    // Simulate reply
    setTimeout(() => {
      const replySender = sender === "patient" ? "doctor" : "patient";
      setMessages(prev => [...prev, {
        id: `c${Date.now()}`,
        sender: replySender,
        text: replySender === "doctor"
          ? "I've noted that. Let me review your reports and get back to you shortly."
          : "Thank you, Doctor. I'll follow the advice.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }]);
    }, 1500);
  };

  return (
    <div className="space-y-4 h-[calc(100vh-8rem)] flex flex-col">
      <div>
        <h1 className="text-2xl font-bold">Chat</h1>
        <p className="text-muted-foreground">
          {role === "patient" ? "Chat with Dr. Sarah Johnson" : "Chat with John Doe"}
        </p>
      </div>

      <div className="flex-1 glass-card rounded-xl p-4 overflow-y-auto space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className={cn("flex", msg.sender === sender ? "justify-end" : "justify-start")}>
            <div className={cn(
              "max-w-[75%] rounded-2xl px-4 py-2.5",
              msg.sender === sender
                ? "medical-gradient text-primary-foreground rounded-br-md"
                : "bg-muted rounded-bl-md"
            )}>
              <p className="text-sm">{msg.text}</p>
              <p className={cn("text-[10px] mt-1", msg.sender === sender ? "text-primary-foreground/70" : "text-muted-foreground")}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Type a message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSend()}
          className="flex-1"
        />
        <Button onClick={handleSend} size="icon"><Send className="h-4 w-4" /></Button>
      </div>
    </div>
  );
}
