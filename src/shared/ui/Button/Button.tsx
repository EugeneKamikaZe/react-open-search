import classnames from "classnames";
import { ButtonHTMLAttributes, memo, ReactNode } from "react";

import s from "./Button.module.scss";

export type Mods = Record<string, boolean | string | undefined>;

/* eslint-disable */
export enum ButtonTheme {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}
/* eslint-enable */

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  theme?: ButtonTheme;
  isDisabled?: boolean;
}

export const Button = memo((props: ButtonProps) => {
  const {
    className,
    children,
    theme = ButtonTheme.PRIMARY,
    isDisabled,
    ...otherProps
  } = props;

  const mods: Mods = {
    [s[theme]]: true,
    [s.disabled]: isDisabled,
  };

  return (
    <button
      type="button"
      className={classnames("btn", mods, className)}
      disabled={isDisabled}
      {...otherProps}
    >
      {children}
    </button>
  );
});
