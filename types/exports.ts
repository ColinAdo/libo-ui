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