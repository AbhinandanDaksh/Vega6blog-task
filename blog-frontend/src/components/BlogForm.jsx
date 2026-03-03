import { useState, useEffect, useRef } from 'react';
import API from '../services/api';

function BlogForm({ fetchBlogs, editBlog, setEditBlog }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (editBlog) {
      setTitle(editBlog.title);
      setDescription(editBlog.description);
      setImage(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } else {
      setTitle('');
      setDescription('');
      setImage(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }, [editBlog]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image) formData.append('image', image);

    try {
      if (editBlog) {
        await API.put(`/blogs/${editBlog._id}`, formData);
        setEditBlog(null);
      } else {
        await API.post('/blogs', formData);
      }
    
      setTitle('');
      setDescription('');
      setImage(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      fetchBlogs();
    } catch (err) {
      alert(err.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded shadow mb-6 bg-white">
      <h3 className="text-xl font-semibold mb-4">{editBlog ? 'Edit Blog' : 'Add Blog'}</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="border p-2 w-full mb-3 rounded"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="border p-2 w-full mb-3 rounded"
        required
      />
      <input
        type="file"
        ref={fileInputRef}
        onChange={e => setImage(e.target.files[0])}
        className="mb-3"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {editBlog ? 'Update Blog' : 'Add Blog'}
      </button>
    </form>
  );
}

export default BlogForm;