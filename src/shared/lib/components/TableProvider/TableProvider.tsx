import { ReactNode, useMemo, useState } from "react";

import { TableContext } from "../../context/tableContext";

interface TableProviderProps {
  children: ReactNode;
}

export const TableProvider = ({ children }: TableProviderProps) => {
  const [optionsLimit, setOptionsLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [postsCount, setPostsCount] = useState(0);
  const [postsTotalCount, setPostsTotalCount] = useState(0);
  const [query, setQuery] = useState("");

  const defaultProps = useMemo(
    () => ({
      setOptionsLimit,
      optionsLimit,
      setPage,
      page,
      setPostsCount,
      postsCount,
      setPostsTotalCount,
      postsTotalCount,
      setQuery,
      query,
    }),
    [optionsLimit, page, postsCount, postsTotalCount, query],
  );

  return (
    <TableContext.Provider value={defaultProps}>
      {children}
    </TableContext.Provider>
  );
};
