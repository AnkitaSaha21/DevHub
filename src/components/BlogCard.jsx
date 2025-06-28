import { Edit2, Trash2 } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';

const BlogCard = ({ blog, author, isAuthor, onDelete }) => {
 
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-1">
                {blog.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                By {author?.name || "Unknown"} · {blog.date}
              </p>
            </div>
    
            {isAuthor && (
              <div className="flex gap-2">
                {/* Edit Button */}
                <Link
                  to={`/edit-blog/${blog.id}`}
                  className="flex items-center justify-center text-sm bg-blue-400 hover:bg-blue-500 text-white px-2 py-1 rounded-md transition"
                >
                  <Edit2 className="w-4 h-4" />
                  <span className="hidden sm:inline ml-1">Edit</span>
                </Link>
    
                {/* Delete Button */}
                <button
                  onClick={onDelete}
                  className="flex items-center justify-center text-sm bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md transition"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="hidden sm:inline ml-1">Delete</span>
                </button>
              </div>
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
  
}

export default BlogCard
