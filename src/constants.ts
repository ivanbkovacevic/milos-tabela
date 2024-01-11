export interface Employee {
  id?: number;
  age: string;
  name: string;
  position: string;
  office: string;
  startDate: string;
  salary: string;
  [key: string]: any;
}

export interface Project {
  id?: string;
  name: string;
  productPage: string[];
  articlePageText: string;
  articlePage: string[];
  htmlEmail: string;
  pageLink: string;
  productImg: string;
  productImgAltText: string;
  [key: string]: any;
}

export const PopUpVariant = {
  ADD_NEW_PROJECT: "ADD_NEW_PROJECT",
  EDIT_PROJECT: "EDIT_PROJECT",
  CONFIRM_PROJECT: "CONFIRM_PROJECT",
};

export const SortProperties = {
  ID: "id",
  AGE: "age",
  NAME: "name",
  POSITION: "position",
  OFFICE: "office",
  START_DATE: "startDate",
  SALARY: "salary",
};

export const SortOrder = {
  ASCENDING: "a",
  DESCENDING: "d",
};

export const TABLE_HEADERS = [
  {
    title: "Id",
    sortProperty: SortProperties.ID,
  },
  {
    title: "Name",
    sortProperty: SortProperties.NAME,
  },
  {
    title: "Position",
    sortProperty: SortProperties.POSITION,
  },
  {
    title: "Office",
    sortProperty: SortProperties.OFFICE,
  },
  {
    title: "Age",
    sortProperty: SortProperties.AGE,
  },
  {
    title: "Start Date",
    sortProperty: SortProperties.START_DATE,
  },
  {
    title: "Salary",
    sortProperty: SortProperties.SALARY,
  },
];
export const TABLE_HEADERS_PRODUCTS = [
  {
    title: "Name",
    sortProperty: SortProperties.NAME,
  },
  {
    title: "Product Page",
    sortProperty: SortProperties.NAME,
  },
  {
    title: "Article Page",
    sortProperty: SortProperties.POSITION,
  },
  {
    title: "HTML Email",
    sortProperty: SortProperties.OFFICE,
  },
  {
    title: "Page link",
    sortProperty: SortProperties.AGE,
  },
  {
    title: "Product image",
    sortProperty: SortProperties.START_DATE,
  },
];

export const NUM_OF_ROWS_BTNS = [
  {
    numOfRows: 10,
  },
  {
    numOfRows: 15,
  },
  {
    numOfRows: 20,
  },
];
