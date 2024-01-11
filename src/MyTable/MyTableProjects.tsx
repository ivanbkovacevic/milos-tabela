import React, { useState, useContext } from "react";
import { Context } from "../context/context";
import NumOfRows from "./NumOfRows/NumOfRows";
import Pagination from "./Pagination/Pagination";
import { SortOrder, TABLE_HEADERS_PRODUCTS } from "../constants";
import style from "./MyTable.module.scss";
import TableRowsProjects from "./TableRows/TableRowsProjects";

interface MyTableProps {}

const MyTableProjects: React.FC<MyTableProps> = () => {
  const { state, handleSort } = useContext(Context);
  const { projectsList } = state;

  const [numOfRows, setNumOfRows] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const generateTableHeaders = () => {
    const tableHeaders = TABLE_HEADERS_PRODUCTS.map((item) => {
      return (
        <th key={item.title}>
          <span>{item.title}</span>
          <button
            onClick={() => handleSort(SortOrder.ASCENDING, item.sortProperty)}
          >
            &#8593;
          </button>
          <button
            onClick={() => handleSort(SortOrder.DESCENDING, item.sortProperty)}
          >
            &#8595;
          </button>
        </th>
      );
    });
    return tableHeaders;
  };

  const generateTableRows = () => {
    const pageSettedList = projectsList.slice(
      numOfRows * (currentPage - 1),
      numOfRows * currentPage
    );
    const tableRows = pageSettedList.map((item, index) => {
      return <TableRowsProjects key={item.id} data={item} />;
    });
    return tableRows;
  };

  const handleNumOfRows = (value: number) => {
    setNumOfRows(value);
  };
  const handlePagination = (value: number) => {
    setCurrentPage(value);
  };

  return (
    <div className={style.wrapper}>
      <NumOfRows handleNumOfRows={handleNumOfRows} numOfRows={numOfRows} />
      <table>
        <thead>
          <tr>{generateTableHeaders()}</tr>
        </thead>
        <tbody>{generateTableRows()}</tbody>
      </table>
      <Pagination
        listLength={projectsList.length}
        numOfRows={numOfRows}
        currentPage={currentPage}
        handlePagination={handlePagination}
      />
    </div>
  );
};

export default MyTableProjects;
