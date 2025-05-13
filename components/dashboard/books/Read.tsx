"use client";

import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { pdfjs } from "react-pdf";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRetrieveBookQuery } from "@/redux/features/bookSlice";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useAskAiMutation } from "@/redux/features/bookSlice";
import { toast } from "sonner";
import { useWebSocketContext } from "@/hooks/WebSocketContext";
import ReactMarkdown from "react-markdown";

// Set up the worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface Props {
    id: string;
}

export default function PDFChat({ id }: Props) {
    const [askAi, { isLoading }] = useAskAiMutation();
    const searchParams = useSearchParams();
    const sourceId = searchParams.get("sourceId");
    const { lastJsonMessage } = useWebSocketContext();

    const { data: book } = useRetrieveBookQuery(id);
    const [chat, setChat] = useState<Array<{ role: "user" | "ai"; content: string }>>([]);
    const [input, setInput] = useState("");

    const topRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (lastJsonMessage?.type === "chatpdf_response") {
            const message = lastJsonMessage.message;

            // Example: Update chat state
            setChat((prev) => [...prev, { role: "ai", content: message }]);

            console.log("AI Response:", message);
        }
    }, [lastJsonMessage]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!input.trim()) return;

        // Show user's question immediately
        setChat((prev) => [...prev, { role: "user", content: input }]);

        askAi({ sourceId, question: input })
            .unwrap()
            .then(() => {
                setInput("");
            })
            .catch((error) => {
                toast.error("Failed to load AI response. Please try again.");
                console.error("Error:", error);
            });
    };

    const scrollToTop = () => topRef.current?.scrollIntoView({ behavior: "smooth" });
    const scrollToBottom = () => bottomRef.current?.scrollIntoView({ behavior: "smooth" });

    return (
        <div className="flex flex-col md:flex-row h-screen">
            <div ref={topRef} />

            {/* PDF Viewer */}
            <div className="md:w-[60%] w-full border-b md:border-b-0 md:border-r p-4">
                <h2 className="text-lg font-semibold mb-2">{book?.title}</h2>
                {book?.pdf_file && (
                    <embed
                        src={`${book.pdf_file}#toolbar=0&navpanes=0&scrollbar=0`}
                        width="100%"
                        height="600px"
                        type="application/pdf"
                        className="rounded border"
                    />
                )}
            </div>

            {/* Chat Interface */}
            <div className="md:w-[40%] w-full p-4 flex flex-col">
                <ScrollArea className="flex-grow mb-4 h-[300px] md:h-auto overflow-y-auto">

                    {chat.map((message, index) => (
                        <div key={index} className={`mb-2 ${message.role === "user" ? "text-right" : "text-left"}`}>
                            <div
                                className={`prose prose-sm dark:prose-invert p-2 rounded-lg inline-block max-w-[80%] ${message.role === "user" ? "bg-gray-100 dark:bg-gray-700 dark:text-white" : " "
                                    }`}
                            >
                                <ReactMarkdown>{message.content}</ReactMarkdown>
                            </div>
                        </div>
                    ))}


                    <div ref={bottomRef} />
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

            {/* Toggle Buttons */}
            <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
                <Button variant="secondary" onClick={scrollToTop} size="icon">
                    <ArrowUp />
                </Button>
                <Button variant="secondary" onClick={scrollToBottom} size="icon">
                    <ArrowDown />
                </Button>
            </div>
        </div>
    );
}

