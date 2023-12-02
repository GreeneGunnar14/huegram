import { useEffect, useState } from "react";

interface Post {
  color: string;
  username: string;
  likes: number[];
  id: number;
  userId: number;
}

interface Props {
  post: Post;
  canDelete: boolean;
  handleDelete: (hueId: number) => void;
  handleLikeUnlike: (hueId: number, like_unlike: boolean) => void;
}

const Post = ({ post, canDelete, handleDelete, handleLikeUnlike }: Props) => {
  // Solution for determining lightness value comes from
  // https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color

  const [liked, setLiked] = useState<boolean>(false);

  const r_num = Number("0x" + post.color.slice(1, 3));
  const g_num = Number("0x" + post.color.slice(3, 5));
  const b_num = Number("0x" + post.color.slice(5, 7));

  const hue_intensity = r_num * 0.299 + g_num * 0.587 + b_num * 0.114;

  const text_color = hue_intensity > 186 ? "#000000" : "#FFFFFF";

  useEffect(() => {
    post.userId in post.likes && setLiked(true);
  }, []);

  return (
    <div>
      <div
        className="flex flex-col h-64 aspect-square rounded-3xl text-center justify-center items-center bg-"
        style={{
          backgroundColor: post.color,
          color: text_color,
        }}
      >
        <p className=" text-2xl opacity-80">{post.color}</p>
      </div>
      <p className="text-center text-white">{post.username}</p>
      {canDelete && (
        <button onClick={() => handleDelete(post.id)}>Delete Hue</button>
      )}
      <button
        onClick={() => {
          handleLikeUnlike(post.id, !liked);
          setLiked(!liked);
        }}
        className="text-white bg-pink-400 rounded-lg p-2"
      >
        {liked ? "Unlike" : "Like"}
      </button>
    </div>
  );
};

export default Post;
