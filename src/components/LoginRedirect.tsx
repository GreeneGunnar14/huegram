interface Props {
  onClick: () => void;
}

const LoginRedirect = ({ onClick }: Props) => {
  return (
    <div className="w-full flex justify-center items-center py-2 gap-2">
      <button
        onClick={onClick}
        className="bg-gradient-to-r from-red-400 to-orange-500 text-white h-fit py-2 px-4 rounded-lg"
      >
        Log In
      </button>
      <p className="text-white"> to like Hues and post your own</p>
    </div>
  );
};

export default LoginRedirect;
