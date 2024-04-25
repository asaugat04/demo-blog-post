import React, { useState, useEffect } from "react";
import axios from "axios";

const SinglePost = ({ postId }) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (postId) {
        const response = await axios.get(
          `http://localhost:3000/posts/${postId}`
        );
        setPost(response.data);
      }
    };
    fetchData();
  }, [postId]); // Re-fetch post data if postId changes

  return (
    <div>
      {post && (
        <>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </>
      )}
    </div>
  );
};

export default SinglePost;
