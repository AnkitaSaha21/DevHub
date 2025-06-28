import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import BlogForm from "../components/BlogForm";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addBlog, updateBlog } from "../features/blogSlice";

export default function CreateBlog() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const existingBlog = useSelector((state) =>
    state.blogs.find((b) => b.id === id)
  );

  const isEdit = Boolean(id && existingBlog);

  const handleSubmit = (data) => {
    if (isEdit) {
      dispatch(
        updateBlog({
          ...existingBlog,
          title: data.title,
          content: data.content,
        })
      );
      alert("✅ Blog updated successfully!");
    } else {
      const newBlog = {
        id: uuidv4(),
        userId: user.uid,
        title: data.title,
        content: data.content,
        date: new Date().toISOString().split("T")[0],
      };
      dispatch(addBlog(newBlog));
      alert("✅ Blog created successfully!");
    }
    navigate("/blogs");
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 mb-2">
            {isEdit ? "✏️ Edit Blog" : "✍️ Write a New Blog"}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm max-w-xl mx-auto">
            {isEdit
              ? "Make changes to your existing blog post."
              : "Share your thoughts, stories, and tech insights with the world."}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transition-all">
          <BlogForm onSubmit={handleSubmit} defaultValues={existingBlog} />
        </div>
      </div>
    </div>
  );
}
