import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Post from "./Post";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";

const schema = z.object({
  hex_code: z
    .string()
    .max(6)
    .min(6)
    .regex(/^[0-9A-F]{6}$/i),
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
    mode: "onBlur",
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

    newPost.color = `#${color}`.toLowerCase();
    setPreviewPost(newPost);
  };

  const handleAddHue = (data: FieldValues) => {
    if (!data.hex_code) {
      alert("Invalid hex code!");
      return;
    }

    addHue("#" + data.hex_code, userId);
  };

  return (
    <div className="w-full py-2 h-full flex justify-center flex-grow-0 bg-transparent max-w-fit">
      <div
        id="preview-box"
        className={
          "flex flex-col h-fit gap-2 relative items-center justify-center pt-16 pb-4 rounded-lg border-2 shadow-black shadow-lg"
        }
      >
        <h2 className="absolute top-4 font-heading font-bold text-white text-4xl">
          New Hue
        </h2>
        {
          <Post
            post={previewPost}
            isPreview={true}
            canDelete={false}
            handleDelete={() => {}}
            handleLikeUnlike={() => {}}
            liked={false}
          />
        }

        <div
          className={
            " w-full justify-center items-center flex flex-col gap-2 p-2 bg-" +
            previewPost.color
          }
        >
          <form
            onSubmit={handleSubmit(handleAddHue)}
            className="flex flex-col justify-center gap-2"
          >
            <span
              className={
                "bg-transparent flex flex-row gap-[2px] border-2 justify-center w-full rounded-full px-2 active:border-red-400 focus-within:border-red-400 hover:cursor-text overflow-hidden text-white"
              }
              onClickCapture={(e) => {
                (e.currentTarget.childNodes[1] as HTMLElement).focus();
              }}
            >
              <p className="">#</p>
              <input
                {...register("hex_code")}
                type="text"
                id="hue"
                placeholder="Hexcode"
                onChangeCapture={(e) =>
                  handleUpdateColor(e.currentTarget.value)
                }
                className="focus:outline-none bg-transparent autofill:bg-transparent block w-1/3"
                maxLength={6}
              />
            </span>
            <button
              className="bg-gradient-to-r shadow-md shadow-black from-orange-500 via-pink-500 to-purple-500 text-white h-fit py-2 px-4 rounded-lg disabled:from-gray-800 disabled:to-gray-900"
              disabled={!isValid}
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostHue;
