interface Post {
  color: string;
  username: string;
  likes: number[];
  id: number;
  userId: number;
}

interface Props {
  post: Post;
  canDelete: boolean;
  handleDelete: (hueId: number) => void;
  handleLikeUnlike: (hueId: number, like_unlike: boolean) => void;
  liked: boolean;
}

const Post = ({
  post,
  canDelete,
  handleDelete,
  handleLikeUnlike,
  liked,
}: Props) => {
  // Solution for determining lightness value comes from
  // https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color

  const r_num = Number("0x" + post.color.slice(1, 3));
  const g_num = Number("0x" + post.color.slice(3, 5));
  const b_num = Number("0x" + post.color.slice(5, 7));

  const hue_intensity = r_num * 0.299 + g_num * 0.587 + b_num * 0.114;

  const text_color = hue_intensity > 186 ? "#000000" : "#FFFFFF";

  return (
    <div>
      <div
        className="flex flex-col h-64 aspect-square rounded-3xl text-center justify-center items-center bg-"
        style={{
          backgroundColor: post.color,
          color: text_color,
        }}
      >
        <p className=" text-2xl opacity-80">{post.color}</p>
      </div>
      <div className="grid grid-rows-1 grid-cols-3 w-full justify-items-center items-center h-10">
        {canDelete ? (
          <button
            className="text-white fill-white hover:fill-red-600 rounded-lg p-2 mr-2 w-fit h-fit"
            onClick={() => handleDelete(post.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
            </svg>
          </button>
        ) : (
          <div className=""></div>
        )}
        <p className="text-center text-white">{post.username}</p>
        <button
          onClick={() => {
            handleLikeUnlike(post.id, !liked);
          }}
          className={
            "text-white rounded-lg p-2 w-fit h-fit " +
            (liked
              ? "fill-pink-400 hover:fill-pink-800"
              : "fill-white hover:fill-pink-400")
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Post;
