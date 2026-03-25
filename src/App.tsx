import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider, useAppContext } from "@/context/AppContext";
import AppLayout from "@/components/AppLayout";

import PatientDashboard from "@/pages/patient/PatientDashboard";
import DoctorList from "@/pages/patient/DoctorList";
import PatientAppointments from "@/pages/patient/PatientAppointments";
import MedicineOrder from "@/pages/patient/MedicineOrder";
import LabTestBooking from "@/pages/patient/LabTestBooking";
import UploadReport from "@/pages/patient/UploadReport";
import ChatPage from "@/pages/shared/ChatPage";
import VideoCallPage from "@/pages/shared/VideoCallPage";

import DoctorDashboard from "@/pages/doctor/DoctorDashboard";
import DoctorAppointments from "@/pages/doctor/DoctorAppointments";
import PatientList from "@/pages/doctor/PatientList";

import StoreDashboard from "@/pages/store/StoreDashboard";
import StoreOrders from "@/pages/store/StoreOrders";

import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function AppRoutes() {
  const { role } = useAppContext();

  return (
    <AppLayout>
      <Routes>
        {/* Patient routes */}
        <Route path="/" element={<PatientDashboard />} />
        <Route path="/doctors" element={<DoctorList />} />
        <Route path="/appointments" element={<PatientAppointments />} />
        <Route path="/chat" element={<ChatPage role="patient" />} />
        <Route path="/video" element={<VideoCallPage role="patient" />} />
        <Route path="/medicines" element={<MedicineOrder />} />
        <Route path="/lab-tests" element={<LabTestBooking />} />
        <Route path="/upload-report" element={<UploadReport />} />

        {/* Doctor routes */}
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/doctor/appointments" element={<DoctorAppointments />} />
        <Route path="/doctor/patients" element={<PatientList />} />
        <Route path="/doctor/chat" element={<ChatPage role="doctor" />} />
        <Route path="/doctor/video" element={<VideoCallPage role="doctor" />} />

        {/* Store routes */}
        <Route path="/store" element={<StoreDashboard />} />
        <Route path="/store/orders" element={<StoreOrders />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppLayout>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
