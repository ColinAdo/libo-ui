import { apiSlice } from "../services/apiSlice";
import {
    CategoryType,
} from "@/types/exports";

const accountSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getCategories: builder.query<CategoryType[], void>({
            query: () => ({
                url: "/categories/",
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
    useGetCategoriesQuery
} = accountSlice;