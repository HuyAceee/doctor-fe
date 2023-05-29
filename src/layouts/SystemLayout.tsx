import Header from "components/Header";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getUserDetail } from "store/asyncThunk/user";
import { useAppDispatch } from "store/hook";

const DefaultLayout = () => {
  const dispatch = useAppDispatch();
  const handleGetUserDetail = async () => {
    await dispatch(getUserDetail({ id: "1" }));
  };
  useEffect(() => {
    handleGetUserDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Header />
      <div className="mx-5 my-10">
        <Outlet />
      </div>
    </div>
  );
};

export default DefaultLayout;
