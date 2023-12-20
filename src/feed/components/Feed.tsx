import React from "react";
import Post from "./Post";
import { POSTS } from "../utils/constants";

const Feed = () => {
  return (
    <div className="space-y-4 px-4">
      {POSTS.map((post, idx) => (
        <Post
          key={idx}
          title={post.title}
          description={post.description}
          date={post.date}
        />
      ))}
    </div>
  );
};

export default Feed;
