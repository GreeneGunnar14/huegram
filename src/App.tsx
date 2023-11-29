import Menu from "./components/Menu";
import Main from "./components/Main";
import { useState } from "react";
import ProfileContainer from "./components/ProfileContainer";

function App() {
  const [posts, setPosts] = useState([
    {
      id: 0,
      color: "#ffa500",
      username: "kaylee",
      likes: 15,
    },
    {
      id: 1,
      color: "#ff8c00",
      username: "therealkaylee",
      likes: 8,
    },
    {
      id: 2,
      color: "#ff7f50",
      username: "odomester",
      likes: 20,
    },
    {
      id: 3,
      color: "#ff6347",
      username: "kaylee",
      likes: 200,
    },
  ]);

  const handleAddHue = (color: string) => {
    const newHue = {
      color: color,
      username: "kaylee",
      id: posts[posts.length - 1].id + 1,
      likes: 0,
    };
    setPosts([...posts, newHue]);
  };

  return (
    <div className="flex bg-slate-800 h-screen">
      <Menu />

      <Main posts={posts} addHue={handleAddHue} />

      <ProfileContainer />
    </div>
  );
}

export default App;
