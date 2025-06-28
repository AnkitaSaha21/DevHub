import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addComment } from "../features/commentSlice";

export default function BlogDetail() {
  const { id } = useParams();
  const blogs = useSelector((state) => state.blogs);
  const developers = useSelector((state) => state.developers);
  const blog = blogs.find((b) => b.id === id);
  const author = developers.find((d) => d.id === blog?.userId);
  const { user } = useAuth();
  const comments = useSelector((state) => state.comments);
  const relatedComments = comments.filter((c) => c.blogId === blog?.id);
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  if (!blog)
    return (
      <h2 className="text-center mt-10 text-red-500 font-semibold">
        Blog not found
      </h2>
    );

  const handleComment = () => {
    if (!text.trim()) return;
    dispatch(
      addComment({
        id: uuidv4(),
        blogId: blog.id,
        user: developers.find((d) => d.id === user.uid)?.name || "Anonymous",
        text,
        date: new Date().toISOString().split("T")[0],
      })
    );
    setText("");
    alert("Comment added (mock only)");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full px-4 py-10 bg-white dark:bg-gray-900">
      <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg rounded-xl transition">
        {/* 📝 Blog Header */}
        <h1 className="text-3xl font-extrabold mb-2 text-blue-600 dark:text-blue-400 leading-snug">
          {blog.title}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          By {author?.name} • {blog.date}
        </p>
        <hr className="my-4 border-gray-300 dark:border-gray-700" />

        {/* 📄 Blog Content */}
        <div className="prose prose-blue dark:prose-invert max-w-none text-justify">
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => (
                <h1 className="text-2xl font-bold mt-6 mb-2" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-xl font-semibold mt-5 mb-2" {...props} />
              ),
              p: ({ node, ...props }) => (
                <p className="my-2 leading-relaxed" {...props} />
              ),
              code: ({ node, ...props }) => (
                <code
                  className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded"
                  {...props}
                />
              ),
              pre: ({ node, ...props }) => (
                <pre
                  className="bg-gray-100 dark:bg-gray-900 p-3 my-4 overflow-x-auto rounded text-sm"
                  {...props}
                />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc pl-5 space-y-1" {...props} />
              ),
              li: ({ node, ...props }) => (
                <li className="text-sm leading-relaxed" {...props} />
              ),
            }}
          >
            {blog.content}
          </ReactMarkdown>
        </div>

        {/* 💬 Comments Section */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-3">Comments</h3>

          {relatedComments.length > 0 ? (
            relatedComments.map((c) => (
              <div
                key={c.id}
                className="mb-4 border-b border-gray-200 dark:border-gray-700 pb-3"
              >
                <p className="text-sm text-gray-800 dark:text-gray-200">
                  {c.text}
                </p>
                <p className="text-xs text-gray-500">
                  — {c.user}, {c.date}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 italic mb-4">
              No comments yet. Be the first to share your thoughts!
            </p>
          )}

          {/* 🧑‍💬 Add Comment */}
          {user ? (
            <div className="mt-4">
              <textarea
                className="w-full bg-gray-100 dark:bg-gray-700 text-sm text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600 p-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Write a comment..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button
                onClick={handleComment}
                className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
              >
                Post Comment
              </button>
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic mt-4">
              Login to post a comment.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
