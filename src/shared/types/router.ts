import { ReactNode } from "react";
import { RouteProps } from "react-router-dom";

export interface NestedProps {
  path: string;
  element: ReactNode;
}

export type AppRoutesProps = RouteProps & {
  nested?: NestedProps[];
};
