import React from "react";
import pfp from "/Square-Img.png";

const Profile = () => {
  return (
    <div className="flex flex-col border-2 p-8 items-center text-white">
      <h1>@f1rstUsr</h1>

      <div className="flex w-1/2">
        <img src={pfp} alt="" className="rounded-full" />
      </div>
    </div>
  );
};

export default Profile;
