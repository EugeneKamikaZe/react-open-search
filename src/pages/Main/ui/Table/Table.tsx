import { createColumnHelper } from "@tanstack/react-table";
import { ChangeEvent, useMemo } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import type { CommentsSchema } from "~/entities/Comments";
import { Search } from "~/features/Search";
import { getRouteDetail } from "~/shared/const/router";
import { useDebounce } from "~/shared/lib/hooks/useDebounce/useDebounce";
import { useTable } from "~/shared/lib/hooks/useTable/useTable";
import { OutletProps } from "~/shared/types/mainOutletProps";
import { Button } from "~/shared/ui/Button/Button";
import { Table } from "~/widgets/Table";

import s from "./Table.module.scss";

interface TableProps {
  className?: string;
}

export const MainTable = ({ className }: TableProps) => {
  const { commentsList, isLoading, isSuccess, isFetching, currentData } =
    useOutletContext<OutletProps>();

  const { changeQuery } = useTable();

  const navigate = useNavigate();
  const handleNavigate = (id: number) => () => {
    navigate(getRouteDetail(String(id)));
  };

  const columnHelper = createColumnHelper<CommentsSchema>();
  const columns = useMemo(
    () => [
      columnHelper.accessor("postId", {
        header: () => "Post Id",
        cell: (info) => info.renderValue(),
        size: 50,
      }),
      columnHelper.accessor("id", {
        header: () => "Id",
        cell: (info) => info.renderValue(),
        size: 50,
      }),
      columnHelper.accessor("name", {
        header: () => "Name",
        cell: (info) => info.renderValue(),
        size: 100,
      }),
      columnHelper.accessor("email", {
        header: () => "Email",
        cell: (info) => info.renderValue(),
        size: 100,
      }),
      columnHelper.accessor("body", {
        header: () => "Comments Body",
        cell: (info) => info.renderValue(),
      }),
      // @ts-ignore
      columnHelper.accessor("detail", {
        header: () => "Detail",
        cell: ({ row }) => (
          <Button onClick={handleNavigate(row.original.id)}>
            Go to detail
          </Button>
        ),
        size: 50,
        enableSorting: false,
      }),
    ],
    [columnHelper],
  );

  const debouncedQuery = useDebounce(
    (value: string) => changeQuery(value),
    500,
  );
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    debouncedQuery(event.target.value);
  };

  if (isLoading) {
    return <div>Loading comments...</div>;
  }

  return (
    <>
      <Search className={s.search} OnChange={handleChange} />

      <Table<CommentsSchema>
        defaultSortingForColumns={["id"]}
        data={isSuccess ? commentsList?.apiResponse : []}
        isEmpty={commentsList?.totalCount === 0}
        isFetching={isFetching && !currentData}
        columns={columns}
      />
    </>
  );
};
