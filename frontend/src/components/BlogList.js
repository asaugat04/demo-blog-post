import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

function BlogList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:6969/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div>
      <h1>Blog Posts</h1>
      <ul className="blogItems">
        <div style={{ width: "fit-content", margin: "auto" }}>
          {posts.map((post) => (
            <Link to={`/posts/${post.id}`} key={post.id} style={{ margin: 10 }}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {post.content.slice(0, 100) +
                        (post.content.length > 100 ? "..." : "")}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          ))}
        </div>
      </ul>
      <Link className="newPost" to="/new">
        Create New Post
      </Link>
    </div>
  );
}

export default BlogList;
