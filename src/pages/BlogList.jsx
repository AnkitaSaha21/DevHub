import { useState } from "react";
import { Link } from "react-router-dom";
import { PencilLine, Edit2, Trash2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { deleteBlog } from "../features/blogSlice";
import BlogCard from "../components/BlogCard";

export default function BlogList() {
  const { user } = useAuth();
  const blogs = useSelector((state) => state.blogs);
  const developers = useSelector((state) => state.developers);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("all");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const allBlogs = blogs;
  const myBlogs = user ? blogs.filter((b) => b.userId === user.uid) : [];

  const blogList = activeTab === "all" ? allBlogs : myBlogs;

  const handleDelete = (id) => {
    dispatch(deleteBlog(id));
    setConfirmDeleteId(null);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-12 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Write Blog Button */}
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

        {/* Toggle Tabs */}
        {user ? (
          <div className="flex justify-center mb-10">
            <div className="inline-flex rounded-md overflow-hidden border border-blue-600 dark:border-blue-400">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-6 py-2 text-sm font-medium transition-all ${
                  activeTab === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400"
                }`}
              >
                All Blogs
              </button>
              <button
                onClick={() => setActiveTab("my")}
                className={`px-6 py-2 text-sm font-medium transition-all ${
                  activeTab === "my"
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400"
                }`}
              >
                My Blogs
              </button>
            </div>
          </div>
        ) : (
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-8 text-center">
            All Blog Posts
          </h1>
        )}

        {/* Blog Cards */}
        {blogList.length > 0 ? (
          <div className="space-y-6">
            {blogList.map((blog) => {
              const author = developers.find((d) => d.id === blog.userId);
              const isAuthor = user && blog.userId === user.uid;

              return (
                <BlogCard
                  key={blog.id}
                  blog={blog}
                  author={author}
                  isAuthor={isAuthor}
                  onDelete={() => setConfirmDeleteId(blog.id)}
                />
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 italic mt-10">
            {activeTab === "my"
              ? "You haven't posted any blogs yet."
              : "No blog posts found."}
          </p>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 text-center">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Are you sure you want to delete this blog?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDeleteId)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// function BlogCard({ blog, author, isAuthor, onDelete }) {
//     return (
//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition">
//         <div className="flex justify-between items-start">
//           <div>
//             <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-1">
//               {blog.title}
//             </h2>
//             <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
//               By {author?.name || "Unknown"} · {blog.date}
//             </p>
//           </div>
  
//           {isAuthor && (
//             <div className="flex gap-2">
//               {/* Edit Button */}
//               <Link
//                 to={`/edit-blog/${blog.id}`}
//                 className="flex items-center justify-center text-sm bg-blue-400 hover:bg-blue-500 text-white px-2 py-1 rounded-md transition"
//               >
//                 <Edit2 className="w-4 h-4" />
//                 <span className="hidden sm:inline ml-1">Edit</span>
//               </Link>
  
//               {/* Delete Button */}
//               <button
//                 onClick={onDelete}
//                 className="flex items-center justify-center text-sm bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md transition"
//               >
//                 <Trash2 className="w-4 h-4" />
//                 <span className="hidden sm:inline ml-1">Delete</span>
//               </button>
//             </div>
//           )}
//         </div>
  
//         <Link
//           to={`/blog/${blog.id}`}
//           className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
//         >
//           Read Full Post →
//         </Link>
//       </div>
//     );
//   }
  
