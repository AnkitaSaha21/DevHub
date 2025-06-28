// const blogs = [
//     {
//       id: 1,
//       userId: 1,
//       title: "How I learned React",
//       content: "## My React Journey\nReact is amazing. I started by learning JSX...",
//       date: "2024-04-12"
//     },
//     {
//       id: 2,
//       userId: 2,
//       title: "Node.js for Beginners",
//       content: "### Intro\nNode.js lets you run JS on the backend.",
//       date: "2024-05-01"
//     }
//   ];
const blogs = localStorage.getItem("blogs") || []
  
export default blogs;
  