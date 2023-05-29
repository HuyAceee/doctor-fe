import { useEffect, useState } from "react";
import UserForm from "./UserForm";
import userApi from "store/api/userApi";
import { useSearchParams } from "react-router-dom";
import Loading from "components/Loading";
import allCodeApi from "store/api/allCodeApi";
import { EAllCodeType } from "types/allCodeType";
import { IUserFormData } from "types/userType";

const renderData = (data: any, keys: string[], userId: string) => {
  let result: any = {};
  keys.forEach((key) => {
    if (userId && key !== "password") result[key] = data[key];
  });
  return result;
};

const HandleUser = () => {
  const [params] = useSearchParams();
  const userId = params.get("id") || "";
  const [loading, setLoading] = useState(true);
  const [genderOptions, setGenderOptions] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);
  const initValue = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    gender: "",
    phoneNumber: "",
    address: "",
    roleId: "",
  };
  const [userDetail, setUserDetail] = useState<IUserFormData>(initValue);

  const handleGetUserDetail = async () => {
    const data = await userApi.getUserDetail({ id: userId });
    setUserDetail(data.users);
    setLoading(false);
  };
  const hendleGetGender = async () => {
    const data = await allCodeApi.getAllCode({ type: EAllCodeType.GENDER });
    setGenderOptions(data.allCode);
  };
  const handleGetRole = async () => {
    const data = await allCodeApi.getAllCode({ type: EAllCodeType.ROLE });
    setRoleOptions(data.allCode);
  };

  useEffect(() => {
    if (userDetail) handleGetUserDetail();
    hendleGetGender();
    handleGetRole();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading />;
  }

  const initialValues = renderData(userDetail, Object.keys(initValue), userId);

  return (
    <UserForm
      initialValues={initialValues}
      userId={userId}
      image={userDetail.image}
      genderOptions={genderOptions}
      roleOptions={roleOptions}
    />
  );
};

export default HandleUser;
