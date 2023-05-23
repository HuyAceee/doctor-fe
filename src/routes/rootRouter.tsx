import { ROUTES } from "utils/constants";
import Login from "containers/Auth/Login";
import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { getToken } from "utils/localStorage";
import NotFound from "components/NotFound";

const PrivateRoute = ({ children }: any) => {
  const auth = getToken();
  return auth ? children : <Navigate to={ROUTES.login.index} />;
};

const RootRouter = () => {
  return (
    <Suspense fallback={<></>}>
      <Routes>
        <Route path={ROUTES.notfound} element={<NotFound />} />
        <Route path={ROUTES.login.index} element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path={ROUTES.home} />
        </Route>
        <Route path="*" element={<Navigate to={ROUTES.notfound} />} />
      </Routes>
    </Suspense>
  );
};

export default RootRouter;
