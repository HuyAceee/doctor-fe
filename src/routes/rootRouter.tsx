import React from "react";
import { ROUTES } from "utils/constants";
import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { getToken } from "utils/localStorage";
import DefaultLayout from "layouts/DefaultLayout";

const NotFound = React.lazy(() => import("components/NotFound"));
const Login = React.lazy(() => import("containers/Auth/Login"));
const HomePage = React.lazy(() => import("containers/Home"));

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
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DefaultLayout />
            </PrivateRoute>
          }
        >
          <Route path={ROUTES.home} element={<HomePage />} />
        </Route>
        <Route path="*" element={<Navigate to={ROUTES.notfound} />} />
      </Routes>
    </Suspense>
  );
};

export default RootRouter;
