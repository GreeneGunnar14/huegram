import Menu from "./components/Menu";
import Main from "./components/Main";
import Profile from "./components/Profile";
import { useState } from "react";

function App() {
  const [posts, setPosts] = useState([
    {
      id: 0,
      color: "#ffa500",
      username: "kaylee",
      likes: 15,
      textColor: "white",
    },
    {
      id: 1,
      color: "#ff8c00",
      username: "therealkaylee",
      likes: 8,
      textColor: "white",
    },
    {
      id: 2,
      color: "#ff7f50",
      username: "odomester",
      likes: 20,
      textColor: "white",
    },
    {
      id: 3,
      color: "#ff6347",
      username: "kaylee",
      likes: 200,
      textColor: "white",
    },
  ]);

  const handleAddHue = (color: string, textColor: string) => {
    const newHue = {
      color: color,
      username: "kaylee",
      id: posts[posts.length - 1].id + 1,
      likes: 0,
      textColor: textColor,
    };
    setPosts([...posts, newHue]);
  };

  return (
    <div className="flex bg-slate-800 h-screen">
      <Menu />

      <Main posts={posts} addHue={handleAddHue} />

      <Profile />
    </div>
  );
}

export default App;
