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
    useGetCategoriesQuery,
    useGetBooksQuery
} = accountSlice;