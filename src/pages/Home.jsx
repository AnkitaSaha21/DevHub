import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import {
  UserCircle,
  NotebookText,
  LogIn,
  LogOut,
  UserPlus,
  Sun,
  Moon
} from "lucide-react";

export default function Home() {
 

  return (

    
      <div className="transition-colors duration-300 bg-white text-black dark:bg-gray-900 dark:text-white">

      {/* ✨ Hero Section */}
      <section className="text-center py-28 px-4">
        <h2 className="text-3xl mb-4 text-blue-300">Welcome to DevHub !</h2>
        <h1 className="text-5xl font-extrabold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600 dark:from-blue-300 dark:via-purple-300 dark:to-indigo-300">
          Connect. Share. Inspire.
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
          DevHub is your platform to discover skilled developers, explore insightful blogs, and showcase your tech journey.
        </p>

        <div className="flex justify-center gap-6 flex-wrap">
          <Link
            to="/developers"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition transform hover:-translate-y-1 flex items-center gap-2"
          >
            <UserCircle className="w-5 h-5" /> Explore Developers
          </Link>
          <Link
            to="/blogs"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md transition transform hover:-translate-y-1 flex items-center gap-2"
          >
            <NotebookText className="w-5 h-5" /> Read Blogs
          </Link>
        </div>
      </section>
      </div>

  );
}
