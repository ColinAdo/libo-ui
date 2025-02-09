export type UserType = {
    id: string;
    username: string;
    email: string;
    is_staff: boolean;
}

export type AccountType = {
    id: string;
    name: string;
    description: string;
    amount: number;
};

export type Posts = {
    id: string;
    fileUrl: string;
    likes_count: number;
    bookmark_count: number;
    description: string;
};

export type CategoryType = {
    id: number;
    title: string;
    book_count: number;
}

interface Likes {
    id: string;
    user: string;
    book: string;
}
interface Bookmarks {
    id: string;
    user: string;
    book: string;
}

interface Readers {
    id: string;
    username: string;
}

export type BookType = {
    id: string;
    title: string;
    author: string;
    pdf_file: string;
    cover_image: string;
    description: string;
    likes: Likes[];
    readers: Readers[];
    bookmarks: Bookmarks[];
    likes_count: number;
    readers_count: number;
    bookmarks_count: number;
}
