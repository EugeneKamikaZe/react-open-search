import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import classnames from "classnames";
import { useMemo, useState } from "react";

import { ChangeLimit, TablePagination } from "~/features/Table";
import SortIcon from "~/shared/assets/icons/down.svg";
import { useTable } from "~/shared/lib/hooks/useTable/useTable";
import { Icon } from "~/shared/ui/Icon/Icon";

import s from "./Table.module.scss";

const ContentLoader = () => {
  return (
    <div className={s.isFetching}>
      <div className={s.block}>Loading ...</div>
    </div>
  );
};

interface TableProps<Data> {
  className?: string;
  data?: Data[];
  defaultSortingForColumns: string[];
  columns: ColumnDef<Data, any>[];
  isEmpty?: boolean;
  isFetching?: boolean;
}

export const Table = <Data extends object>({
  className,
  data,
  defaultSortingForColumns,
  columns,
  isEmpty,
  isFetching,
}: TableProps<Data>) => {
  const [sorting, setSorting] = useState<SortingState>(() =>
    defaultSortingForColumns
      ? defaultSortingForColumns.map((item) => ({
          id: item,
          desc: false,
        }))
      : [],
  );

  const { page, optionsLimit } = useTable();

  const tableData = useMemo(() => data || [], [data]);
  const table = useReactTable({
    data: tableData,
    columns,
    columnResizeMode: "onChange",
    state: {
      sorting,
      pagination: {
        pageSize: Number(optionsLimit),
        pageIndex: page,
      },
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
  });

  return (
    <section className={classnames(s.wrapper, [className])}>
      <div className={classnames(s.tableWrapper)}>
        <table
          className={classnames(s.table)}
          style={{ width: table.getCenterTotalSize() }}
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className={classnames(s.thead)}>
                {headerGroup.headers.map((header) => (
                  <th
                    className={classnames(s.th, {
                      [s.isResizingTh]: header.column.getIsResizing(),
                      [s.isSorted]: header.column.getIsSorted(),
                    })}
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    colSpan={header.colSpan}
                    style={{ width: header.getSize() }}
                  >
                    <div className={s.thContent}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {(!isEmpty &&
                        {
                          asc: <Icon Svg={SortIcon} className={s.sortIcon} />,
                          desc: (
                            <Icon
                              Svg={SortIcon}
                              className={classnames(s.rotated, s.sortIcon)}
                            />
                          ),
                        }[header.column.getIsSorted() as string]) ?? (
                        <Icon
                          Svg={SortIcon}
                          className={classnames(s.shadowSortIcon, s.sortIcon)}
                        />
                      )}
                    </div>

                    <div
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className={classnames(s.resizer, {
                        [s.isResizing]: header.column.getIsResizing(),
                      })}
                    />
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className={s.tbody}>
            {!isEmpty ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={classnames(s.td)}
                      style={{
                        width: cell.column.getSize(),
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className={s.emptyTr}>
                <td
                  // @ts-ignore-next-line
                  colSpan="100%"
                  className={classnames(s.td)}
                >
                  Nothing to view
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className={s.controls}>
        <ChangeLimit />

        <TablePagination />
      </div>

      {isFetching && <ContentLoader />}
    </section>
  );
};
