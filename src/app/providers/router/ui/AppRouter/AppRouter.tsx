import { memo, ReactNode, Suspense, useCallback } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { routeConfig } from "~/app/providers/router/config/routerConfig";
import { getRouteMain } from "~/shared/const/router";
import { AppRoutesProps } from "~/shared/types/router";

const Children = ({ node }: { node: ReactNode }) => (
  <Suspense fallback="Loading ...">{node}</Suspense>
);

const AppRouter = () => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const { path, element, nested } = route;

    if (nested) {
      return (
        <Route path={path} element={<Children node={element} />} key={path}>
          {nested.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={<Children node={element} />}
            />
          ))}
        </Route>
      );
    }

    return (
      <Route key={path} path={path} element={<Children node={element} />} />
    );
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to={getRouteMain()} />} />

      {Object.values(routeConfig).map(renderWithWrapper)}
    </Routes>
  );
};

export default memo(AppRouter);
