import { useContext, useMemo } from "react";

import { TableContext } from "../../context/tableContext";

interface UseTableProps {
  optionsLimit: number;
  changeLimit: (key: number) => void;
  page: number;
  pages: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  prevPage: () => void;
  nextPage: () => void;
  pageNumber: (key: number) => void;
  changePostsCount: (key: number) => void;
  changePostsTotalCount: (key: number) => void;
  postsCount: number;
  postsTotalCount: number;
  query: string;
  changeQuery: (key: string) => void;
}

export function useTable(): UseTableProps {
  const {
    optionsLimit,
    setOptionsLimit,
    setPage,
    page,
    postsCount,
    postsTotalCount,
    setPostsCount,
    setPostsTotalCount,
    query,
    setQuery,
  } = useContext(TableContext);

  const changeQuery = (query: string) => {
    setQuery?.(query);
    setPage?.(1);
  };

  const changePostsTotalCount = (postsTotal: number) => {
    setPostsTotalCount?.(postsTotal);
  };

  const changePostsCount = (posts: number) => {
    setPostsCount?.(posts);
  };

  const pages = useMemo(() => {
    if (postsTotalCount === 0) {
      return 1;
    }

    return Math.ceil(postsTotalCount / Number(optionsLimit));
  }, [optionsLimit, postsTotalCount]);

  const changeLimit = (number: number) => {
    setOptionsLimit?.(number);
    setPage?.(1);
  };

  const isFirstPage = page === 1;
  const isLastPage = page === pages;

  const prevPage = () => {
    if (isFirstPage) {
      return;
    }

    setPage?.((page) => page - 1);
  };

  const nextPage = () => {
    if (isLastPage) {
      return;
    }
    setPage?.((page) => page + 1);
  };

  const pageNumber = (number: number) => {
    setPage?.(number);
  };

  return {
    optionsLimit,
    page,
    pages,
    isFirstPage,
    isLastPage,
    postsCount,
    postsTotalCount,
    query,
    changeLimit,
    prevPage,
    nextPage,
    pageNumber,
    changePostsCount,
    changePostsTotalCount,
    changeQuery,
  };
}
