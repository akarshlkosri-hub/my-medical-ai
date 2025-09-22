"use client";

import { Button } from "./button";
import html2canvas from "html2canvas";

interface Props {
  elementId: string;
}

export default function DownloadImage({ elementId }: Props) {
  const handleDownload = async () => {
    const element = document.getElementById(elementId);
    if (!element) return alert("Element not found");

    const canvas = await html2canvas(element);
    const dataURL = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "screenshot.png";
    link.click();
  };

  return (
    <Button onClick={handleDownload}>Download Image</Button>
  );
}
