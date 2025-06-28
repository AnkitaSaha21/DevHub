import {
    LogIn,
    LogOut,
    Moon,
    NotebookText,
    Sun,
    UserCircle,
    UserPlus,
    Menu,
    X
  } from "lucide-react";
  import { Link, NavLink } from "react-router-dom";
  import { useAuth } from "../context/AuthContext";
  import { useTheme } from "../context/ThemeContext";
  import { useState } from "react";
  
  export default function NavBar() {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
    return (
      <nav className="bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link
              to="/"
              className="text-2xl font-bold tracking-tight text-blue-600 dark:text-blue-400"
            >
              DevHub
            </Link>
  
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-5 text-sm font-medium">
              <NavLinks user={user} logout={logout} />
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-gray-800 dark:text-gray-100 shadow hover:scale-105 transition"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4 inline" />
                ) : (
                  <Moon className="w-4 h-4 inline" />
                )}
              </button>
            </div>
  
            {/* Mobile Toggle Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-800 dark:text-gray-200"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
  
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pb-4">
            <div className="flex flex-col gap-4 text-sm font-medium">
              <NavLinks user={user} logout={() => {
                logout();
                setMobileMenuOpen(false);
              }} />
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-gray-800 dark:text-gray-100 shadow hover:scale-105 transition"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />} Toggle Theme
              </button>
            </div>
          </div>
        )}
      </nav>
    );
  }
  
  function NavLinks({ user, logout }) {
    return (
      <>
        <NavLinkItem to="/developers" icon={<UserCircle className="w-4 h-4" />} label="Developers" />
        <NavLinkItem to="/blogs" icon={<NotebookText className="w-4 h-4" />} label="Blogs" />
  
        {!user ? (
          <>
            <NavLinkItem to="/login" icon={<LogIn className="w-4 h-4" />} label="Login" color="green" />
            <NavLinkItem to="/register" icon={<UserPlus className="w-4 h-4" />} label="Register" color="green" />
          </>
        ) : (
          <button
            onClick={logout}
            className="flex items-center gap-1 text-red-500 dark:text-red-400 hover:text-red-400 transition"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        )}
      </>
    );
  }
  
  function NavLinkItem({ to, icon, label, color = "blue" }) {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center gap-1 transition ${
            isActive
              ? `text-${color}-600 dark:text-${color}-400 font-semibold`
              : `text-gray-800 dark:text-gray-200 hover:text-${color}-500 dark:hover:text-${color}-300`
          }`
        }
      >
        {icon} {label}
      </NavLink>
    );
  }
  