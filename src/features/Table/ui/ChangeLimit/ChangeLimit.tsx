import classnames from "classnames";

import { useTable } from "~/shared/lib/hooks/useTable/useTable";

import s from "./ChangeLimit.module.scss";

interface ChangeLimitProps {
  className?: string;
}

export const ChangeLimit = ({ className }: ChangeLimitProps) => {
  const { changeLimit, postsCount, postsTotalCount, optionsLimit } = useTable();

  const handleChange = (value: string) => {
    changeLimit(+value);
  };

  return (
    <div className={classnames(s.ChangeLimit, {}, [className])}>
      <p className={s.itemsCount}>Limit</p>

      <select
        name="category"
        defaultValue={optionsLimit}
        onChange={(event) => handleChange(event.target.value)}
      >
        <option value="" disabled hidden>
          {optionsLimit}
        </option>
        <option id="1" value="5">
          5
        </option>
        <option id="2" value="10">
          10
        </option>
        <option id="3" value="20">
          20
        </option>
        <option id="4" value="50">
          50
        </option>
      </select>

      <div className={classnames(s.itemsCount, s.border)}>
        Posts {postsCount} of {postsTotalCount}
      </div>
    </div>
  );
};
