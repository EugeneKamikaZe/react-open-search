import classnames from "classnames";
import { FC, memo, SVGProps } from "react";

import s from "./Icon.module.scss";

interface IconProps {
  className?: string;
  Svg: FC<SVGProps<SVGSVGElement>>;
}

export const Icon = memo((props: IconProps) => {
  const { className, Svg } = props;

  return <Svg className={classnames(s.wrapper, "icon", className)} />;
});
