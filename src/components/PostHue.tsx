import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface Props {
  addHue: (color: string, userId: string | undefined) => void;
}

const PostHue = ({ addHue }: Props) => {
  const account = useSelector((state: RootState) => state.auth.account);

  const userId = account?.id;

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
    addHue(postColor, userId);
  };

  return (
    <div className="w-full flex items-center">
      <div className="w-1/6 aspect-square rounded-md p-4">
        <div
          id="preview"
          className="w-full aspect-square rounded-lg flex justify-center items-center text-3xl font-bold"
          style={{
            backgroundColor: postColor || "black",
            color: "rgb(30 41 59)",
            background:
              postColor ||
              "radial-gradient(circle, white 10%, rgb(30 41 59) 70%)",
          }}
        >
          {postColor ? "" : "?"}
        </div>
      </div>
      <div
        className={
          "w-5/6 justify-center flex flex-col gap-2 p-2 bg-" + postColor
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
