import React from "react";

interface Post {
  color: string;
  username: string;
  likes: number;
  id: number;
  textColor: string;
}

interface Props {
  post: Post;
}

const Post = (props: Props) => {
  return (
    <div>
      <div
        className="flex flex-col h-64 aspect-square rounded-3xl text-center justify-center items-center bg-"
        style={{
          backgroundColor: props.post.color,
          color: props.post.textColor,
        }}
      >
        <p className=" text-2xl opacity-80">{props.post.color}</p>
      </div>
      <p className="text-center text-white">{props.post.username}</p>
    </div>
  );
};

export default Post;
