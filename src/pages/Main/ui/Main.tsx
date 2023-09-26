import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useGetCommentsList } from "~/entities/Comments";
import { getRouteMainView } from "~/shared/const/router";
import { TableProvider } from "~/shared/lib/components/TableProvider/TableProvider";
import { useTable } from "~/shared/lib/hooks/useTable/useTable";
import { Button, ButtonTheme } from "~/shared/ui/Button/Button";

import s from "./Main.module.scss";

const Main = () => {
  const navigate = useNavigate();

  const { changePostsCount, changePostsTotalCount, optionsLimit, page, query } =
    useTable();
  const {
    data: commentsList,
    isLoading,
    isSuccess,
    isFetching,
    currentData,
  } = useGetCommentsList({ limit: optionsLimit, page: page, filter: query });

  useEffect(() => {
    if (isSuccess && commentsList) {
      changePostsTotalCount(commentsList.totalCount);
      changePostsCount(commentsList.apiResponse.length);
    }
  }, [changePostsCount, changePostsTotalCount, commentsList, isSuccess]);

  return (
    <>
      <div className={s.buttons}>
        <Button onClick={() => navigate(getRouteMainView("raw"))}>Json</Button>
        <Button
          theme={ButtonTheme.SECONDARY}
          onClick={() => navigate(getRouteMainView("table"))}
        >
          Table
        </Button>
      </div>

      <Outlet
        context={{
          commentsList,
          isLoading,
          isSuccess,
          isFetching,
          currentData,
        }}
      />
    </>
  );
};

const MainWithProvider = () => {
  return (
    <TableProvider>
      <Main />
    </TableProvider>
  );
};
export default MainWithProvider;
