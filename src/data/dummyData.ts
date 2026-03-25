export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  status: "available" | "on-duty" | "offline";
  rating: number;
  experience: number;
  fee: number;
  isPremium?: boolean;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  type: "in-person" | "video";
  status: "pending" | "confirmed" | "rejected" | "completed";
  symptoms?: string;
}

export interface ChatMessage {
  id: string;
  sender: "patient" | "doctor";
  text: string;
  time: string;
}

export interface Medicine {
  id: string;
  name: string;
  dosage: string;
  price: number;
  quantity: number;
}

export interface LabTest {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface Order {
  id: string;
  type: "medicine" | "lab-test";
  patientName: string;
  items: string[];
  total: number;
  status: "received" | "processing" | "dispatched";
  date: string;
}

export const doctors: Doctor[] = [
  { id: "d1", name: "Dr. Sarah Johnson", specialty: "Cardiologist", avatar: "SJ", status: "available", rating: 4.8, experience: 12, fee: 500, isPremium: true },
  { id: "d2", name: "Dr. Michael Chen", specialty: "Dermatologist", avatar: "MC", status: "on-duty", rating: 4.6, experience: 8, fee: 400 },
  { id: "d3", name: "Dr. Emily Williams", specialty: "Pediatrician", avatar: "EW", status: "available", rating: 4.9, experience: 15, fee: 450 },
  { id: "d4", name: "Dr. James Brown", specialty: "Orthopedic", avatar: "JB", status: "offline", rating: 4.5, experience: 10, fee: 600, isPremium: true },
  { id: "d5", name: "Dr. Aisha Patel", specialty: "Neurologist", avatar: "AP", status: "available", rating: 4.7, experience: 14, fee: 700 },
  { id: "d6", name: "Dr. Robert Kim", specialty: "General Physician", avatar: "RK", status: "on-duty", rating: 4.4, experience: 6, fee: 300 },
];

export const appointments: Appointment[] = [
  { id: "a1", patientId: "p1", patientName: "John Doe", patientAge: 34, doctorId: "d1", doctorName: "Dr. Sarah Johnson", date: "2026-03-24", time: "10:00 AM", type: "video", status: "pending", symptoms: "Chest pain, shortness of breath" },
  { id: "a2", patientId: "p2", patientName: "Jane Smith", patientAge: 28, doctorId: "d3", doctorName: "Dr. Emily Williams", date: "2026-03-24", time: "11:30 AM", type: "in-person", status: "confirmed", symptoms: "Fever and cold" },
  { id: "a3", patientId: "p1", patientName: "John Doe", patientAge: 34, doctorId: "d1", doctorName: "Dr. Sarah Johnson", date: "2026-03-25", time: "2:00 PM", type: "video", status: "pending", symptoms: "Heart palpitations" },
  { id: "a4", patientId: "p3", patientName: "Lisa Chang", patientAge: 31, doctorId: "d5", doctorName: "Dr. Aisha Patel", date: "2026-03-25", time: "3:30 PM", type: "in-person", status: "completed", symptoms: "Migraine headaches" },
];

export const chatMessages: ChatMessage[] = [
  { id: "c1", sender: "patient", text: "Hello Doctor, I've been having headaches for the past week.", time: "10:00 AM" },
  { id: "c2", sender: "doctor", text: "I understand. Can you describe the pain? Is it throbbing or constant?", time: "10:02 AM" },
  { id: "c3", sender: "patient", text: "It's mostly throbbing, usually on the right side.", time: "10:03 AM" },
  { id: "c4", sender: "doctor", text: "Have you noticed any triggers? Like stress, lack of sleep, or certain foods?", time: "10:05 AM" },
  { id: "c5", sender: "patient", text: "I've been quite stressed at work lately and sleeping less.", time: "10:06 AM" },
  { id: "c6", sender: "doctor", text: "That could very well be the cause. I'd recommend some lifestyle changes and I'll prescribe something for relief.", time: "10:08 AM" },
];

export const medicines: Medicine[] = [
  { id: "m1", name: "Paracetamol 500mg", dosage: "1 tablet twice daily", price: 25, quantity: 20 },
  { id: "m2", name: "Amoxicillin 250mg", dosage: "1 capsule thrice daily", price: 80, quantity: 15 },
  { id: "m3", name: "Omeprazole 20mg", dosage: "1 capsule before breakfast", price: 45, quantity: 10 },
  { id: "m4", name: "Cetirizine 10mg", dosage: "1 tablet at night", price: 15, quantity: 10 },
  { id: "m5", name: "Vitamin D3 60K IU", dosage: "1 sachet weekly", price: 120, quantity: 4 },
];

export const labTests: LabTest[] = [
  { id: "l1", name: "Complete Blood Count (CBC)", price: 350, description: "Measures red/white blood cells, hemoglobin, platelets" },
  { id: "l2", name: "Lipid Profile", price: 500, description: "Cholesterol, triglycerides, HDL, LDL levels" },
  { id: "l3", name: "Thyroid Function Test", price: 600, description: "TSH, T3, T4 hormone levels" },
  { id: "l4", name: "Blood Sugar (Fasting)", price: 150, description: "Fasting glucose levels" },
  { id: "l5", name: "Liver Function Test", price: 450, description: "SGOT, SGPT, bilirubin, alkaline phosphatase" },
  { id: "l6", name: "Kidney Function Test", price: 550, description: "Creatinine, urea, uric acid levels" },
];

export const orders: Order[] = [
  { id: "o1", type: "medicine", patientName: "John Doe", items: ["Paracetamol 500mg x20", "Omeprazole 20mg x10"], total: 295, status: "received", date: "2026-03-23" },
  { id: "o2", type: "lab-test", patientName: "Jane Smith", items: ["Complete Blood Count", "Lipid Profile"], total: 850, status: "processing", date: "2026-03-22" },
  { id: "o3", type: "medicine", patientName: "Mike Wilson", items: ["Amoxicillin 250mg x15", "Cetirizine 10mg x10"], total: 230, status: "dispatched", date: "2026-03-21" },
  { id: "o4", type: "lab-test", patientName: "Lisa Chang", items: ["Thyroid Function Test"], total: 600, status: "received", date: "2026-03-23" },
];

export interface Report {
  id: string;
  patientId: string;
  patientName: string;
  title: string;
  description: string;
  date: string;
  fileType: "pdf" | "image";
  fileUrl: string;
  doctorNotes?: string;
}

export const reports: Report[] = [
  {
    id: "r1",
    patientId: "p1",
    patientName: "John Doe",
    title: "Blood Test Results",
    description: "Annual physical blood work results including cholesterol and glucose levels.",
    date: "2026-03-20",
    fileType: "pdf",
    fileUrl: "https://pdfobject.com/pdf/sample.pdf"
  },
  {
    id: "r2",
    patientId: "p1",
    patientName: "John Doe",
    title: "Chest X-Ray",
    description: "Follow-up X-ray for seasonal cough.",
    date: "2026-03-15",
    fileType: "image",
    fileUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "r3",
    patientId: "p2",
    patientName: "Jane Smith",
    title: "Allergy Test",
    description: "Comprehensive allergy screening for seasonal allergens.",
    date: "2026-03-10",
    fileType: "pdf",
    fileUrl: "https://pdfobject.com/pdf/sample.pdf"
  }
];
