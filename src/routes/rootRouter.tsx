import { Suspense } from "react";
import { Routes } from "react-router-dom";

// const PrivateRoute = ({ children }: any) => {
//   // const auth = AuthService.isLoggedIn();
//   // return auth ? children : <Navigate to="/login" />;
//   return children;
// };

const AppRoutes = () => {
  return (
    <Suspense fallback={<></>}>
      <Routes>
        {/* <Route path={ROUTES.album.index} element={<AlbumPage />} />
        <Route path={ROUTES.album.detail()} element={<AlbumDetail />} /> */}
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
