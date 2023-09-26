import classnames from "classnames";
import { NavLink } from "react-router-dom";

import { getRouteMain } from "~/shared/const/router";
import { Button } from "~/shared/ui/Button/Button";

import s from "./ErrorPage.module.scss";

interface ErrorPageProps {
  className?: string;
}

export const ErrorPage = ({ className }: ErrorPageProps) => {
  const reloadPage = () => {
    //  eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  return (
    <div className={classnames(s.wrapper, className)}>
      <Button className={s.btn} onClick={reloadPage}>
        Reload page
      </Button>

      <NavLink to={getRouteMain()}>Go home</NavLink>
    </div>
  );
};
