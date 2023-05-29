import { useEffect, useState } from "react";
import UserForm from "./UserForm";
import userApi from "store/api/userApi";
import { useSearchParams } from "react-router-dom";
import Loading from "components/Loading";

const renderData = (data: any, keys: string[], userId: string) => {
  let result: any = {};
  keys.forEach((key) => {
    if (userId && key !== "password") result[key] = data[key];
  });
  console.log(result);
  return result;
};

const HandleUser = () => {
  const [parrams] = useSearchParams();
  const userId = parrams.get("id") || "";
  const [loading, setLoading] = useState(true);
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
  const [userDetail, setUserDetail] = useState(initValue);

  const handleGetUserDetail = async () => {
    const data = await userApi.getUserDetail({ id: userId });
    setUserDetail(data.users);
    setLoading(false);
  };
  useEffect(() => {
    if (userDetail) handleGetUserDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading />;
  }

  const initialValues = renderData(userDetail, Object.keys(initValue), userId);
  console.log(initialValues);

  return <UserForm initialValues={initialValues} userId={userId} />;
};

export default HandleUser;
