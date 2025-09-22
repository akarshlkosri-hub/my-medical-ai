"use client";

import { Button } from "./button";
import html2canvas from "html2canvas";

interface Props {
  content: string;
  layout?: string;
}

export default function DownloadInfographic({ content, layout }: Props) {
  const handleDownload = async () => {
    // Create temporary element for layout
    const container = document.createElement("div");
    container.style.padding = "20px";
    container.style.background = "#fff";
    container.style.border = "1px solid #ccc";
    container.style.fontFamily = "Arial, sans-serif";
    container.innerHTML = `<h2>${layout || "Infographic"}</h2><p>${content}</p>`;
    document.body.appendChild(container);

    const canvas = await html2canvas(container);
    const dataURL = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "infographic.png";
    link.click();

    document.body.removeChild(container);
  };

  return (
    <Button onClick={handleDownload}>Download Infographic</Button>
  );
}
