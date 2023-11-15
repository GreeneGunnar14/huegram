import React from "react";

interface Post {
  color: string;
  username: string;
  likes: number;
  id: number;
}

interface Props {
  post: Post;
}

const Post = (props: Props) => {
  // Solution for determining lightness value comes from
  // https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color

  const r_num = Number("0x" + props.post.color.slice(1, 3));
  const g_num = Number("0x" + props.post.color.slice(3, 5));
  const b_num = Number("0x" + props.post.color.slice(5, 7));

  const hue_intensity = r_num * 0.299 + g_num * 0.587 + b_num * 0.114;

  const text_color = hue_intensity > 186 ? "#000000" : "#FFFFFF";

  return (
    <div>
      <div
        className="flex flex-col h-64 aspect-square rounded-3xl text-center justify-center items-center bg-"
        style={{
          backgroundColor: props.post.color,
          color: text_color,
        }}
      >
        <p className=" text-2xl opacity-80">{props.post.color}</p>
      </div>
      <p className="text-center text-white">{props.post.username}</p>
    </div>
  );
};

export default Post;
