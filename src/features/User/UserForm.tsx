import Button from "components/Button";
import TextInput from "components/TextInput";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { ROUTES, messageError } from "utils/constants";
import * as Yup from "yup";
import { useState } from "react";
import { checkArrayInvalid, convertImageFromBuffer } from "utils/functions";
import { IOption, IUserFormData } from "types/userType";
import userApi from "store/api/userApi";
import SelectInput from "components/SelectInput";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AddIcon } from "assets/icons";

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

const renderListSelect = (
  genderOptions: any,
  roleOptions: any
): ISelectInput[] => {
  return [
    {
      name: pathLang + "gender",
      field: "gender",
      options: genderOptions,
    },
    {
      name: pathLang + "role",
      field: "roleId",
      options: roleOptions,
    },
  ];
};

interface IUserFormProps {
  initialValues: IUserFormData;
  userId: string | undefined;
  genderOptions: any[];
  roleOptions: any[];
  image: any;
}
const UserForm = ({
  initialValues,
  userId = "",
  genderOptions,
  roleOptions,
  image,
}: IUserFormProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<any>(
    image ? convertImageFromBuffer(image) : null
  );

  console.log(avatar);
  const isEdit = !!userId;

  const handleCreateUser = async (body: IUserFormData) => {
    try {
      const response = await userApi.createNewUser({ ...body, image: avatar });
      if (response) {
        toast.success(t("toast.create_success"));
        navigate(ROUTES.system.user.index);
      }
    } catch (err) {
      console.log(err);
      // toast.error(t("toast.create_fail"));
    }
  };

  const handleEditUser = async (body: IUserFormData) => {
    try {
      const response = await userApi.editUser({
        ...body,
        id: userId,
        image: avatar,
      });
      if (response) {
        toast.success(t("toast.edit_success"));
        navigate(ROUTES.system.user.index);
      }
    } catch (err) {
      console.log(err);
      // toast.error(t("toast.edit_fail"));
    }
  };

  const listSelect = renderListSelect(genderOptions, roleOptions);

  const onSelectFile = (e: any) => {
    if (e?.target?.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setAvatar(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setAvatar("");
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
        <div
          onClick={() => {
            const cvElement = document.getElementById("avatar");
            if (!cvElement) return;
            cvElement.click();
          }}
          className="flex items-center justify-center cursor-pointer border border-1 bg-cover rounded-[10px] aspect-[4/3] w-[30%]"
        >
          <input
            hidden
            id="avatar"
            accept="image/*"
            type="file"
            onChange={onSelectFile}
          />
          {avatar ? (
            <img
              className="aspect-[4/3] rounded-[10px] w-full object-cover"
              src={avatar}
              alt=""
            />
          ) : (
            <AddIcon className="max-sm:w-[20px] max-sm-640:w-[25px]" />
          )}
        </div>
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
