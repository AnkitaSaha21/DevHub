import { useParams, Link } from "react-router-dom";
import { Github, Linkedin } from "lucide-react";
import { useSelector } from "react-redux";

export default function DeveloperProfile() {
  const { id } = useParams();
  const developers = useSelector((state) => state.developers);
  const blogs = useSelector((state) => state.blogs);

  const developer = developers.find((dev) => dev.id === id);
  const devBlogs = blogs.filter((blog) => blog.userId === developer?.id);

  if (!developer) {
    return (
      <h2 className="text-center mt-10 text-red-500 font-semibold">
        Developer not found
      </h2>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full bg-white dark:bg-gray-900 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-xl shadow-lg">
        {/* 👤 Profile Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={developer.avatar}
            alt={developer.name}
            className="w-28 h-28 rounded-full shadow-lg border-4 border-white dark:border-gray-700"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {developer.name}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{developer.bio}</p>

            {/* 🔗 Social Links */}
            <div className="flex flex-wrap gap-4 justify-center sm:justify-start mt-3">
              {developer.social.github && (
                <a
                  href={developer.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  <Github className="w-4 h-4" /> GitHub
                </a>
              )}
              {developer.social.linkedin && (
                <a
                  href={developer.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>

        {/* 🏷️ Skills */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {developer.skills.map((skill) => (
              <span
                key={skill}
                className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs px-3 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* ✍️ Blog Posts */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-4">Blog Posts</h3>
          {devBlogs.length > 0 ? (
            <div className="space-y-4">
              {devBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm transition"
                >
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {blog.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    Published on {blog.date}
                  </p>
                  <Link
                    to={`/blog/${blog.id}`}
                    className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm italic text-gray-500 dark:text-gray-400">
              No blog posts yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
