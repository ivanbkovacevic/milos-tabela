import React, { useContext } from "react";
import { Context } from "../../context/context";
import { ContextUI } from "../../context/contextUI";
import { Project, PopUpVariant } from "../../constants";
import style from "./TableRows.module.scss";
import ControlledPopup from "../../ControledPopUp/ControledPopUp";

interface TableRowsProps {
  data: Project;
}

const TableRowsProjects: React.FC<TableRowsProps> = ({ data }) => {
  const { selectProject } = useContext(Context);
  const { togglePopUp } = useContext(ContextUI);

  return (
    <tr key={data.id}>
      <td>{data.name}</td>
      <td className={style.multipleValues}>
        {data.productPage.map((item) => {
          return (
            <a key={item} href={`https://${item}`} target="_blank" rel="noreferrer">
              {item}
            </a>
          );
        })}
      </td>
      <td className={style.multipleValues}>
        {data.articlePage.map((item) => {
          return (
            <a key={item} href={`https://${item}`} target="_blank" rel="noreferrer">
              {item}
            </a>
          );
        })}
      </td>
      <td>{data.htmlEmail}</td>
      <td>{data.articlePageText}</td>

      <td>
        <div className={style.imgWrapper}>
          <img src={data.productImg} alt={data.productImgAltText} />
          <ControlledPopup src={data.productImg} alt={data.productImgAltText} />
        </div>
      </td>
      <td>
        <button
          onClick={(e) => {
            e.stopPropagation();
            togglePopUp(PopUpVariant.CONFIRM_PROJECT);
            selectProject(data);
          }}
        >
          Remove
        </button>
        <button
          className={style.editBtn}
          onClick={(e) => {
            e.stopPropagation();
            selectProject(data);
            togglePopUp(PopUpVariant.EDIT_PROJECT);
          }}
        >
          Edit
        </button>
      </td>
    </tr>
  );
};

export default TableRowsProjects;
