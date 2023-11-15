import React from "react";

interface Post {
  color: string;
  username: string;
  likes: number;
}

interface Props {
  post: Post;
}

const Post = (props: Props) => {
  return (
    <div
      className="flex flex-col h-64 aspect-square rounded-3xl text-center justify-between items-center"
      style={{ backgroundColor: props.post.color }}
    >
      <p className="text-white text-2xl opacity-80">{props.post.color}</p>

      <p>{props.post.username}</p>
    </div>
  );
};

export default Post;
