"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import DownloadPDF from "../components/DownloadPDF";
import DownloadExcel from "../components/DownloadExcel";
import DownloadImage from "../components/DownloadImage";

export default function Home() {
  const [role, setRole] = useState("");
  const [subRole, setSubRole] = useState("");
  const [taskType, setTaskType] = useState("");
  const [taskInput, setTaskInput] = useState("");
  const [layout, setLayout] = useState("");
  const [aiResult, setAiResult] = useState("");

  const handleGenerate = async () => {
    if (!taskInput) return alert("Please enter a task!");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: taskInput }),
      });
      const data = await res.json();
      setAiResult(data.result);
    } catch (err) {
      console.error(err);
      alert("Error generating response");
    }
  };

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center">Medical AI Webapp</h1>

        {/* Role Selection */}
        <Card>
          <CardContent className="space-y-4 p-4">
            <h2 className="font-semibold">Role</h2>
            <Select onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Hospital/Clinic Administration</SelectItem>
                <SelectItem value="assistant">AI Assistant</SelectItem>
                <SelectItem value="other">Other (specify)</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* SubRole */}
        {role === "assistant" && (
          <Card>
            <CardContent className="space-y-4 p-4">
              <h2 className="font-semibold">Specialization</h2>
              <Select onValueChange={setSubRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose Specialization" />
                </SelectTrigger>
                <SelectContent className="max-h-60 overflow-y-auto">
                  <SelectItem value="pediatrics">Pediatrics</SelectItem>
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="neurology">Neurology</SelectItem>
                  <SelectItem value="oncology">Oncology</SelectItem>
                  <SelectItem value="orthopedics">Orthopedics</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        )}

        {/* Task Type */}
        <Card>
          <CardContent className="space-y-4 p-4">
            <h2 className="font-semibold">Task Type</h2>
            <Select onValueChange={setTaskType}>
              <SelectTrigger>
                <SelectValue placeholder="Select Task Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="task">Task</SelectItem>
                <SelectItem value="specify">Specify</SelectItem>
                <SelectItem value="infographics">Infographics</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Task Input */}
        {taskType && (
          <Card>
            <CardContent className="space-y-4 p-4">
              <h2 className="font-semibold">Task Input</h2>
              <Textarea
                placeholder="Describe your task here..."
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
              />
            </CardContent>
          </Card>
        )}

        {/* Infographic Layout */}
        {taskType === "infographics" && (
          <Card>
            <CardContent className="space-y-4 p-4">
              <h2 className="font-semibold">Infographic Layout</h2>
              <Select onValueChange={setLayout}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose Layout" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="circular">Circular Layout</SelectItem>
                  <SelectItem value="grid">Grid Layout</SelectItem>
                  <SelectItem value="flowchart">Flowchart Layout</SelectItem>
                  <SelectItem value="timeline">Timeline Layout</SelectItem>
                  <SelectItem value="pyramid">Pyramid Layout</SelectItem>
                  <SelectItem value="tree">Hierarchy / Tree Layout</SelectItem>
                  <SelectItem value="comparison">Comparison Layout</SelectItem>
                  <SelectItem value="cycle">Cycle Layout</SelectItem>
                  <SelectItem value="dashboard">Dashboard / Icon Cluster</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        )}

        {/* Preview Section */}
        <Card>
          <CardContent className="space-y-4 p-4">
            <h2 className="font-semibold">Preview / AI Result</h2>
            <div id="result-content" className="p-4 border rounded bg-white">
              <p><strong>Role:</strong> {role}</p>
              {subRole && <p><strong>Specialization:</strong> {subRole}</p>}
              <p><strong>Task Type:</strong> {taskType}</p>
              {taskInput && <p><strong>Task Input:</strong> {taskInput}</p>}
              {layout && <p><strong>Layout:</strong> {layout}</p>}
              {aiResult && <p><strong>AI Result:</strong> {aiResult}</p>}
            </div>

            <Button className="w-full" onClick={handleGenerate}>Generate Result</Button>

            {/* Download Buttons */}
            <DownloadPDF content={aiResult || taskInput} />
            <DownloadExcel content={aiResult || taskInput} />
            <DownloadImage elementId="result-content" />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
