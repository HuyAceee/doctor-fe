import Header from "components/Header";
import MenuRight from "components/MenuRight";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <div>
      <MenuRight />
      <Header />
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
