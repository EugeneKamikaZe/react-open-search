import { createContext, Dispatch, SetStateAction } from "react";

export interface TableContextProps {
  optionsLimit: number;
  page: number;
  setOptionsLimit?: Dispatch<SetStateAction<number>>;
  setPage?: Dispatch<SetStateAction<number>>;
  postsCount: number;
  setPostsCount?: Dispatch<SetStateAction<number>>;
  postsTotalCount: number;
  setPostsTotalCount?: Dispatch<SetStateAction<number>>;
  query: string;
  setQuery?: Dispatch<SetStateAction<string>>;
}

export const TableContext = createContext<TableContextProps>({
  optionsLimit: 10,
  page: 1,
  query: "",
  postsCount: 0,
  postsTotalCount: 0,
});
