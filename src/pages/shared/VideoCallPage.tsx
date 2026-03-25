import { useState } from "react";
import { Mic, MicOff, VideoIcon, VideoOff, PhoneOff, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function VideoCallPage({ role = "patient" }: { role?: "patient" | "doctor" }) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  const otherPerson = role === "patient" ? "Dr. Sarah Johnson" : "John Doe";

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Video Consultation</h1>
        <p className="text-muted-foreground">
          {isConnected ? `Connected with ${otherPerson}` : "Start your video consultation"}
        </p>
      </div>

      <div className="glass-card rounded-xl overflow-hidden">
        <div className="relative bg-foreground/5 aspect-video max-h-[500px] flex items-center justify-center">
          {isConnected ? (
            <>
              <div className="text-center">
                <div className="h-24 w-24 rounded-full medical-gradient flex items-center justify-center text-3xl font-bold text-primary-foreground mx-auto mb-4">
                  {otherPerson.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <p className="text-lg font-medium">{otherPerson}</p>
                <p className="text-sm text-muted-foreground animate-pulse-soft">Connected • 03:24</p>
              </div>

              {/* Self preview */}
              <div className="absolute bottom-4 right-4 w-32 h-24 rounded-lg bg-foreground/10 border-2 border-border flex items-center justify-center">
                {isVideoOn ? (
                  <div className="text-center">
                    <div className="h-10 w-10 rounded-full medical-gradient flex items-center justify-center text-xs font-bold text-primary-foreground mx-auto">
                      You
                    </div>
                  </div>
                ) : (
                  <VideoOff className="h-6 w-6 text-muted-foreground" />
                )}
              </div>
            </>
          ) : (
            <div className="text-center">
              <VideoIcon className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">Click "Join Call" to start the consultation</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-3 p-4 bg-card border-t">
          <Button
            variant={isMuted ? "destructive" : "outline"}
            size="icon"
            className="rounded-full h-12 w-12"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
          <Button
            variant={!isVideoOn ? "destructive" : "outline"}
            size="icon"
            className="rounded-full h-12 w-12"
            onClick={() => setIsVideoOn(!isVideoOn)}
          >
            {isVideoOn ? <VideoIcon className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
          </Button>
          <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
            <Monitor className="h-5 w-5" />
          </Button>
          {isConnected ? (
            <Button variant="destructive" size="icon" className="rounded-full h-12 w-12" onClick={() => setIsConnected(false)}>
              <PhoneOff className="h-5 w-5" />
            </Button>
          ) : (
            <Button className="rounded-full px-6 h-12" onClick={() => setIsConnected(true)}>
              Join Call
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
