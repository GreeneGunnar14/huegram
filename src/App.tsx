import Menu from "./components/Menu";
import Main from "./components/Main";
import Profile from "./components/Profile";
import { useState } from "react";

function App() {
  const [posts, setPosts] = useState([
    { color: "#ffa500", username: "kaylee", likes: 15 },
    { color: "#ff8c00", username: "therealkaylee", likes: 8 },
    { color: "#ff7f50", username: "odomester", likes: 20 },
    { color: "#ff6347", username: "kaylee", likes: 200 },
  ]);

  return (
    <div className="flex bg-slate-800 h-screen">
      <Menu />

      <Main posts={posts} />

      <Profile />
    </div>
  );
}

export default App;
