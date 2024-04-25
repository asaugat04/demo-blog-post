import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function BlogDetails() {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:6969/posts/${id}`)
      .then((response) => response.json())
      .then((data) => setPost(data));
  }, [id]);

  return (
    <div className="mainContainer">
      {post ? (
        <div>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
          <Link to={`/edit/${post.id}`}>Edit</Link>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default BlogDetails;
