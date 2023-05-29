import Button from "components/Button";
import TextInput from "components/TextInput";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { ROUTES, messageError } from "utils/constants";
import * as Yup from "yup";
import { useState } from "react";
import { checkArrayInvalid } from "utils/functions";
import { IOption, IUserFormData } from "types/userType";
import userApi from "store/api/userApi";
import SelectInput from "components/SelectInput";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface IFieldInput {
  name: string;
  field:
    | "email"
    | "password"
    | "firstName"
    | "lastName"
    | "gender"
    | "phoneNumber"
    | "address"
    | "roleId";
}

interface ISelectInput extends IFieldInput {
  options: IOption[];
}

const pathLang = "user.form.";
const listFields: IFieldInput[] = [
  {
    name: pathLang + "email",
    field: "email",
  },
  {
    name: pathLang + "password",
    field: "password",
  },
  {
    name: pathLang + "first_name",
    field: "firstName",
  },
  {
    name: pathLang + "last_name",
    field: "lastName",
  },
  {
    name: pathLang + "phone_number",
    field: "phoneNumber",
  },
  {
    name: pathLang + "address",
    field: "address",
  },
];

const listSelect: ISelectInput[] = [
  {
    name: pathLang + "gender",
    field: "gender",
    options: [
      {
        name: pathLang + "female",
        value: "0",
      },
      {
        name: pathLang + "male",
        value: "1",
      },
    ],
  },
  {
    name: pathLang + "role",
    field: "roleId",
    options: [
      {
        name: pathLang + "admin",
        value: "1",
      },
      {
        name: pathLang + "doctor",
        value: "2",
      },
      {
        name: pathLang + "partient",
        value: "3",
      },
    ],
  },
];

interface IUserFormProps {
  initialValues: IUserFormData;
  userId: string | undefined;
}
const UserForm = ({ initialValues, userId = "" }: IUserFormProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const isEdit = !!userId;

  const handleCreateUser = async (body: IUserFormData) => {
    try {
      const response = await userApi.createNewUser(body);
      if (response) {
        toast.success(t("toast.create_success"));
        navigate(ROUTES.user.index);
      }
    } catch (err) {
      console.log(err);
      // toast.error(t("toast.create_fail"));
    }
  };

  const handleEditUser = async (body: IUserFormData) => {
    try {
      const response = await userApi.editUser({ ...body, id: userId });
      if (response) {
        toast.success(t("toast.edit_success"));
        navigate(ROUTES.user.index);
      }
    } catch (err) {
      console.log(err);
      // toast.error(t("toast.edit_fail"));
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      email: Yup.string().required(messageError).email(messageError),
      firstName: Yup.string().required(messageError),
      lastName: Yup.string().required(messageError),
      gender: Yup.string().required(messageError),
      phoneNumber: Yup.number().required(messageError),
      address: Yup.string().required(messageError),
      roleId: Yup.string().required(messageError),
      ...(isEdit ? {} : { password: Yup.string().required(messageError) }),
      // .matches(
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      //   "error.password_format"
      // ),
    }),
    onSubmit: async (values) => {
      console.log(values);
      if (
        !checkArrayInvalid([
          values.email,
          values.address,
          values.firstName,
          values.gender,
          values.lastName,
          values.phoneNumber,
          values.roleId,
          ...(isEdit ? [] : [values.password]),
        ])
      ) {
        setLoading(true);
        if (isEdit) {
          handleEditUser(values);
        } else {
          handleCreateUser(values);
        }
        try {
        } catch (err) {}
      }
    },
  });
  return (
    <div>
      <h1 className="text-main uppercase text-center mb-10">
        {t(`user.${isEdit ? "edit" : "create"}_user`)}
      </h1>
      <div className="grid grid-cols-2 gap-x-5">
        {listFields
          .filter((field) => {
            return !isEdit || field.field !== "password";
          })
          .map((field, index) => {
            return (
              <TextInput
                key={index}
                name={field.field}
                onChange={formik.handleChange}
                placeholder={field.name}
                value={formik.values[field.field]}
                error={Boolean(
                  formik.touched[field.field] && formik.errors[field.field]
                )}
                errorMessage={formik.errors[field.field]}
              />
            );
          })}
        {listSelect.map((select, index) => {
          return (
            <SelectInput
              key={index}
              onChange={formik.handleChange}
              placeholder={select.name}
              value={formik.values[select.field]}
              title={select.name}
              name={select.field}
              options={select.options}
              error={Boolean(
                formik.touched[select.field] && formik.errors[select.field]
              )}
              errorMessage={formik.errors[select.field]}
            />
          );
        })}
      </div>
      <div className="flex flex-row justify-end">
        <Button
          className="!min-w-[150px]"
          onClick={formik.handleSubmit}
          title={pathLang + (isEdit ? "save" : "create")}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default UserForm;
