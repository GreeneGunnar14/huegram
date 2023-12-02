import { useDispatch, useSelector } from "react-redux";
import pfp from "/Square-Img.png";
import { RootState } from "../store";
import { useNavigate } from "react-router";
import authSlice from "../store/slices/auth";

const Profile = () => {
  const account = useSelector((state: RootState) => state.auth.account);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(authSlice.actions.logout());
    navigate("/login");
  };

  return (
    <>
      <h1>{account ? account.username : ". . ."}</h1>

      <div className="flex w-1/2">
        <img src={pfp} alt="" className="rounded-full" />
      </div>

      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Profile;
