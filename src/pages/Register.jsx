import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { addDevelopers } from "../features/developerSlice";
import Select from "react-select";
import { useTheme } from "../context/ThemeContext";

export default function Register() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { theme } = useTheme();;

  const skillsOptions = [
    { value: "React", label: "React" },
    { value: "Node", label: "Node" },
    { value: "Tailwind", label: "Tailwind" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "Express", label: "Express" },
    { value: "JavaScript", label: "JavaScript" },
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "Vue.js", label: "Vue.js" },
    { value: "Angular", label: "Angular" },
    { value: "Bootstrap", label: "Bootstrap" },
    { value: "Java", label: "Java" },
    { value: "C++", label: "C++" },
    { value: "C", label: "C" },
    { value: "Python", label: "Python" },
    { value: "Django", label: "Django" },
    { value: "Redux", label: "Redux" },
    { value: "GraphQL", label: "GraphQL" },
    { value: "SQL", label: "SQL" },
    { value: "PHP", label: "PHP" },
    { value: ".Net", label: ".Net" },
    { value: "Next.js", label: "Next.js" },
    { value: "TypeScript", label: "TypeScript" },
  ];

  const onSubmit = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      dispatch(
        addDevelopers({
          id: user.uid,
          name: data.name,
          bio: data.bio,
          email: data.email,
          avatar: data.avatar || "https://www.gravatar.com/avatar/?d=mp&f=y",
          skills: data.skills.map((s) => s.value),
          social: {
            github: data.github,
            linkedin: data.linkedin,
          },
        })
      );

      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-2  bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 px-6 py-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600 dark:text-blue-400">
          Developer Registration
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <InputField
            label="Email"
            type="email"
            register={register}
            name="email"
            error={errors.email}
            required
          />

          {/* Password */}
          <InputField
            label="Password"
            type="password"
            register={register}
            name="password"
            error={errors.password}
            required
            minLength={6}
          />

          {/* Name */}
          <InputField
            label="Name"
            register={register}
            name="name"
            error={errors.name}
            required
          />

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Bio
            </label>
            <textarea
              {...register("bio", { required: true })}
              placeholder="Tell us about yourself..."
              rows={3}
              className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none"
            />
            {errors.bio && (
              <p className="text-red-500 text-sm mt-1">Bio is required</p>
            )}
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Skills
            </label>
            <Controller
              name="skills"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  options={skillsOptions}
                  classNamePrefix="react-select"
                  theme={(baseTheme) => ({
                    ...baseTheme,
                    colors: {
                      ...baseTheme.colors,
                      primary25: theme === "dark" ? "#334155" : "#cbd5e1",
                      primary: "#2563eb",
                      neutral0: theme === "dark" ? "#1f2937" : "#fff",
                      neutral80: theme === "dark" ? "#f1f5f9" : "#1f2937",
                      neutral20: theme === "dark" ? "#475569" : "#d1d5db",
                    },
                  })}
                  styles={{
                    control: (base) => ({
                      ...base,
                      backgroundColor: theme === "dark" ? "#1f2937" : "#fff",
                      color: theme === "dark" ? "#f1f5f9" : "#1f2937",
                      borderColor: theme === "dark" ? "#475569" : "#d1d5db",
                    }),
                    menu: (base) => ({
                      ...base,
                      backgroundColor: theme === "dark" ? "#1f2937" : "#fff",
                    }),
                    multiValue: (base) => ({
                      ...base,
                      backgroundColor: theme === "dark" ? "#334155" : "#e2e8f0",
                    }),
                    multiValueLabel: (base) => ({
                      ...base,
                      color: theme === "dark" ? "#f1f5f9" : "#1f2937",
                    }),
                  }}
                />
              )}
            />

            {errors.skills && (
              <p className="text-red-500 text-sm mt-1">
                Please select at least one skill
              </p>
            )}
          </div>

          {/* Avatar */}
          <InputField
            label="Avatar URL (optional)"
            register={register}
            name="avatar"
            placeholder="https://..."
          />

          {/* Social Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="GitHub"
              register={register}
              name="github"
              placeholder="https://github.com/username"
            />
            <InputField
              label="LinkedIn"
              register={register}
              name="linkedin"
              placeholder="https://linkedin.com/in/username"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

// 📦 Reusable input component
function InputField({
  label,
  register,
  name,
  type = "text",
  error,
  required,
  minLength,
  placeholder = "",
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <input
        {...register(name, { required, minLength })}
        type={type}
        placeholder={placeholder || `Enter your ${label.toLowerCase()}`}
        className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{label} is required</p>
      )}
    </div>
  );
}
