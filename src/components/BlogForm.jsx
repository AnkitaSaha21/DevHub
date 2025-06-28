import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";

export default function BlogForm({ defaultValues, onSubmit }) {
  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues,
  });

  const markdown = watch("content");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10"
    >
      {/* 📝 Blog Editor */}
      <div className="space-y-6">
        {/* Title Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Blog Title
          </label>
          <input
            {...register("title", { required: true })}
            placeholder="Give your blog an interesting title..."
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Markdown Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Blog Content (Markdown Supported)
          </label>
          <textarea
            {...register("content", { required: true })}
            placeholder="Write your blog content in Markdown..."
            rows={14}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition-all duration-200"
        >
          {defaultValues ? "Update" : "Publish"} Blog
        </button>
      </div>

      {/* 📄 Live Markdown Preview */}
      <div className="border border-gray-300 dark:border-gray-700 p-6 rounded-lg bg-gray-50 dark:bg-gray-800 shadow overflow-auto max-h-[600px] prose dark:prose-invert max-w-none">
        <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">
          Live Preview
        </h2>
        {markdown ? (
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => (
                <h1 className="text-3xl font-bold mt-4 mb-2" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-2xl font-semibold mt-3 mb-2" {...props} />
              ),
              p: ({ node, ...props }) => (
                <p
                  className="my-2 leading-relaxed text-gray-800 dark:text-gray-300"
                  {...props}
                />
              ),
              code: ({ node, ...props }) => (
                <code
                  className="bg-gray-100 dark:bg-gray-700 text-sm px-1 py-0.5 rounded"
                  {...props}
                />
              ),
              pre: ({ node, ...props }) => (
                <pre
                  className="bg-gray-900 text-white text-sm p-4 rounded overflow-x-auto my-3"
                  {...props}
                />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc pl-6 my-2" {...props} />
              ),
              li: ({ node, ...props }) => <li className="mb-1" {...props} />,
              a: ({ node, ...props }) => (
                <a
                  className="text-blue-600 underline hover:text-blue-800"
                  {...props}
                />
              ),
            }}
          >
            {markdown}
          </ReactMarkdown>
        ) : (
          <p className="text-gray-400 dark:text-gray-400 italic">
            Start typing to see preview...
          </p>
        )}
      </div>
    </form>
  );
}
