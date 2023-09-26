import { Detail } from "~/pages/Detail";
import { Main, MainTable, Raw } from "~/pages/Main";
import { NotFound } from "~/pages/NotFound";
import {
  AppRoutes,
  getRouteDetail,
  getRouteMain,
  getRouteMainView,
} from "~/shared/const/router";
import { AppRoutesProps } from "~/shared/types/router";

// <Route path={getRouteMain()} element={<Main />}>
//     <Route path={getRouteMainView('raw')} element={<Raw />}/>
//     <Route path={getRouteMainView('table')} element={<Table />}/>
// </Route>

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    path: getRouteMain(),
    element: <Main />,
    nested: [
      {
        path: getRouteMainView("raw"),
        element: <Raw />,
      },
      {
        path: getRouteMainView("table"),
        element: <MainTable />,
      },
    ],
  },
  [AppRoutes.DETAIL]: {
    path: getRouteDetail(":id"),
    element: <Detail />,
  },
  // 404
  [AppRoutes.NOT_FOUND]: {
    path: "*",
    element: <NotFound />,
  },
};
