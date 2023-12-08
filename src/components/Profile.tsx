import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useNavigate } from "react-router";
import authSlice from "../store/slices/auth";
import Post from "./Post";
import PlaceholderHue from "./PlaceholderHue";
import { useEffect, useState } from "react";

interface Props {
  posts?: Post[];
}

const Profile = ({ posts }: Props) => {
  const account = useSelector((state: RootState) => state.auth.account);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(authSlice.actions.logout());
    navigate("/login");
  };

  const [userPosts, setUserPosts] = useState<Post[]>();
  const [remainingPosts, setRemainingPosts] = useState<JSX.Element[]>();

  useEffect(() => {
    const post_set = posts?.filter((post) => {
      return account ? post.userId == parseInt(account.id) : false;
    });
    setUserPosts(post_set);

    const totalSpaces = post_set
      ? Math.ceil(Math.sqrt(post_set.length)) ** 2
      : 0;
    const unusedSpaces = post_set ? totalSpaces - post_set.length : 0;

    const placeholders: JSX.Element[] = [];

    for (let i = 0; i < unusedSpaces; i++) {
      placeholders.push(<PlaceholderHue />);
    }

    setRemainingPosts(placeholders);
  }, [account, posts]);

  const calcSum = (values: number[]) => {
    let sum = 0;
    values.forEach((value) => {
      sum += value;
    });
    return sum;
  };

  return (
    <>
      <div className="my-2 relative">
        <h1 className="font-heading text-3xl z-10 relative bg-gradient-to-r text-transparent p-1 from-red-400 via-pink-500 to bg-purple-500 bg-clip-text">
          {account ? account.username : ". . ."}
        </h1>
        <h1 className="font-heading text-3xl bg-gradient-to-4 absolute top-2 left-2 blur-sm z-0 text-black">
          {account ? account.username : ". . ."}
        </h1>
      </div>

      <div
        className="grid w-full aspect-square gap-px"
        style={{
          gridTemplateColumns: userPosts
            ? "repeat(" +
              Math.ceil(Math.sqrt(userPosts.length)) +
              ", minmax(0, 1fr))"
            : 0,
          gridTemplateRows: userPosts
            ? "repeat(" +
              Math.ceil(Math.sqrt(userPosts.length)) +
              ", minmax(0, 1fr)"
            : 0,
        }}
      >
        {userPosts?.map((post) => {
          return (
            <div className="" style={{ backgroundColor: post.color }}></div>
          );
        })}
        {remainingPosts?.map(() => {
          return <div className="bg-gray-800 opacity-70"></div>;
        })}
      </div>

      <div className="my-4 py-4 text-center">
        <h2 className=" text-5xl mb-2 font-heading">
          {userPosts ? userPosts.length : "-"}
        </h2>
        <p className=" text-lg font-body font-thin">Hues</p>
      </div>

      <div className="mb-4 py-4 text-center">
        <h2 className="text-5xl mb-2 font-heading">
          {userPosts
            ? calcSum(
                userPosts.map((post) => {
                  return post.likes.length;
                })
              )
            : 0}
        </h2>
        <p className="text-lg font-body font-thin">Likes</p>
      </div>

      <button
        className="mt-4 bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 p-2 rounded-lg"
        onClick={handleLogout}
      >
        Logout
      </button>
    </>
  );
};

export default Profile;
