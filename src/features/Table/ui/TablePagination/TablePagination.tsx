import classnames from "classnames";
import { useEffect, useMemo, useState } from "react";

import ArrowIcon from "~/shared/assets/icons/left.svg";
import { useTable } from "~/shared/lib/hooks/useTable/useTable";
import { Button } from "~/shared/ui/Button/Button";
import { Icon } from "~/shared/ui/Icon/Icon";

import s from "./TablePagination.module.scss";

interface TablePaginationProps {
  className?: string;
  maxTrackElements?: number;
  isModernStyle?: boolean;
}

export const TablePagination = (props: TablePaginationProps) => {
  const { className, isModernStyle, maxTrackElements = 5 } = props;

  const {
    pages,
    isLastPage,
    isFirstPage,
    pageNumber,
    nextPage,
    prevPage,
    page,
    optionsLimit,
  } = useTable();

  const pagesArr = useMemo(
    () => [...Array(pages)].map((_, i) => i + 1),
    [pages],
  );

  const [pagesMaxCountArr, setPagesMaxCountArr] = useState<number[]>([]);

  // Refactor
  useEffect(() => {
    if (pages > maxTrackElements) {
      const arrayPart = pagesArr.slice(
        page - Math.ceil(maxTrackElements / 2),
        maxTrackElements + page - Math.ceil(maxTrackElements / 2),
      );

      if (page > Math.floor(maxTrackElements / 2)) {
        setPagesMaxCountArr(arrayPart);
      } else {
        setPagesMaxCountArr([...Array(maxTrackElements)].map((_, i) => i + 1));
      }

      if (page >= pages - Math.floor(maxTrackElements / 2)) {
        setPagesMaxCountArr(pagesArr.slice(-maxTrackElements));
      }
    } else {
      setPagesMaxCountArr(pagesArr);
    }
  }, [maxTrackElements, page, pages, pagesArr]);

  return (
    <div
      className={classnames(
        s.TablePagination,
        isModernStyle ? s.modern : s.classic,
        [className],
      )}
    >
      <div className={s.pageCount}>
        page {page} of {pages}
      </div>

      <ul className={s.pages}>
        {/* Prev page */}
        {pages > maxTrackElements && (
          <li
            className={classnames(s.prevToFirst, s.item, {
              [s.disabled]: isFirstPage,
            })}
          >
            <Button
              onClick={() => pageNumber(1)}
              className={classnames(s.button, {
                [s.disabledBtn]: isFirstPage,
              })}
            >
              <Icon Svg={ArrowIcon} className={s.icon} />
              <Icon
                Svg={ArrowIcon}
                className={classnames(s.icon, s.additionalIcon)}
              />
            </Button>
          </li>
        )}

        <li
          className={classnames(s.prev, s.item, {
            [s.disabled]: isFirstPage,
          })}
        >
          <Button
            onClick={prevPage}
            className={classnames(s.button, {
              [s.disabledBtn]: isFirstPage,
            })}
          >
            <Icon Svg={ArrowIcon} className={s.icon} />
          </Button>
        </li>
        {/* Prev page end */}
        <ul className={s.track}>
          {pagesMaxCountArr.map((number) => (
            // eslint-disable-next-line react/no-array-index-key
            <li
              className={classnames(s.item, {
                [s.active]: page === number,
              })}
              key={number}
            >
              <Button
                className={classnames(s.button, {
                  [s.activeBtn]: page === number,
                })}
                onClick={() => pageNumber(number)}
              >
                {number}
              </Button>
            </li>
          ))}
        </ul>
        {/* Next page */}
        <li
          className={classnames(s.next, s.item, {
            [s.disabled]: isLastPage,
          })}
        >
          <Button
            onClick={nextPage}
            className={classnames(s.button, {
              [s.disabledBtn]: isLastPage,
            })}
          >
            <Icon Svg={ArrowIcon} className={s.icon} />
          </Button>
        </li>
        {pages > maxTrackElements && (
          <li
            className={classnames(s.nextToLast, s.item, {
              [s.disabled]: isLastPage,
            })}
          >
            <Button
              onClick={() => pageNumber(pages)}
              className={classnames(s.button, {
                [s.disabledBtn]: isLastPage,
              })}
            >
              <Icon Svg={ArrowIcon} className={s.icon} />
              <Icon
                Svg={ArrowIcon}
                className={classnames(s.icon, s.additionalIcon)}
              />
            </Button>
          </li>
        )}

        {/* Next page end */}
      </ul>
    </div>
  );
};
