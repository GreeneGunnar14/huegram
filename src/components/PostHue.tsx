import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Post from "./Post";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const schema = z.object({
  hex_code: z.string().max(6).min(6),
});

type FormData = z.infer<typeof schema>;

interface PostProps {
  color: string;
  username: string;
  likes: number[];
  id: number;
  userId: number;
}

interface Props {
  addHue: (color: string, userId: string | undefined) => void;
}

const PostHue = ({ addHue }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const account = useSelector((state: RootState) => state.auth.account);

  const userId = account?.id;

  const [previewPost, setPreviewPost] = useState<PostProps>({
    color: "",
    username: account ? account.username : "guest",
    likes: [],
    id: -1,
    userId: account ? parseInt(account.id) : -1,
  });

  const handleUpdateColor = (color: string) => {
    const newPost: PostProps = {
      color: "",
      username: account ? account.username : "guest",
      likes: [],
      id: -1,
      userId: account ? parseInt(account.id) : -1,
    };
    if (!/^[0-9A-F]{6}$/i.test(color)) {
      setPreviewPost(newPost);
      return;
    }

    newPost.color = "#" + color;
    setPreviewPost(newPost);
  };

  const handleAddHue = () => {
    if (!previewPost?.color) {
      alert("Invalid hex code!");
      return;
    }

    addHue(previewPost.color, userId);
  };

  return (
    <div className="w-full flex items-center p-2">
      <Post
        post={previewPost}
        isPreview={true}
        canDelete={false}
        handleDelete={() => {}}
        handleLikeUnlike={() => {}}
        liked={false}
      />

      <div
        className={
          "w-5/6 justify-center flex flex-col gap-2 p-2 bg-" + previewPost.color
        }
      >
        <form
          onSubmit={handleSubmit(handleAddHue)}
          className="w-full flex flex-col justify-center gap-2"
        >
          <input
            {...register("hex_code")}
            type="text"
            id="hue"
            placeholder="Hexcode"
            onChange={(evt) => handleUpdateColor(evt.target.value)}
          />
          <button className="bg-white text-black" disabled={!isValid}>
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostHue;
