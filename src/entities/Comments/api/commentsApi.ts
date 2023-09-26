import { rtkApi } from "~/shared/api/rtkApi";

import type { CommentsSchema } from "../types/CommentsSchema";

interface CommentsListArgs {
  limit: number;
  page: number;
  filter: string;
}

const commentsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getCommentsList: build.query<
      { apiResponse: CommentsSchema[]; totalCount: number },
      CommentsListArgs
    >({
      query: (arg) => {
        const { limit, page, filter = "" } = arg;
        return {
          url: `/comments?_limit=${limit}&_page=${page}&q=${filter}`,
          params: { limit, page },
        };
      },
      providesTags: ["Comments"],
      transformResponse(apiResponse: CommentsSchema[], meta) {
        return {
          apiResponse,
          totalCount: Number(meta?.response?.headers.get("X-Total-Count")),
        };
      },
    }),
    getComment: build.query<CommentsSchema, string>({
      query: (id) => ({
        url: `/comments/${id}`,
      }),
    }),
  }),
});

export const useGetCommentsList = commentsApi.useGetCommentsListQuery;
export const useLazyGetCommentsList = commentsApi.useLazyGetCommentsListQuery;
export const useGetComment = commentsApi.useGetCommentQuery;
export const useLazyGetComment = commentsApi.useLazyGetCommentQuery;
