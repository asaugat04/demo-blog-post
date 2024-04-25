const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = process.env.PORT || 3000;

// Connect to SQLite database
const db = new sqlite3.Database("./blog.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }
  console.log("Connected to the SQLite database.");
});

// Initialize the database (create table if it doesn't exist)
db.run(
  "CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, content TEXT NOT NULL, date TIMESTAMP DEFAULT CURRENT_TIMESTAMP)"
);

// Define a simple blog post model using a regular function as a constructor
function Post(title, content) {
  this.title = title;
  this.content = content;
}

// Middleware to parse JSON body data
app.use(express.json());

// API endpoint to get all blog posts
app.get("/posts", (req, res) => {
  db.all("SELECT * FROM posts", (err, rows) => {
    if (err) {
      res.status(500).json({ message: "Error fetching posts" });
    } else {
      res.json(rows);
    }
  });
});

// API endpoint to get a single blog post
app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM posts WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(404).json({ message: "Post not found" });
    } else {
      res.json(row);
    }
  });
});

// API endpoint to create a new blog post
app.post("/posts", (req, res) => {
  const { title, content } = req.body;
  const newPost = new Post(title, content); // Use `new` to create a Post instance
  db.run(
    "INSERT INTO posts (title, content) VALUES (?, ?)",
    [newPost.title, newPost.content],
    (err) => {
      if (err) {
        res.status(500).json({ message: "Error creating post" });
      } else {
        res.status(201).json({ message: "Post created successfully" });
      }
    }
  );
});

// API endpoint to update a blog post
app.put("/posts/:id", (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  db.run(
    "UPDATE posts SET title = ?, content = ? WHERE id = ?",
    [title, content, id],
    (err) => {
      if (err) {
        res.status(500).json({ message: "Error updating post" });
      } else {
        res.json({ message: "Post updated successfully" });
      }
    }
  );
});

// API endpoint to delete a blog post
app.delete("/posts/:id", (req, res) => {
  const id = req.params.id;
  db.run("DELETE FROM posts WHERE id = ?", [id], (err) => {
    if (err) {
      res.status(500).json({ message: "Error deleting post" });
    } else {
      res.json({ message: "Post deleted successfully" });
    }
  });
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
