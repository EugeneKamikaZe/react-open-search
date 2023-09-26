import type { CommentsSchema } from "~/entities/Comments";

export interface OutletProps {
  commentsList: { apiResponse: CommentsSchema[]; totalCount: number };
  isLoading: boolean;
  isSuccess: boolean;
  isFetching: boolean;
  currentData: CommentsSchema[];
}
