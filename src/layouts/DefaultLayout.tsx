import Header from "components/Header";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getUserDetail } from "store/asyncThunk/home";

const DefaultLayout = () => {
  const handleGetUserDetail = async () => {
    await getUserDetail({ id: "1" });
  };
  useEffect(() => {
    handleGetUserDetail();
  }, []);
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
