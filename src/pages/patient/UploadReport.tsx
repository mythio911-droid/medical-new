import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { FileUp, FileText, Image as ImageIcon, Calendar, Trash2 } from "lucide-react";
import { reports, Report } from "@/data/dummyData";

export default function UploadReport() {
    const [reportList, setReportList] = useState<Report[]>(reports.filter(r => r.patientId === "p1"));
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [file, setFile] = useState<File | null>(null);

    const handleUpload = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !description || !file) {
            toast.error("Please fill all fields and select a file");
            return;
        }

        const newReport: Report = {
            id: `r${Math.random().toString(36).substr(2, 9)}`,
            patientId: "p1",
            patientName: "John Doe",
            title,
            description,
            date,
            fileType: file.type.includes("pdf") ? "pdf" : "image",
            fileUrl: URL.createObjectURL(file), // Temporary URL for demo
        };

        setReportList([newReport, ...reportList]);
        setTitle("");
        setDescription("");
        setFile(null);
        toast.success("Report uploaded successfully! 📁");
    };

    const deleteReport = (id: string) => {
        setReportList(reportList.filter(r => r.id !== id));
        toast.info("Report removed");
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Upload Medical Report</h1>
                <p className="text-muted-foreground">Keep your medical records organized and accessible to your doctors.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Upload Form */}
                <div className="glass-card p-6 rounded-2xl border border-white/20 space-y-6">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <FileUp className="h-5 w-5 text-primary" />
                        New Report
                    </h2>

                    <form onSubmit={handleUpload} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Report Title</label>
                            <Input
                                placeholder="e.g. Annual Blood Test"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="date"
                                    className="pl-10"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Description</label>
                            <Textarea
                                placeholder="Briefly describe the report content..."
                                className="min-h-[100px]"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">File (PDF, JPG, PNG)</label>
                            <div className="border-2 border-dashed border-primary/20 rounded-xl p-8 text-center hover:bg-primary/5 transition-colors cursor-pointer relative">
                                <input
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                                <FileUp className="h-8 w-8 text-primary/40 mx-auto mb-2" />
                                <p className="text-sm text-muted-foreground">
                                    {file ? <span className="text-primary font-medium">{file.name}</span> : "Drag & drop or click to upload"}
                                </p>
                            </div>
                        </div>

                        <Button type="submit" className="w-full h-11 text-base">
                            Upload Report
                        </Button>
                    </form>
                </div>

                {/* Existing Reports List */}
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        Previous Reports
                    </h2>

                    <div className="space-y-4">
                        {reportList.map((report) => (
                            <div
                                key={report.id}
                                className="glass-card p-4 rounded-xl border border-white/10 hover:border-primary/30 transition-all flex items-start gap-4"
                            >
                                <div className={`p-3 rounded-lg ${report.fileType === 'pdf' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'}`}>
                                    {report.fileType === 'pdf' ? <FileText className="h-6 w-6" /> : <ImageIcon className="h-6 w-6" />}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="font-semibold truncate">{report.title}</h3>
                                        <span className="text-xs text-muted-foreground bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                                            {report.date}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                                        {report.description}
                                    </p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <Button variant="outline" size="sm" className="h-8 text-xs" asChild>
                                            <a href={report.fileUrl} target="_blank" rel="noopener noreferrer">View Report</a>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-destructive hover:bg-destructive/10"
                                            onClick={() => deleteReport(report.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {reportList.length === 0 && (
                            <div className="text-center py-12 glass-card rounded-2xl border-dashed border-white/10">
                                <FileText className="h-12 w-12 text-muted-foreground/20 mx-auto mb-4" />
                                <p className="text-muted-foreground font-medium">No reports uploaded yet</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
