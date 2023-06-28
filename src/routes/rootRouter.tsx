import React from "react";
import { ROUTES } from "utils/constants";
import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { getToken } from "utils/localStorage";

const HomePage = React.lazy(() => import("containers/Home"));
const NotFound = React.lazy(() => import("components/NotFound"));
const Login = React.lazy(() => import("containers/Auth/Login"));
const DefaultLayout = React.lazy(() => import("layouts/DefaultLayout"));
const UserPage = React.lazy(() => import("containers/User"));
const HandleUser = React.lazy(() => import("features/User/HandleUser"));
const Loading = React.lazy(() => import("components/Loading"));
const DoctorPage = React.lazy(() => import("containers/Doctor"));
const EditInfo = React.lazy(() => import("features/Doctor/EditInfo"));
const MedicalExaminationPlan = React.lazy(() => import("features/Plan"));
const BookingForm = React.lazy(() => import("features/Booking/BookingForm"));
const VerifyMail = React.lazy(() => import("features/Booking/VerifyMail"));

const PrivateRoute = ({ children }: any) => {
  const auth = getToken();
  return auth ? children : <Navigate to={ROUTES.login.index} />;
};

const RootRouter = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path={ROUTES.notfound} element={<NotFound />} />
        <Route path={ROUTES.login.index} element={<Login />} />
        <Route
          path="/system"
          element={
            <PrivateRoute>
              <DefaultLayout />
            </PrivateRoute>
          }
        >
          <Route path={ROUTES.system.user.index} element={<UserPage />} />
          <Route path={ROUTES.system.user.create} element={<HandleUser />} />
          <Route path={ROUTES.system.user.edit} element={<HandleUser />} />

          <Route path={ROUTES.system.doctor.index} element={<DoctorPage />} />
          <Route path={ROUTES.system.doctor.edit_info} element={<EditInfo />} />

          <Route
            path={ROUTES.system.doctor.plan.index}
            element={<MedicalExaminationPlan />}
          />
        </Route>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DefaultLayout />
            </PrivateRoute>
          }
        >
          <Route path={ROUTES.home} element={<HomePage />} />
          <Route path={ROUTES.booking.new} element={<BookingForm />} />
        </Route>
        <Route path={ROUTES.booking.vetify} element={<VerifyMail />} />
        <Route path="*" element={<Navigate to={ROUTES.notfound} />} />
      </Routes>
    </Suspense>
  );
};

export default RootRouter;
