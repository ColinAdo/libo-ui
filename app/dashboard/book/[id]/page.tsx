import { BookDetail } from "@/components/dashboard/books"
import { Book } from "@/types/exports"

// This is a mock function to simulate fetching book data
// In a real app, you'd fetch this data from an API or database
async function getBookById(id: string): Promise<Book> {
    // Simulating an API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
        id,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        imageUrl: "/assets/demo.jpeg",
        description:
            "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.",
        likeCount: 1024,
        bookmarkCount: 512,
    }
}

export default async function BookPage({ params }: { params: { id: string } }) {
    const book = await getBookById(params.id)

    return (
        <div className="mt-12">

            <BookDetail book={book} />
        </div>
    );
}

