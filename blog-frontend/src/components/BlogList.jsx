import React, { useState } from 'react';
import API from '../services/api';

function BlogList({ blogs, fetchBlogs, setEditBlog }) {
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await API.delete(`/blogs/${id}`);
        fetchBlogs();
      } catch (err) {
        alert(err.response?.data?.message || 'Error occurred');
      }
    }
  };

  const handleEdit = (blog) => {
    setEditBlog(blog);
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  const handleView = (blog) => {
    setSelectedBlog(blog); 
  };

  const closeModal = () => setSelectedBlog(null);

  return (
    <>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Image</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map(blog => (
            <tr key={blog._id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{blog.title.slice(0, 50)}...</td>
              <td className="border px-4 py-2">
                {blog.image && (
                  <img
                    src={`http://localhost:5000/uploads/${blog.image}`}
                    alt="blog"
                    className="w-24"
                  />
                )}
              </td>
              <td className="border px-4 py-2">{blog.description.slice(0, 50)}...</td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  onClick={() => handleView(blog)}
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                >
                  View
                </button>
                <button
                  onClick={() => handleEdit(blog)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
   {selectedBlog && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
    <div className="bg-white p-6 rounded shadow-lg w-11/12 md:w-2/3 lg:w-1/2 max-h-[90vh] relative overflow-y-auto">
      <button
        onClick={closeModal}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
      >
        ✖
      </button>
      <h2 className="text-2xl font-bold mb-4">{selectedBlog.title}</h2>
      {selectedBlog.image && (
        <img
          src={`http://localhost:5000/uploads/${selectedBlog.image}`}
          alt={selectedBlog.title}
          className="w-full h-auto max-h-96 object-cover rounded mb-4"
        />
      )}
      <div className="text-gray-700 overflow-y-auto" style={{ maxHeight: '60vh' }}>
        {selectedBlog.description.split('\n').map((line, i) => (
          <p key={i} className="mb-2">{line}</p>
        ))}
      </div>
    </div>
  </div>
)}
    </>
  );
}

export default BlogList;