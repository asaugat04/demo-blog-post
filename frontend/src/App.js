import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BlogList from "./components/BlogList";
import BlogDetails from "./components/BlogDetails";
import BlogForm from "./components/BlogForm";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <a href="/" className="mainHeader">
          BlogWebsite
        </a>
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/posts/:id" element={<BlogDetails />} />
          <Route path="/new" element={<BlogForm />} />
          <Route path="/edit/:id" element={<BlogForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
