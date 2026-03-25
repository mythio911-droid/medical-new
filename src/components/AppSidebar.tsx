import { useAppContext } from "@/context/AppContext";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";
import {
  CalendarDays, MessageSquare, Video, Pill, FlaskConical, LayoutDashboard,
  Users, Package, Activity, Stethoscope, Store, User,
} from "lucide-react";
import { useLocation } from "react-router-dom";

const patientLinks = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Doctors", url: "/doctors", icon: Stethoscope },
  { title: "Appointments", url: "/appointments", icon: CalendarDays },
  { title: "Chat", url: "/chat", icon: MessageSquare },
  { title: "Video Consult", url: "/video", icon: Video },
  { title: "Medicines", url: "/medicines", icon: Pill },
  { title: "Lab Tests", url: "/lab-tests", icon: FlaskConical },
];

const doctorLinks = [
  { title: "Dashboard", url: "/doctor", icon: LayoutDashboard },
  { title: "Appointments", url: "/doctor/appointments", icon: CalendarDays },
  { title: "Patients", url: "/doctor/patients", icon: Users },
  { title: "Chat", url: "/doctor/chat", icon: MessageSquare },
  { title: "Video Consult", url: "/doctor/video", icon: Video },
];

const storeLinks = [
  { title: "Dashboard", url: "/store", icon: LayoutDashboard },
  { title: "Orders", url: "/store/orders", icon: Package },
];

const roleConfig = {
  patient: { links: patientLinks, label: "Patient Portal", icon: User },
  doctor: { links: doctorLinks, label: "Doctor Portal", icon: Stethoscope },
  store: { links: storeLinks, label: "Store Portal", icon: Store },
};

export function AppSidebar() {
  const { role, setRole } = useAppContext();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const config = roleConfig[role];

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        {!collapsed && (
          <div className="px-4 py-5">
            <div className="flex items-center gap-2">
              <Activity className="h-7 w-7 text-sidebar-foreground" />
              <span className="text-lg font-bold text-sidebar-foreground">MediCare+</span>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="flex justify-center py-4">
            <Activity className="h-6 w-6 text-sidebar-foreground" />
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60 text-xs uppercase tracking-wider">
            {!collapsed && config.label}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {config.links.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/" || item.url === "/doctor" || item.url === "/store"}
                      className="text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        {!collapsed && (
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-wider text-sidebar-foreground/50 px-2 mb-2">Switch Role</p>
            {(["patient", "doctor", "store"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`w-full text-left px-3 py-1.5 rounded-md text-sm capitalize transition-colors ${
                  role === r ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
