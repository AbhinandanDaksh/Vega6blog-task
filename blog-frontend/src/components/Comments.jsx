import React, { useEffect, useState } from 'react';
import API from '../services/api';

function Comments({ blogId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [replyTo, setReplyTo] = useState(null);

  const fetchComments = async () => {
    try {
      const res = await API.get(`/comments/${blogId}`);
      setComments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text) return;
    try {
      await API.post(`/comments/${blogId}`, { text, parentCommentId: replyTo });
      setText('');
      setReplyTo(null);
      fetchComments();
    } catch (err) {
      console.error(err);
    }
  };

  const renderComments = (parentId = null, level = 0) => {
    return comments
      .filter(c => (c.parentCommentId ? c.parentCommentId === parentId : parentId === null))
      .map(c => (
        <div
          key={c._id}
          className={`ml-${level * 6} mb-4 p-3 border-l-2 border-gray-300 rounded`}
        >
          <p className="text-gray-800">
            <span className="font-semibold">{c.userId.email}</span>: {c.text}
          </p>
          <div className="mt-1">
            <button
              onClick={() => setReplyTo(c._id)}
              className="text-blue-600 hover:underline text-sm mr-2"
            >
              Reply
            </button>
          </div>
          {renderComments(c._id, level + 1)}
        </div>
      ));
  };

  return (
    <div className="mt-6">
      <h4 className="text-lg font-semibold mb-3">Comments</h4>
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          placeholder={replyTo ? "Replying..." : "Add a comment"}
          value={text}
          onChange={e => setText(e.target.value)}
          className="w-full border border-gray-300 rounded p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={3}
          required
        />
        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          >
            {replyTo ? "Reply" : "Comment"}
          </button>
          {replyTo && (
            <button
              type="button"
              onClick={() => setReplyTo(null)}
              className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div>{renderComments()}</div>
    </div>
  );
}

export default Comments;