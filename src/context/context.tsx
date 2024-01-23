import React from "react";
import { SortOrder, SortProperties, Project } from "../constants";
import axios from "axios";

interface ContextState {
  projectsList: Project[];
  selectedProject: Project | null;
  initialLoading: boolean;
  itemUpdated: boolean;
  imgName: string;
}

interface ContextProps {
  state: ContextState;
  setProjectsList: (data: Project[]) => void;
  handleSort: (order: string, value: string) => void;
  addNewProject: (data: Project) => void;
  editProject: (data: Project) => void;
  removeProject: (data: Project | null) => void;
  selectProject: (data: Project | null) => void;
  setImgName: (name: string) => void;
}

const Context = React.createContext<ContextProps>({
  state: {
    projectsList: [],
    selectedProject: null,
    initialLoading: false,
    itemUpdated: false,
    imgName: '',
  },
  setProjectsList: () => {},
  addNewProject: () => {},
  editProject: () => {},
  removeProject: () => {},
  selectProject: () => {},
  handleSort: () => {},
  setImgName: () => {},
});

function ContextProvider(props: React.PropsWithChildren<{}>) {
  const [state, setState] = React.useState<ContextState>({
    projectsList: [],
    selectedProject: null,
    initialLoading: false,
    itemUpdated: false,
    imgName: '',
  });

  const setProjectsList = (data: Project[]) => {
    setState({
      ...state,
      projectsList: [...data],
      initialLoading: true,
      itemUpdated: false,
    });
  };
  const setImgName = (name: string) => {
    setState({
      ...state,
      imgName: name,
    });
  };

  const addNewProject = async (data: Project) => {
    try {
      const formData = new FormData();
      if ( typeof(data.productImg) === 'object' && data.productImg !== null ) {
        formData.append("productImg", data.productImg);
        // axios.post("/upload", formData);
        const addedImgPath = { ...data, productImg: `../../assets/${data.productImg?.name.replace(/\s/g, '')}`}
        axios.post("/server/functions/newProject", addedImgPath);
      }
    } catch (error) {
      console.error("Error adding item", error);
    }
    setState({
      ...state,
      initialLoading: false,
    });
  };

  const editProject = async (data: Project) => {
    try {
      const formData = new FormData();
      if ( typeof(data.productImg) === 'object' && data.productImg !== null ) {
        formData.append("productImg", data.productImg);
      //  axios.post("/upload", formData);
        const addedImgPath = { ...data, productImg: `http://localhost:5000/uploads/${data.productImg?.name.replace(/\s/g, '')}`}
      await axios.post(`/server/functions/editProject`, addedImgPath);
      }
    } catch (error) {
      console.error("Error editing item", error);
    }
    setState({
      ...state,
      itemUpdated: true,
    });
  };

  const removeProject = async (data: Project | null) => {
    try {
      await axios.post(`/server/functions/deleteProject`, data);
    } catch (error) {
      console.error("Error editing item", error);
    }
    setState({
      ...state,
      itemUpdated: true,
    });
  };

  const selectProject = (data: Project | null) => {
    setState({
      ...state,
      selectedProject: data,
    });
  };

  const sortingAscending = (property: string) => {
    const sorted = state.projectsList.sort((a: any, b: any) => {
      if (a[property] < b[property]) {
        return -1;
      }
      if (a[property] > b[property]) {
        return 1;
      }
      return 0;
    });
    setProjectsList([...sorted]);
  };
  const sortingDescending = (property: string) => {
    const sorted = state.projectsList.sort((a: any, b: any) => {
      if (a[property] > b[property]) {
        return -1;
      }
      if (a[property] < b[property]) {
        return 1;
      }
      return 0;
    });
    setProjectsList([...sorted]);
  };

  const handleSort = (order: string, value: string) => {
    switch (true) {
      case value === SortProperties.ID && order === SortOrder.ASCENDING:
        sortingAscending(SortProperties.ID);
        break;
      case value === SortProperties.ID && order === SortOrder.DESCENDING:
        sortingDescending(SortProperties.ID);
        break;
      case value === SortProperties.AGE && order === SortOrder.ASCENDING:
        sortingAscending(SortProperties.AGE);
        break;
      case value === SortProperties.AGE && order === SortOrder.DESCENDING:
        sortingDescending(SortProperties.AGE);
        break;
      case value === SortProperties.NAME && order === SortOrder.ASCENDING:
        sortingAscending(SortProperties.NAME);
        break;
      case value === SortProperties.NAME && order === SortOrder.DESCENDING:
        sortingDescending(SortProperties.NAME);
        break;
      case value === SortProperties.POSITION && order === SortOrder.ASCENDING:
        sortingAscending(SortProperties.POSITION);
        break;
      case value === SortProperties.POSITION && order === SortOrder.DESCENDING:
        sortingDescending(SortProperties.POSITION);
        break;
      case value === SortProperties.OFFICE && order === SortOrder.ASCENDING:
        sortingAscending(SortProperties.OFFICE);
        break;
      case value === SortProperties.OFFICE && order === SortOrder.DESCENDING:
        sortingDescending(SortProperties.OFFICE);
        break;
      case value === SortProperties.START_DATE && order === SortOrder.ASCENDING:
        sortingAscending(SortProperties.START_DATE);
        break;
      case value === SortProperties.START_DATE &&
        order === SortOrder.DESCENDING:
        sortingDescending(SortProperties.START_DATE);
        break;
      case value === SortProperties.SALARY && order === SortOrder.ASCENDING:
        sortingAscending(SortProperties.SALARY);
        break;
      case value === SortProperties.SALARY && order === SortOrder.DESCENDING:
        sortingDescending(SortProperties.SALARY);
        break;
      default:
        break;
    }
  };

  return (
    <Context.Provider
      value={{
        state,
        setProjectsList,
        addNewProject,
        editProject,
        removeProject,
        handleSort,
        selectProject,
        setImgName,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export { Context, ContextProvider };
