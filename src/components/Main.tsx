import React from "react";
import Post from "./Post";

interface Props {
  posts: Post[];
}

const Main = (props: Props) => {
  return (
    <div className="flex flex-wrap w-full justify-center gap-8 overflow-y-auto">
      {props.posts.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
};

export default Main;
