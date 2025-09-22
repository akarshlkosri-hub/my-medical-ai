"use client";

import { Button } from "./button";
import jsPDF from "jspdf";

interface Props {
  content: string;
}

export default function DownloadPDF({ content }: Props) {
  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text(content || "No content", 10, 10);
    doc.save("document.pdf");
  };

  return (
    <Button onClick={handleDownload}>Download PDF</Button>
  );
}
