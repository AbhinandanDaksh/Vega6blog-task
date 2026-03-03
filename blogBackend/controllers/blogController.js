const Blog = require('../models/Blog');


exports.createBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) return res.status(400).json({ message: 'All fields required' });

    // const image = req.file ? req.file.path : null;
    const image = req.file ? `blogs/${req.file.filename}` : null;

    const blog = new Blog({
      title,
      description,
      image,
      author: req.user.id
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isDeleted: false })
      .populate('author', 'email profileImage')
      .sort({ createdAt: -1 });

    res.json(blogs);
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};



exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'email profileImage');
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};


exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    blog.title = req.body.title || blog.title;
    blog.description = req.body.description || blog.description;
    if (req.file) blog.image = `blogs/${req.file.filename}`;

    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog || blog.isDeleted) 
      return res.status(404).json({ message: 'Blog not found' });

    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    blog.isDeleted = true; 
    await blog.save();

    res.json({ message: 'Blog deleted successfully (soft delete)' });
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};