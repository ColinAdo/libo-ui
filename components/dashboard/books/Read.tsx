"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Document, Page, pdfjs } from "react-pdf";
import { ScrollArea } from "@/components/ui/scroll-area";

// Set up the worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PDFChat() {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [chat, setChat] = useState<Array<{ role: "user" | "ai"; content: string }>>([]);
    const [input, setInput] = useState("");

    const pdfUrl = "/assets/zero.pdf";

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (input.trim()) {
            setChat([...chat, { role: "user", content: input }]);

            // Simulate AI response
            setTimeout(() => {
                setChat((prev) => [...prev, { role: "ai", content: `You said: ${input}` }]);
            }, 500);
            setInput("");
        }
    };

    return (
        <div className="flex h-screen">
            {/* Left: PDF Viewer */}
            <div className="w-1/2 p-4 border-r">
                <ScrollArea className="h-[calc(100vh-100px)]">
                    <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
                        {Array.from(new Array(numPages), (el, index) => (
                            <Page key={`page_${index + 1}`} pageNumber={index + 1} width={450} />
                        ))}
                    </Document>
                </ScrollArea>
            </div>

            {/* Right: Chat Interface */}
            <div className="w-1/2 p-4 flex flex-col">
                <ScrollArea className="flex-grow mb-4">
                    {chat.map((message, index) => (
                        <div key={index} className={`mb-2 ${message.role === "user" ? "text-right" : "text-left"}`}>
                            <span
                                className={`inline-block p-2 rounded-lg ${message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200"
                                    }`}
                            >
                                {message.content}
                            </span>
                        </div>
                    ))}
                </ScrollArea>
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <Input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask a question about the PDF..."
                        className="flex-grow"
                    />
                    <Button type="submit">Send</Button>
                </form>
            </div>
        </div>
    );
}
