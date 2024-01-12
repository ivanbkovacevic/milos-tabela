import React, { useContext } from "react";
import { Context } from "../context/context";
import { ContextUI } from "../context/contextUI";
import { PopUpVariant, Project } from "../constants";
import style from "./Form.module.scss";
import { v4 as uuid } from "uuid";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";

interface FormProps {
  formAction: string;
}

const FormProject: React.FC<FormProps> = ({ formAction }) => {
  const { state, addNewProject, editProject } = useContext(Context);
  const { selectedProject } = state;
  const { togglePopUp, stateUI } = useContext(ContextUI);
  const { popUpVariant } = stateUI;

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    productImg: Yup.string().required("Project image is required"),
    productPage: Yup.array().of(
      Yup.string().nullable().required("Product page is required")
    ),
    articlePage: Yup.array().of(
      Yup.string().nullable().required("Article page is required")
    ),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email address is required"),
    pageLink: Yup.string().required("Page link is required"),
   
  });

  const initialValues = {
    name: "",
    productImg: "",
    productPage: [""],
    articlePage: [""],
    email: "",
    pageLink: "",
    id: "0",
  };
  const handleFormSubmited = (values: Project, { resetForm }: any) => {
    if (formAction === PopUpVariant.ADD_NEW_PROJECT) {
      addNewProject({ ...values, id: uuid() });
    } else {
      editProject(values);
    }
    resetForm();
    togglePopUp();
  };

  const generateFormFields = () => {
    const fields = [
      {
        label: "Name",
        id: "name",
        type: "text",
        required: true,
        name: "name",
        placeHolder: "cool project",
        value: initialValues.name,
      },
      {
        label: "Product image",
        id: "productImg",
        type: "text",
        required: true,
        name: "productImg",
        placeHolder: "some image",
        value: initialValues.productImg,
      },
      {
        label: "Html Email",
        id: "email",
        type: "email",
        required: true,
        name: "email",
        placeHolder: "html email",
        value: initialValues.email,
      },
      // {
      //   label: "Product page",
      //   id: "productPage",
      //   type: "text",
      //   required: true,
      //   name: "productPage",
      //   placeHolder: "www.something",
      //   value: initialValues.productPage,
      // },
      // {
      //   label: "Article page link",
      //   id: "articlePage",
      //   type: "text",
      //   required: true,
      //   name: "articlePage",
      //   placeHolder: "www.something",
      //   value: initialValues.articlePage,
      // },
      {
        label: "Page link",
        id: "pageLink",
        type: "text",
        required: true,
        name: "pageLink",
        placeHolder: "www.something...",
        value: initialValues.articlePage,
      },
    ];

    return fields.map((item) => {
      return (
        <div className={style.inputWrapper} key={item.id}>
          <label htmlFor={item.id}>{item.label}</label>
          <Field
            type={item.type}
            id={item.id}
            name={item.name}
            placeholder={item.placeHolder}
          />
          <ErrorMessage
            name={item.name}
            component="div"
            className={style.errorMsg}
          />
        </div>
      );
    });
  };

  console.log(initialValues, PopUpVariant);
  return (
    <div className={style.wrapper}>
      <h1 className={style.heading}>
        {formAction === PopUpVariant.ADD_NEW_PROJECT
          ? "Add new project"
          : "Edit Project"}
      </h1>
      <Formik
        initialValues={
          (popUpVariant === PopUpVariant.ADD_NEW_PROJECT
            ? null
            : selectedProject) || initialValues
        }
        validationSchema={validationSchema}
        onSubmit={handleFormSubmited}
        enableReinitialize={true}
        render={({ values }: any) => (
          <Form>
            {generateFormFields()}
            <label htmlFor="productPage">Product page</label>
            <ErrorMessage
              name="productPage"
              component="div"
              className={style.errorMsg}
            />
            <FieldArray
              name="productPage"
              // id="productPage"
              render={(arrayHelpers: any) => (
                <div>
                  {values.productPage.map((prodPage: string, index: number) => (
                    <div className={style.inputProdPage} key={index}>
                      <Field name={`productPage.${index}`} />
                      <button
                        type="button"
                        className={style.addRemoveBtn}
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        -
                      </button>
                      <button
                        type="button"
                        className={style.addRemoveBtn}
                        onClick={() => arrayHelpers.insert(index, "")}
                      >
                        +
                      </button>
                    </div>
                  ))}
                </div>
              )}
            />
            {/* <div>
              <button type="submit">
                {formAction === PopUpVariant.ADD_NEW_PROJECT
                  ? "Add new project"
                  : "Edit project"}
              </button>
            </div> */}

            <label htmlFor="articlePage">Article page</label>
            <ErrorMessage
              name="articlePage"
              component="div"
              className={style.errorMsg}
            />
            <FieldArray
              name="articlePage"
              // id="articlePage"
              render={(arrayHelpers: any) => (
                <div>
                  {values.articlePage.map((prodPage: string, index: number) => (
                    <div className={style.inputProdPage} key={index}>
                      <Field name={`articlePage.${index}`} />
                      <button
                        type="button"
                        className={style.addRemoveBtn}
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        -
                      </button>
                      <button
                        type="button"
                        className={style.addRemoveBtn}
                        onClick={() => arrayHelpers.insert(index, "")}
                      >
                        +
                      </button>
                    </div>
                  ))}
                </div>
              )}
            />
            <div>
              <button type="submit">
                {formAction === PopUpVariant.ADD_NEW_PROJECT
                  ? "Add new project"
                  : "Edit project"}
              </button>
            </div>
          </Form>
        )}
      />
    </div>
  );
};

export default FormProject;
