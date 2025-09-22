"use client";

import { Button } from "./button";
import * as XLSX from "xlsx";

interface Props {
  content: string;
}

export default function DownloadExcel({ content }: Props) {
  const handleDownload = () => {
    const ws = XLSX.utils.aoa_to_sheet([[content]]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "data.xlsx");
  };

  return (
    <Button onClick={handleDownload}>Download Excel</Button>
  );
}
