import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rtkApi = createApi({
  reducerPath: "api",
  refetchOnMountOrArgChange: true,
  tagTypes: ["Comments"],
  baseQuery: fetchBaseQuery({
    baseUrl: __API__,
  }),
  // eslint-disable-next-line
  endpoints: (builder) => ({}),
});
