import React from "react";
import axios from "axios";
import Connexion from "./components/connexion/connexion_page";

function App() {
  return (
      <Connexion/>
  );
}

export default App;

// const baseURL = "http://localhost:5000/users";
//
// export default function App() {
//   const [post, setPost] = React.useState(null);
//
//   React.useEffect(() => {
//     axios.get(baseURL).then((response) => {
//       setPost(response.data);
//       console.log('super ?');
//     });
//   }, []);
//
//   if (!post) return null;
//
//   return (
//       <div>
//         <h1>{post.title}</h1>
//         <p>{post.body}</p>
//       </div>
//   );
// }
