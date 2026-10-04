import type { Metadata } from "next";
import {
  Download,
  Eye,
  FileVideo,
  FileCode,
  FileText,
  Archive,
  Image,
  Clock,
  Filter,
} from "lucide-react";

export const metadata: Metadata = { title: "Files & Deliverables" };

const categories = ["All", "Videos", "Code", "Documents", "Design"];

const files = [
  {
    id: "f1",
    name: "chatbot_demo_walkthrough.mp4",
    type: "video",
    category: "Videos",
    size: "42.3 MB",
    order: "ORD-2024-007",
    date: "Oct 2, 2024",
    icon: FileVideo,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    id: "f2",
    name: "chatbot_source_code_v2.zip",
    type: "archive",
    category: "Code",
    size: "8.7 MB",
    order: "ORD-2024-007",
    date: "Oct 1, 2024",
    icon: Archive,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    id: "f3",
    name: "integration_guide.pdf",
    type: "document",
    category: "Documents",
    size: "2.1 MB",
    order: "ORD-2024-007",
    date: "Oct 1, 2024",
    icon: FileText,
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
  },
  {
    id: "f4",
    name: "n8n_workflow_export.json",
    type: "code",
    category: "Code",
    size: "156 KB",
    order: "ORD-2024-005",
    date: "Oct 3, 2024",
    icon: FileCode,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    id: "f5",
    name: "analytics_dashboard_design.fig",
    type: "design",
    category: "Design",
    size: "5.4 MB",
    order: "ORD-2024-003",
    date: "Sep 22, 2024",
    icon: Image,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: "f6",
    name: "data_pipeline_documentation.pdf",
    type: "document",
    category: "Documents",
    size: "3.8 MB",
    order: "ORD-2024-003",
    date: "Sep 25, 2024",
    icon: FileText,
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
  },
];

export default function FilesPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Files & Deliverables</h1>
          <p className="text-sm text-slate-500 mt-0.5">All project deliverables in one secure place</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              cat === "All"
                ? "bg-violet-600 text-white"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Files", value: `${files.length}` },
          { label: "Total Size", value: "62.5 MB" },
          { label: "Latest Upload", value: "Oct 3" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-slate-100 px-4 py-3 text-center">
            <div className="text-lg font-bold text-slate-900">{s.value}</div>
            <div className="text-xs text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Files Table */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900 text-sm">All Files</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50/70 transition-colors group"
            >
              {/* Icon */}
              <div className={`w-10 h-10 rounded-xl ${file.iconBg} flex items-center justify-center flex-shrink-0`}>
                <file.icon className={`w-5 h-5 ${file.iconColor}`} />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">{file.name}</p>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-xs text-slate-400">{file.size}</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs text-slate-400 font-mono">{file.order}</span>
                  <span className="text-slate-300">·</span>
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock className="w-3 h-3" />{file.date}
                  </span>
                </div>
              </div>

              {/* Category badge */}
              <span className="hidden sm:inline text-xs font-medium bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
                {file.category}
              </span>

              {/* Actions */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 rounded-lg text-slate-400 hover:bg-violet-50 hover:text-violet-600 transition-colors" title="Preview">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg text-slate-400 hover:bg-[#F56962]/10 hover:text-[#F56962] transition-colors" title="Download">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}