"use client"

import { BookDetail } from "@/components/dashboard/books"
import { useRetrieveBookQuery } from "@/redux/features/bookSlice"

interface Props {
    params: {
        id: string
    }
}

export default function BookPage({ params }: Props) {
    const { data: book } = useRetrieveBookQuery(params.id);

    if (!book) {
        return null
    }

    return (
        <div className="mt-12">
            <BookDetail book={book} />
        </div>
    );
}

