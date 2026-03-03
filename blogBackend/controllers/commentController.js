const Comment = require('../models/Comment');


exports.addComment = async (req, res) => {
  try {
    const { text, parentCommentId } = req.body;
    if (!text) return res.status(400).json({ message: 'Comment cannot be empty' });

    const comment = new Comment({
      blogId: req.params.blogId,
      userId: req.user.id,
      text,
      parentCommentId: parentCommentId || null
    });

    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};


exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ blogId: req.params.blogId })
      .populate('userId', 'email profileImage')
      .sort({ createdAt: 1 });
    res.json(comments);
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};