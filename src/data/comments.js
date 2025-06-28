// const comments = [
//     {
//       id: 1,
//       blogId: 1,
//       user: "Ankita Saha",
//       text: "Great article! Helped me a lot.",
//       date: "2025-06-27"
//     },
//     {
//       id: 2,
//       blogId: 1,
//       user: "John Doe",
//       text: "Thanks for sharing!",
//       date: "2025-06-27"
//     }
//   ];
const comments = localStorage.getItem("comments") ? JSON.parse(localStorage.getItem("comments")) : [];
  
export default comments;
  