"use client";

import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";

interface DownloadImageProps {
  elementId: string; // jisko capture karna hai
}

export default function DownloadImage({ elementId }: DownloadImageProps) {
  const handleDownload = async () => {
    const element = document.getElementById(elementId);
    if (!element) return alert("Element not found!");

    try {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "infographic.png";
      link.click();
    } catch (err) {
      console.error(err);
      alert("Error generating image");
    }
  };

  return (
    <Button className="w-full bg-purple-600 hover:bg-purple-700 mt-2" onClick={handleDownload}>
      Download Image
    </Button>
  );
}
