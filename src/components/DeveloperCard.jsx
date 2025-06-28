import { Link } from "react-router-dom";

export default function DeveloperCard({ dev }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 shadow-md rounded-2xl hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
      <img
        src={dev.avatar}
        alt={dev.name}
        className="w-24 h-24 rounded-full shadow-md border-4 border-white dark:border-gray-700 -mt-12 mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{dev.name}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{dev.bio}</p>

      <div className="flex flex-wrap justify-center mt-3 gap-2">
        {dev.skills.map((skill) => (
          <span
            key={skill}
            className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-medium px-3 py-1 rounded-full shadow-sm"
          >
            {skill}
          </span>
        ))}
      </div>

      <Link
        to={`/developer/${dev.id}`}
        className="mt-5 inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-full shadow transition-transform hover:-translate-y-1"
      >
        View Profile
      </Link>
    </div>
  );
}
