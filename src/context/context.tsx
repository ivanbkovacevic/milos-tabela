import React from "react";
import projects from "../projects.json";
import { SortOrder, SortProperties, Project } from "../constants";


const projectsString = JSON.stringify(projects);
const productsParsed = JSON.parse(projectsString);

interface ContextState {
  projectsList: Project[];
  selectedProject: Project | null;
}

interface ContextProps {
  state: ContextState;
  setProjectsList: (data: Project[]) => void;
  handleSort: (order: string, value: string) => void;
  addNewProject: (data: Project) => void;
  editProject: (data: Project) => void;
  removeProject: (data: Project | null) => void;
  selectProject: (data: Project | null) => void;
}

const Context = React.createContext<ContextProps>({
  state: {
    projectsList: productsParsed,
    selectedProject: null,
  },
  setProjectsList: () => {},
  addNewProject: () => {},
  editProject: () => {},
  removeProject: () => {},
  selectProject: () => {},
  handleSort: () => {},
});

function ContextProvider(props: React.PropsWithChildren<{}>) {
  const [state, setState] = React.useState<ContextState>({
    projectsList: productsParsed,
    selectedProject: null,
  });


  const setProjectsList = (data: Project[]) => {
    setState({
      ...state,
      projectsList: [...data],
    });
  };

  const addNewProject = (data: Project) => {
    setState({
      ...state,
      projectsList: [data, ...state.projectsList],
    });
  };


  const editProject = (data: Project) => {
    const newList = state.projectsList.map((item: Project) => {
      if (item.id === data.id) {
        return { ...data };
      }
      return item;
    });
    setState({
      ...state,
      projectsList: [...newList],
    });
  };

  const removeProject = (data: Project | null) => {
    const newList = state.projectsList.filter(
      (product: Project) => product.id !== data?.id
    );
    setState({
      ...state,
      projectsList: [...newList],
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
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export { Context, ContextProvider };
