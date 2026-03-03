import { useEffect, useState } from "react";
import API from "../services/api";
import BlogList from "../components/BlogList";
import BlogForm from "../components/BlogForm";

function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [editBlog, setEditBlog] = useState(null); 
  const profileImage = localStorage.getItem("profileImage");
  console.log(profileImage);
  const fetchBlogs = async () => {
    const res = await API.get("/blogs");
    setBlogs(res.data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    
    <div className="p-6">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>

        {profileImage && (
          <img
            src={`http://localhost:5000/uploads/${profileImage}`}
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
        )}
      </header>

      <BlogForm
        fetchBlogs={fetchBlogs}
        editBlog={editBlog}
        setEditBlog={setEditBlog}
      />
      <BlogList
        blogs={blogs}
        fetchBlogs={fetchBlogs}
        setEditBlog={setEditBlog}
      />
    </div>
  );
}

export default Dashboard;
