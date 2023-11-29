import React from "react";
import store, { persistor } from "../store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "../routes/PrivateRoute";
import Profile from "./Profile";
import GuestProfile from "./GuestProfile";

const ProfileContainer = () => {
  return (
    <div className="flex flex-col w-1/4 border-2 p-8 items-center text-white">
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <Router>
            <Routes>
              <Route path="/login" element={<GuestProfile />} />
              <Route path="/" element={<PrivateRoute />}>
                <Route path="/" element={<Profile />} />
              </Route>
            </Routes>
          </Router>
        </PersistGate>
      </Provider>
    </div>
  );
};

export default ProfileContainer;
