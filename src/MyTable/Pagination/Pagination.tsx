import React from "react";
import cn from "classnames";
import style from "./Pagination.module.scss";

interface PaginationProps {
  listLength: number;
  numOfRows: number;
  currentPage: number;
  handlePagination: (pn: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  listLength,
  numOfRows,
  currentPage,
  handlePagination,
}) => {
  const numOfPages = Math.ceil(listLength / numOfRows);
  const generatePageNumbers = () => {
    const pageNumbers = Array.from(
      { length: numOfPages },
      (_, index) => index + 1
    );
    return pageNumbers.map((item) => {
      const pageStyle = cn({
        [style.pageSelected]: currentPage === item,
      });
      return (
        <button
          key={item}
          className={pageStyle}
          onClick={() => handlePagination(item)}
        >
          {item}
        </button>
      );
    });
  };
  return (
    <div className={style.wrapper}>
      <button
        disabled={currentPage === 1}
        onClick={() => handlePagination(currentPage - 1)}
      >
        Previus
      </button>
      <div className={style.btnsWrapper}>{generatePageNumbers()}</div>
      <button
        disabled={currentPage === numOfPages}
        onClick={() => handlePagination(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
