import React from "react";

const BlogPostList = ({ posts, onPostSelect, onPostDelete }) => {
  return (
    <ul className="blog-posts">
      {!posts?.length && <p>Loading posts...</p>}{" "}
      {/* Display loading message if posts is empty */}
      {posts?.map((post) => (
        <li key={post.id} className="blog-post">
          <h3>{post?.title}</h3> {/* Use optional chaining for title */}
          <p>{post?.content?.substring(0, 100)}...</p>{" "}
          {/* Optional chaining for content */}
          <button onClick={() => onPostSelect(post?.id)}>View Details</button>
          <button onClick={() => onPostDelete(post.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default BlogPostList;
