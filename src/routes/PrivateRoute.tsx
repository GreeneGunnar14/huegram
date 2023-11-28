import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { RootState } from "../store";

const PrivateRoute = () => {
  const auth = useSelector((state: RootState) => state.auth);

  return auth.account ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
