import React, { useState } from "react";

interface Props {
  addHue: (color: string) => void;
}

const PostHue = ({ addHue }: Props) => {
  // Solution for determining lightness value comes from
  // https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color

  const [postColor, setPostColor] = useState("");

  const handleUpdateColor = (color: string) => {
    if (!/^#[0-9A-F]{6}$/i.test(color)) {
      setPostColor("");
      return;
    }

    setPostColor(color);
  };

  const handleAddHue = () => {
    if (!postColor) {
      alert("Invalid hex code!");
      return;
    }
    addHue(postColor);
  };

  return (
    <div className="w-full flex items-center">
      <div className="w-1/6 aspect-square rounded-md p-4">
        <div
          id="preview"
          className="w-full aspect-square rounded-lg flex justify-center items-center text-3xl font-bold"
          style={{
            backgroundColor: postColor ? postColor : "black",
            color: "rgb(30 41 59)",
            background: postColor
              ? postColor
              : "radial-gradient(circle, white 10%, rgb(30 41 59) 70%)",
          }}
        >
          {postColor ? "" : "?"}
        </div>
      </div>
      <div
        className={
          "w-5/6 justify-center flex flex-col gap-2 p-2 bg-" + { postColor }
        }
      >
        <input
          type="text"
          name="hue"
          id="hue"
          placeholder="Hexcode"
          onChange={(evt) => handleUpdateColor(evt.target.value)}
        />
        <button className="bg-white text-black" onClick={() => handleAddHue()}>
          Post
        </button>
      </div>
    </div>
  );
};

export default PostHue;
