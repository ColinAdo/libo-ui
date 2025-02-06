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
    }),
});

export const {
    useGetCategoriesQuery
} = accountSlice;