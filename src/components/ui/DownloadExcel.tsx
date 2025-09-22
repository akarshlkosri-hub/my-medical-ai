"use client";

import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface DownloadExcelProps {
  content?: string;
}

export default function DownloadExcel({ content }: DownloadExcelProps) {
  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet([
      { Task: content || "No content available" }
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), "infographic.xlsx");
  };

  return (
    <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-2" onClick={handleDownload}>
      Download Excel
    </Button>
  );
}
