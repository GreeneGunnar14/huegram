import React, { useState } from "react";

interface Props {
  addHue: (color: string, textColor: string) => void;
}

const PostHue = ({ addHue }: Props) => {
  // Solution for determining lightness value comes from
  // https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color

  const [postColor, setPostColor] = useState("");

  const [textColor, setTextColor] = useState("");

  const handleUpdateColor = (color: string) => {
    if (color.length < 7) {
      setPostColor("");
      setTextColor("");
      return;
    }
    const r_num = Number("0x" + color.slice(1, 3));
    const g_num = Number("0x" + color.slice(3, 5));
    const b_num = Number("0x" + color.slice(5, 7));

    const hue_intensity = r_num * 0.299 + g_num * 0.587 + b_num * 0.114;

    const text_color = hue_intensity > 186 ? "#000000" : "#FFFFFF";

    setTextColor(text_color);
    setPostColor(color);
  };

  const handleAddHue = () => {
    if (/^#[0-9A-F]{6}$/i.test(postColor)) {
      addHue(postColor, textColor);
      return;
    }

    alert("Invalid hex code.");
  };

  return (
    <div className="w-full flex items-center">
      <div className="w-1/6 aspect-square rounded-md p-4">
        <div
          id="preview"
          className="w-full aspect-square rounded-lg flex justify-center items-center"
          style={{
            backgroundColor: postColor ? postColor : "black",
            color: textColor ? textColor : "white",
          }}
        >
          {postColor ? postColor : ". . ."}
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
