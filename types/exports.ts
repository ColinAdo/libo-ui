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

export interface Book {
    id: string
    title: string
    author: string
    imageUrl: string
    description: string
    likeCount: number
    bookmarkCount: number
}
