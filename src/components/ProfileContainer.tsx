interface Props {
  children: JSX.Element;
}

const ProfileContainer = ({ children }: Props) => {
  return (
    <div className="flex flex-col w-1/4 border-2 p-8 items-center text-white">
      {children}
    </div>
  );
};

export default ProfileContainer;
