"use client";

import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface DownloadPDFProps {
  content?: string;
}

export default function DownloadPDF({ content }: DownloadPDFProps) {
  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text(content || "No content available", 10, 10);
    doc.save("infographic.pdf");
  };

  return (
    <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleDownload}>
      Download PDF
    </Button>
  );
}
