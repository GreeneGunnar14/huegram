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
import Header from "./components/Header";

function App() {
  const [posts, setPosts] = useState<Array<Post>>();
  const [filteredPosts, setFilteredPosts] = useState<Array<Post>>();

  const handleAddHue = (color: string, userId: string | undefined) => {
    console.log("adding hue");
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

  const [showLogin, setShowLogin] = useState(true);

  const [loginElements, setLoginElements] = useState<JSX.Element>();

  const handleDeleteHue = (hueId: number) => {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/api/hues/${hueId}/`)
      .then((res) => {
        if (res.status == 204) {
          const newPosts = posts?.filter((hue) => {
            return hue.id != hueId;
          });
          setPosts(newPosts);
          setFilteredPosts(newPosts);
        }
      });
  };

  const handleUpdateFilter = (filter_text: string) => {
    if (filter_text == "") {
      setFilteredPosts(posts);
      return;
    }
    const regexp = new RegExp(`.*${filter_text}.*`);
    const filteredPosts = posts?.filter((post) => {
      return regexp.test(post.color);
    });
    setFilteredPosts(filteredPosts);
  };

  const handleShowLogin = () => {
    setShowLogin(!showLogin);
  };

  useEffect(() => {
    let newElements: JSX.Element;
    showLogin
      ? (newElements = (
          <>
            <Main>
              <LoginRedirect onClick={handleShowLogin} />
              <HueContainer
                handleDeleteHue={handleDeleteHue}
                posts={filteredPosts}
              ></HueContainer>
            </Main>
            <ProfileContainer>
              <GuestProfile />
            </ProfileContainer>
          </>
        ))
      : (newElements = (
          <div className="w-full flex justify-center">
            <Main>
              <LoginForm handleToFromLogin={handleShowLogin} />
            </Main>
          </div>
        ));
    setLoginElements(newElements);
  }, [posts, showLogin]);

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
      setFilteredPosts(newPosts);
    });
  };

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/hues/`).then((res) => {
      const initialPosts: Post[] = [];
      for (const i in res.data) {
        initialPosts.push(HueResponseToPost(res.data[i]));
      }
      setPosts(initialPosts);
      setFilteredPosts(initialPosts);
    });
  }, []);

  return (
    <div className="flex flex-col bg-gradient-to-b from-blue-900 to-indigo-950 h-screen w-full overflow-hidden">
      <Header handleUpdateFilter={handleUpdateFilter} showLogin={showLogin} />
      <div className="flex overflow-hidden w-full">
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={null}>
            <Router>
              <Routes>
                <Route
                  path="/login"
                  element={loginElements ? loginElements : <></>}
                />
                <Route path="/" element={<PrivateRoute />}>
                  <Route
                    path="/"
                    element={
                      <>
                        <Main>
                          <PostHue addHue={handleAddHue}></PostHue>
                          <HueContainer
                            handleDeleteHue={handleDeleteHue}
                            posts={filteredPosts}
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
    </div>
  );
}

export default App;
