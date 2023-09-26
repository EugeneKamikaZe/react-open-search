import classNames from "classnames";
import { ChangeEvent } from "react";

import s from "./Search.module.scss";

interface SearchProps {
  className?: string;
  OnChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Search = ({ className, OnChange }: SearchProps) => {
  return (
    <div className={classNames(s.Search, {}, [className])}>
      <input
        type="text"
        onChange={OnChange}
        placeholder="Type to search ..."
        className={s.input}
      />
    </div>
  );
};
