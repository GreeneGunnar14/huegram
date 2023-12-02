import Menu from "./components/Menu";
import Main from "./components/Main";
import { useEffect, useState } from "react";
import ProfileContainer from "./components/ProfileContainer";
import store, { persistor } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import Profile from "./components/Profile";
import PostHue from "./components/PostHue";
import HueContainer from "./components/HueContainer";
import LoginRedirect from "./components/LoginRedirect";
import GuestProfile from "./components/GuestProfile";
import LoginForm from "./components/LoginForm";
import axios from "axios";
import Post from "./components/Post";
import { HueResponse } from "./types";

function App() {
  const [posts, setPosts] = useState<Array<Post>>();

  // const [tempUserId, setTempUserId] = useState(1);

  const handleAddHue = (color: string, userId: string | undefined) => {
    const newHue = {
      hex_code: color,
      user: userId,
    };
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/hues/`, newHue)
      .then((res) => {
        res.statusText == "Created" ? fetchHues() : console.log(res.statusText);
      });
  };

  const [showLogin, setShowLogin] = useState(false);

  const [loginElements, setLoginElements] = useState<JSX.Element>();

  const handleDeleteHue = (hueId: number) => {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/api/hues/${hueId}/`)
      .then((res) => {
        res.status == 200 &&
          setPosts(
            posts?.filter((hue) => {
              return hue.id != hueId;
            })
          );
      });
  };

  const handleShowLogin = () => {
    let newElements: JSX.Element;
    showLogin
      ? (newElements = (
          <>
            <Main>
              <LoginRedirect onClick={handleShowLogin}></LoginRedirect>
              <HueContainer
                handleDeleteHue={handleDeleteHue}
                posts={posts}
              ></HueContainer>
            </Main>
            <ProfileContainer>
              <GuestProfile />
            </ProfileContainer>
          </>
        ))
      : (newElements = (
          <>
            <Main>
              <LoginForm handleToFromLogin={handleShowLogin}></LoginForm>
            </Main>
            <ProfileContainer>
              <GuestProfile></GuestProfile>
            </ProfileContainer>
          </>
        ));
    setLoginElements(newElements);
    setShowLogin(!showLogin);
  };

  useEffect(() => {
    setLoginElements(
      <>
        <Main>
          <LoginRedirect onClick={handleShowLogin}></LoginRedirect>
          <HueContainer
            handleDeleteHue={handleDeleteHue}
            posts={posts}
          ></HueContainer>
        </Main>
        <ProfileContainer>
          <GuestProfile></GuestProfile>
        </ProfileContainer>
      </>
    );
  }, [posts]);

  const HueResponseToPost = (hue: HueResponse) => {
    const newPost: Post = {
      id: hue.pk,
      color: hue.hex_code,
      username: hue.username,
      likes: hue.likes,
      userId: hue.user,
    };
    return newPost;
  };

  const fetchHues = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/hues/`).then((res) => {
      const newPosts: Post[] = [];
      for (const i in res.data) {
        newPosts.push(HueResponseToPost(res.data[i]));
      }
      setPosts(newPosts);
    });
  };

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/hues/`).then((res) => {
      const initialPosts: Post[] = [];
      for (const i in res.data) {
        initialPosts.push(HueResponseToPost(res.data[i]));
      }
      setPosts(initialPosts);
    });
  }, []);

  return (
    <div className="flex bg-slate-800 h-screen">
      <Menu />

      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <Router>
            <Routes>
              <Route path="/login" element={loginElements} />
              <Route path="/" element={<PrivateRoute />}>
                <Route
                  path="/"
                  element={
                    <>
                      <Main>
                        <PostHue addHue={handleAddHue}></PostHue>
                        <HueContainer
                          handleDeleteHue={handleDeleteHue}
                          posts={posts}
                        ></HueContainer>
                      </Main>
                      <ProfileContainer>
                        <Profile></Profile>
                      </ProfileContainer>
                    </>
                  }
                />
              </Route>
            </Routes>
          </Router>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
