import { useSelector } from "react-redux";
import Post from "./Post";
import { RootState } from "../store";
import axios from "axios";
import PlaceholderHue from "./PlaceholderHue";

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
      .then((res) => {
        console.log(res, res.statusText);
      });
  };

  const placeholders = Array.from({ length: 10 }, (_, index) => (
    <PlaceholderHue key={index} />
  ));

  return (
    <div
      id="hue-container"
      className="flex flex-wrap gap-8 overflow-scroll h-full flex-grow relative w-3/4 justify-center pt-4 pb-5 bg-transparent"
    >
      {posts?.map((post) => {
        return (
          <Post
            post={post}
            canDelete={account ? account.username == post.username : false}
            key={post.id}
            handleDelete={handleDeleteHue}
            handleLikeUnlike={handleLikeUnlike}
            liked={userId ? post.likes.indexOf(parseInt(userId)) >= 0 : false}
          />
        );
      })}
      {posts ? (
        posts.length < 1 && (
          <div className="w-full h-2/5 flex justify-center items-center">
            <p className="font-header font-bold text-3xl bg-[linear-gradient(90deg,rgba(244,163,46,1)0%,rgba(249,100,44,1)35%,rgba(234,87,251,1)70%,rgba(168,80,252,1)100%)] text-transparent bg-clip-text">
              No Matching Hues
            </p>
          </div>
        )
      ) : (
        <>{placeholders}</>
      )}
    </div>
  );
};

export default HueContainer;
