import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { PencilLine, Edit2 } from "lucide-react";
import { useSelector } from "react-redux";

export default function BlogList() {
  const { user } = useAuth();
  const blogs = useSelector((state) => state.blogs);
  const developers = useSelector((state) => state.developers); // 👈 get from Redux now

  return (
    <div className=" bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* ✍️ Write Blog Button */}
        {user && (
          <div className="flex justify-end mb-6">
            <Link
              to="/create-blog"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow transition"
            >
              <PencilLine className="w-4 h-4" />
              Write Blog
            </Link>
          </div>
        )}

        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-8 text-center">
          All Blog Posts
        </h1>

        {/* 📝 Blog Cards */}
        <div className="space-y-6">
          {blogs.map((blog) => {
            const author = developers.find((d) => d.id === blog.userId);
            const isAuthor = user && blog.userId === user.uid;

            return (
              <div
                key={blog.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-1">
                      {blog.title}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      By {author?.name} · {blog.date}
                    </p>
                  </div>

                  {isAuthor && (
                    <Link
                      to={`/edit-blog/${blog.id}`}
                      className="flex items-center gap-1 text-sm bg-blue-400 hover:bg-blue-500 text-white px-3 py-1 rounded-md transition"
                    >
                      <Edit2 className="w-4 h-4" /> Edit
                    </Link>
                  )}
                </div>

                <Link
                  to={`/blog/${blog.id}`}
                  className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                >
                  Read Full Post →
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
