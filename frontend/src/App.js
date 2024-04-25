import React, { useState, useEffect } from "react";
import "./App.css"; // Import optional stylesheet
import BlogPostList from "./components/BlogPostList";
import CreatePostForm from "./components/CreatePostForm";
import EditPostForm from "./components/EditPostForm";
import SinglePost from "./components/SinglePost"; // Optional component
import axios from "axios"; // Import axios for HTTP requests

function App() {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3000/posts"); // Replace with your backend URL
      setPosts(response.data);
    };
    fetchData();
  }, []);

  // CRUD operations using Axios and state management
  const handlePostCreate = async (newPost) => {
    try {
      const response = await axios.post("http://localhost:3000/posts", newPost);
      setPosts([...posts, response.data]); // Add new post to state
      setSelectedPostId(null); // Clear selected post ID
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handlePostUpdate = async (updatedPost) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/posts/${updatedPost.id}`,
        updatedPost
      );
      const updatedPosts = posts.map((post) =>
        post.id === updatedPost.id ? updatedPost : post
      );
      setPosts(updatedPosts);
      setSelectedPostId(null); // Clear selected post ID
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handlePostDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:3000/posts/${postId}`);
      const remainingPosts = posts.filter((post) => post.id !== postId);
      setPosts(remainingPosts);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handlePostSelection = (postId) => {
    setSelectedPostId(postId);
  };

  return (
    <div className="App">
      <h1>Blog Posts</h1>
      <BlogPostList
        posts={posts}
        onPostSelect={handlePostSelection}
        onPostDelete={handlePostDelete}
      />
      {selectedPostId && <SinglePost postId={selectedPostId} />}{" "}
      {/* Optional for single post view */}
      {selectedPostId ? (
        <EditPostForm
          post={posts.find((post) => post.id === selectedPostId)}
          onPostUpdate={handlePostUpdate}
        />
      ) : (
        <CreatePostForm onPostCreate={handlePostCreate} />
      )}
    </div>
  );
}

export default App;
