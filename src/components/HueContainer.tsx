import React from "react";
import Post from "./Post";

interface Props {
  posts: Post[];
}

const HueContainer = ({ posts }: Props) => {
  return posts.map((post) => {
    return <Post post={post} key={post.id} />;
  });
};

export default HueContainer;
