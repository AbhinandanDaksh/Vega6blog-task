import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function BlogListPage() {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const res = await API.get("/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <div key={blog._id} className="border rounded shadow p-4 bg-white">
            {blog.image && (
              <img
                src={`http://localhost:5000/uploads/${blog.image}`}
                alt={blog.title}
                className="w-full h-48 object-cover mb-2 rounded"
              />
            )}
            <h3 className="font-semibold text-lg">{blog.title}</h3>
            <p className="text-gray-700 mt-1">
              {blog.description.slice(0, 100)}...
            </p>
            <Link
              to={`/blogs/${blog._id}`}
              className="text-blue-600 mt-2 inline-block hover:underline"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogListPage;
