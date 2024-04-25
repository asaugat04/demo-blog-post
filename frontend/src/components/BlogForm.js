import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function BlogForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const isNewPost = !id;

  useEffect(() => {
    if (!isNewPost) {
      fetch(`http://localhost:6969/posts/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setTitle(data.title);
          setContent(data.content);
        })
        .catch((error) => console.error("Error:", error));
    }
  }, [id, isNewPost]);

  const handleSubmit = () => {
    const method = isNewPost ? "POST" : "PUT";
    const url = `http://localhost:6969/posts${isNewPost ? "" : "/" + id}`;
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => {
        navigate(isNewPost ? "/" : `/posts/${id}`);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  const handleDelete = () => {
    const method = "DELETE";
    const url = `http://localhost:6969/posts/${id}`;
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return (
    <div className="mainContainer">
      <h1>{isNewPost ? "Create New Post" : "Edit Post"}</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Title:
          <input
            type
            of="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Content:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit" onClick={handleSubmit}>
          {isNewPost ? "Create" : "Update"}
        </button>
        {!isNewPost && <button onClick={handleDelete}>Delete</button>}
      </form>
    </div>
  );
}

export default BlogForm;
