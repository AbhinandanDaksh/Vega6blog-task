import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';
import Comments from './Comments';

function BlogView() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  const fetchBlog = async () => {
    try {
      const res = await API.get(`/blogs/${id}`);
      setBlog(res.data);
    } catch (err) {
      alert('Blog not found');
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  if (!blog) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded mt-6">
      <h2 className="text-3xl font-bold mb-4">{blog.title}</h2>

      {blog.image && (
        <img
          src={`http://localhost:5000/uploads/${blog.image}`}
          alt={blog.title}
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}

      <p className="text-gray-700 mb-6">{blog.description}</p>

      <hr className="my-6" />

      <Comments blogId={blog._id} />
    </div>
  );
}

export default BlogView;