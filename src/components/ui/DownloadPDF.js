// src/components/DownloadPDF.js
import jsPDF from "jspdf";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

export function DownloadPDF({ content }) {
  const handlePDFDownload = () => {
    const doc = new jsPDF();
    doc.text(content, 10, 10);
    doc.save("output.pdf");
  };

  const handleExcelDownload = () => {
    const worksheet = XLSX.utils.aoa_to_sheet([[content]]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "output.xlsx");
  };

  return (
    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
      <button onClick={handlePDFDownload}>Download PDF</button>
      <button onClick={handleExcelDownload}>Download Excel</button>
    </div>
  );
}
