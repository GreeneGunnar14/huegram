import { useSelector } from "react-redux";
import Post from "./Post";
import { RootState } from "../store";
import useSWR from "swr";
import { AccountResponse } from "../types";
import { fetcher } from "../utils/axios";
import axios from "axios";

interface Props {
  posts: Post[] | undefined;
  handleDeleteHue: (hueId: number) => void;
}

const HueContainer = ({ posts, handleDeleteHue }: Props) => {
  const account = useSelector((state: RootState) => state.auth.account);

  const userId = account?.id;

  const handleLikeUnlike = (hueId: number, like_unlike: boolean) => {
    console.log(
      `Sending ${like_unlike ? "like" : "unlike"} request for hue ${hueId}`
    );
    const putData = {
      user: userId,
      like_unlike: like_unlike ? 1 : 0,
    };
    axios
      .put(`${import.meta.env.VITE_API_URL}/api/hues/${hueId}/`, putData)
      .then((res) => console.log(res.statusText));
  };

  const user = useSWR<AccountResponse>(`/accounts/user/${userId}/`, fetcher);
  console.log(user.data);

  return posts?.map((post) => {
    return (
      <Post
        post={post}
        canDelete={user.data ? user.data.username == post.username : false}
        key={post.id}
        handleDelete={handleDeleteHue}
        handleLikeUnlike={handleLikeUnlike}
      />
    );
  });
};

export default HueContainer;
