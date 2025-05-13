import { apiSlice } from "../services/apiSlice";
import {
    CategoryType,
    BookType
} from "@/types/exports";

const accountSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getCategories: builder.query<CategoryType[], void>({
            query: () => ({
                url: "/categories/",
            }),
        }),
        getLikedBooks: builder.query<BookType[], void>({
            query: () => ({
                url: "/liked/books/",
            }),
        }),
        getBookmarkedBooks: builder.query<BookType[], void>({
            query: () => ({
                url: "/bookmarked/books/",
            }),
        }),
        getBooks: builder.query<BookType[], void>({
            query: () => ({
                url: "/books/",
            }),
        }),
        retrieveBook: builder.query<BookType, string>({
            query: (bookId) => ({
                url: `/books/${bookId}/`,
            }),
        }),

        retrieveCategoryBook: builder.query<BookType[], string>({
            query: (bookId) => ({
                url: `/books/category/${bookId}/`,
            }),
        }),
        uploadBook: builder.mutation({
            query: (
                {
                    category,
                    author,
                    title,
                    cover_image,
                    pdf_file,
                    description

                }
            ) => ({
                url: "/posts/",
                method: "POST",
                body: {
                    category,
                    author,
                    title,
                    cover_image,
                    pdf_file,
                    description
                },
            }),
        }),

        uploadPdf: builder.mutation({
            query: (url) => ({
                url: "/chatpdf/add/",
                method: "POST",
                body: { url },
            }),
        }),
        askAi: builder.mutation({
            query: ({ sourceId, question }) => ({
                url: "/chatpdf/ask/",
                method: "POST",
                body: { sourceId, question },
            }),
        }),
    }),
});

export const {
    useGetBooksQuery,
    useAskAiMutation,
    useRetrieveBookQuery,
    useGetCategoriesQuery,
    useRetrieveCategoryBookQuery,
    useGetBookmarkedBooksQuery,
    useGetLikedBooksQuery,
    useUploadPdfMutation,
} = accountSlice;