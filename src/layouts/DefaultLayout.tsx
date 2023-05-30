import Header from "components/Header";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
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
