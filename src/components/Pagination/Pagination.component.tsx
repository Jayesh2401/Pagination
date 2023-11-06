import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import React, { useMemo } from "react";
import { PaginationProps, UsePaginationProps } from "./Pagination.types";
import "./Pagination.css";

const DOTS = "...";

const range = (start: number, end: number): number[] => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
  startPage = 1,
  inline = false,
  startCount = 2,
  increaseSibling = false,
  className,
}: UsePaginationProps) => {
  return useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);
    const totalPageNumbers = siblingCount + 5;
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = startCount * siblingCount;
      let leftRange = range(startPage, startPage + leftItemCount - 1);
      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = startCount * siblingCount;
      let rightRange = range(totalPageCount - rightItemCount, totalPageCount);
      return [firstPageIndex, DOTS, ...rightRange];
    }
    let middleRange;
    if (shouldShowLeftDots && shouldShowRightDots) {
      if (increaseSibling) {
        middleRange = range(leftSiblingIndex - 1, rightSiblingIndex + 1);
      } else {
        middleRange = range(leftSiblingIndex, rightSiblingIndex);
      }
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage, startPage]);
};

const CommonPagination: React.FC<PaginationProps> = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    textColor,
    color,
    shape,
    startPage,
    startCount = 2,
    inline,
    className,
    increaseSibling,
  } = props;

  const [currentRange, setCurrentRange] = React.useState({
    start: 1,
    end: 10,
  });

  const paginationRange: any = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
    startPage: currentRange.start,
    inline,
    increaseSibling,
    className,
    startCount,
  });

  const onNext = () => {
    onPageChange(currentPage + 1);
  };
  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const groupStartPage = Math.floor((currentPage - 1) / 10) * 10 + 1;
  const groupEndPage = Math.min(groupStartPage + 9);

  const jumpahead = () => {
    const newpage = currentPage + 10;
    onPageChange(newpage);

    setCurrentRange({
      start: Math.floor((newpage - 1) / 10) * 10 + 1,
      end: Math.min(groupStartPage + 9),
    });
  };

  const jumpback = () => {};

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className={`Pagination-wrapper ${className ? className : ""}`}>
      <ul className="">
        <li
          className={`${currentPage === 1 ? "Opa-5" : "cur "} d-flex`}
          onClick={currentPage !== 1 ? onPrevious : undefined}
        >
          <span
            className={`arrow-left ${
              currentPage !== 1 ? "border-grey-dark" : "border-grey-light"
            }`}
          >
            <ArrowLeftIcon className="left-icon" aria-hidden="true" />
            <span>Previous</span>
          </span>
        </li>

        <div className="num-container">
          {inline
            ? // Render a simple list of buttons
              Array.from({ length: lastPage }, (_, index) => (
                <li
                  key={index}
                  style={{
                    backgroundColor:
                      currentPage === index + 1
                        ? `${color || "#eef2ff"}`
                        : "white",
                    color:
                      currentPage === index + 1
                        ? `${textColor || "#6366f1"}`
                        : "black",
                    borderRadius: shape === "rounded" ? "50%" : "8px",
                  }}
                  onClick={() =>
                    currentPage !== index + 1 && onPageChange(index + 1)
                  }
                  className={`page-num`}
                >
                  <span>{index + 1}</span>
                </li>
              ))
            : // Render the paginationRange with dots
              paginationRange.map((pageNumber: any, index: number) => {
                if (pageNumber === DOTS) {
                  return (
                    <span key={index} className="dot-handle">
                      ...
                    </span>
                  );
                }
                return (
                  <div key={index} className="num-handle">
                    <li
                      style={{
                        backgroundColor:
                          currentPage === pageNumber
                            ? `${color || "#eef2ff"}`
                            : "white",
                        color:
                          currentPage === pageNumber
                            ? `${textColor || "#6366f1"}`
                            : "black",
                        borderRadius: shape === "rounded" ? "50%" : "8px",
                      }}
                      onClick={() =>
                        currentPage !== pageNumber && onPageChange(pageNumber)
                      }
                      className={`page-num`}
                    >
                      <span>{pageNumber}</span>
                    </li>
                  </div>
                );
              })}
          {/* {paginationRange.map((pageNumber: any, index: number) => {
            if (pageNumber === DOTS) {
              return (
                <span key={index} className="dot-handle">
                  ...
                </span>
              );
            }
            return (
              <div key={index} className="num-handle">
                <li
                  style={{
                    backgroundColor:
                      currentPage === pageNumber
                        ? `${color || "#eef2ff"}`
                        : "white",
                    color:
                      currentPage === pageNumber
                        ? `${textColor || "#6366f1"}`
                        : "black",
                    borderRadius: shape === "rounded" ? "50%" : "8px",
                  }}
                  onClick={() =>
                    currentPage !== pageNumber && onPageChange(pageNumber)
                  }
                  className={`page-num`}
                >
                  <span>{pageNumber}</span>
                </li>
              </div>
            );
          })} */}
        </div>

        <div className="current-page">{currentPage}</div>

        <li
          className={`${currentPage !== lastPage ? "cur" : "Opa-5"} d-flex`}
          onClick={currentPage !== lastPage ? onNext : undefined}
        >
          <span
            className={`arrow-right ${
              currentPage !== lastPage
                ? "border-grey-dark"
                : "border-grey-light"
            }`}
          >
            <span>Next</span>
            <ArrowRightIcon className="right-icon " aria-hidden="true" />
          </span>
        </li>
      </ul>

      {/* <div className="page-of">
        <div
          className={`${currentPage === 1 ? "Opa-5" : "cur "} d-flex`}
          onClick={currentPage !== 1 ? jumpback : undefined}
        >
          <span
            className={`page-of-buton ${
              currentPage !== 1 ? "border-grey-dark" : "border-grey-light"
            }`}
          >
            <ArrowLeftIcon className="left-icon" aria-hidden="true" />
            back
          </span>
        </div>
        <div>{`Page ${groupStartPage} of ${groupEndPage} `}</div>
        <div
          className={`${currentPage === lastPage ? "opa-5" : "cur"} d-flex`}
          onClick={currentPage !== lastPage ? jumpahead : undefined}
        >
          <span
            className={`page-of-buton ${
              currentPage !== lastPage
                ? "border-grey-dark"
                : "border-grey-light"
            }`}
          >
            ahead
            <ArrowRightIcon className="right-icon " aria-hidden="true" />
          </span>
        </div>
      </div> */}
    </div>
  );
};

export default CommonPagination;
