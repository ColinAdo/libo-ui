"use client"

import { BookDetail } from "@/components/dashboard/books"
import { useRetrieveBookQuery } from "@/redux/features/bookSlice"
import { useWebSocketContext } from "@/hooks/WebSocketContext";
import { useEffect } from "react";

interface Props {
    params: {
        id: string
    }
}

export default function BookPage({ params }: Props) {
    const { lastJsonMessage } = useWebSocketContext();
    const { data: book, refetch } = useRetrieveBookQuery(params.id);

    useEffect(() => {
        refetch();
    }, [lastJsonMessage]);

    if (!book) {
        return null
    }

    return (
        <div className="mt-12">
            <BookDetail book={book} />
        </div>
    );
}

