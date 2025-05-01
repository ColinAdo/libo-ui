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
    }),
});

export const {
    useGetBooksQuery,
    useRetrieveBookQuery,
    useGetCategoriesQuery,
    useRetrieveCategoryBookQuery,
} = accountSlice;