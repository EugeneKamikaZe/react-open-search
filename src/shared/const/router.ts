/* eslint-disable */
export enum AppRoutes {
  MAIN = "main",
  DETAIL = "detail",

  // 404
  NOT_FOUND = "not_found",
}

export enum AdditionalRoutes {
  MAIN_RAW = "raw",
  MAIN_TABLE = "table",
}
/* eslint-enable */

export const getRouteMain = () => `/main`;
export const getRouteMainView = (view: "raw" | "table") => view;
export const getRouteDetail = (id: string) => `/detail/${id}`;
