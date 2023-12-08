interface Props {
  onClick: () => void;
}

const LoginRedirect = ({ onClick }: Props) => {
  return (
    <div className="w-1/4 flex flex-col justify-center items-center px-4 gap-2">
      <button
        onClick={onClick}
        className="bg-gradient-to-r from-red-400 to-orange-500 text-white h-fit py-2 px-4 rounded-lg"
      >
        Log In
      </button>
      <p className="text-white text-center">
        Log in to your account to like Hues or create new ones.
      </p>
    </div>
  );
};

export default LoginRedirect;
