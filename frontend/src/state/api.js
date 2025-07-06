import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mentalHealthApi = createApi({
  reducerPath: "mentalHealthApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    predict: builder.mutation({
      query: (formData) => ({
        url: "/predict",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});
export const { usePredictMutation } = mentalHealthApi;
