// const developers = [
//     {
//       id: 1,
//       name: "Ankita Saha",
//       avatar: "https://i.pravatar.cc/150?img=1",
//       bio: "Frontend Dev passionate about React & UI/UX",
//       skills: ["React", "Tailwind", "JavaScript"],
//       social: {
//         github: "https://github.com/ankita",
//         linkedin: "https://linkedin.com/in/ankita"
//       }
//     },
//     {
//       id: 2,
//       name: "John Doe",
//       avatar: "https://i.pravatar.cc/150?img=2",
//       bio: "Full Stack Dev. Loves Node and Express.",
//       skills: ["Node", "Express", "MongoDB"],
//       social: {
//         github: "https://github.com/john",
//         linkedin: "https://linkedin.com/in/john"
//       }
//     },
//     // Add 5–10 more mock entries
//   ];
const developers = localStorage.getItem("developers") ? JSON.parse(localStorage.getItem("developers")) : []
  
export default developers;
  