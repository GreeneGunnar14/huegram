import { useDispatch, useSelector } from "react-redux";
import pfp from "/Square-Img.png";
import { RootState } from "../store";
import { useNavigate } from "react-router";
import useSWR from "swr";
import { fetcher } from "../utils/axios";
import { AccountResponse } from "../types";
import authSlice from "../store/slices/auth";

const Profile = () => {
  const account = useSelector((state: RootState) => state.auth.account);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = account?.id;

  const user = useSWR<AccountResponse>(`/accounts/user/${userId}/`, fetcher);

  const handleLogout = () => {
    dispatch(authSlice.actions.logout());
    navigate("/login");
  };

  return (
    <>
      <h1>{user.data ? user.data?.username : ". . ."}</h1>

      <div className="flex w-1/2">
        <img src={pfp} alt="" className="rounded-full" />
      </div>

      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Profile;
