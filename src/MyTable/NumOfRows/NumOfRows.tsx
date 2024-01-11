import React from "react";
import cn from "classnames";
import { NUM_OF_ROWS_BTNS } from "../../constants";
import style from "./NumOfRows.module.scss";

interface NumOfRowsProps {
  handleNumOfRows: (nor: number) => void;
  numOfRows: number;
}

const NumOfRows: React.FC<NumOfRowsProps> = ({
  handleNumOfRows,
  numOfRows,
}) => {
  const generateBtns = () => {
    return NUM_OF_ROWS_BTNS.map((item) => {
      const btnStyle = cn({
        [style.btnSelected]: numOfRows === item.numOfRows,
      });
      return (
        <button
          key={item.numOfRows}
          className={btnStyle}
          onClick={() => handleNumOfRows(item.numOfRows)}
        >
          {item.numOfRows}
        </button>
      );
    });
  };
  return (
    <div className={style.wrapper}>
      <span>Show</span>
      <div className={style.btnsWrapper}>{generateBtns()}</div>
      <span>rows</span>
    </div>
  );
};

export default NumOfRows;
