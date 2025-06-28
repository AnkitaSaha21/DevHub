import { useState } from "react";
//import developers from "../data/developers";
import DeveloperCard from "../components/DeveloperCard";
import { Search, Filter } from "lucide-react";
import { useSelector } from "react-redux";

export default function DeveloperList() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const developers = useSelector((state) => state.developers);

  const filtered = developers.filter((dev) => {
    const matchesSearch = dev.name.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === "All" || dev.skills.includes(filter);
    return matchesSearch && matchesFilter;
  });

  const skillOptions = [
    "All",
    "React",
    "Node",
    "Tailwind",
    "MongoDB",
    "Express",
    "JavaScript",
    "HTML",
    "CSS",
    "Vue.js",
    "Angular",
    "Bootstrap",
    "Java",
    "C++",
    "C",
    "Python",
    "Django",
    "Redux",
    "GraphQL",
    "SQL",
    "PHP",
    ".Net",
    "Next.js",
    "TypeScript",
  ];

  return (
    <div className=" bg-white-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-8">
          Developer Directory
        </h1>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-10">
          <div className="flex items-center gap-2 w-full sm:w-2/3">
            <Search className="w-5 h-5 text-gray-500 dark:text-gray-300" />
            <input
              type="text"
              placeholder="Search developers by name..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 rounded px-4 py-2 bg-white dark:bg-gray-800 text-sm shadow-sm placeholder-gray-400 dark:placeholder-gray-500 text-black dark:text-white"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-1/3">
            <Filter className="w-5 h-5 text-gray-500 dark:text-gray-300" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 rounded px-4 py-2 bg-white dark:bg-gray-800 text-sm shadow-sm text-black dark:text-white"
            >
              {skillOptions.map((skill) => (
                <option key={skill}>{skill}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filtered.map((dev) => (
              <DeveloperCard key={dev.id} dev={dev} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
            No developers match your search.
          </p>
        )}
      </div>
    </div>
  );
}
