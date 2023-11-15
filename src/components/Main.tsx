import React from "react";
import Post from "./Post";
import PostHue from "./PostHue";

interface Props {
  posts: Post[];
  addHue: (color: string) => void;
}

const Main = ({ posts, addHue }: Props) => {
  return (
    <div className="flex flex-wrap w-full justify-center gap-8 overflow-y-auto">
      <PostHue addHue={addHue} />
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};

export default Main;
