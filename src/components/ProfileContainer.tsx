interface Props {
  children: JSX.Element;
}

const ProfileContainer = ({ children }: Props) => {
  return (
    <div className="flex flex-col w-1/6 p-4 items-center text-white">
      {children}
    </div>
  );
};

export default ProfileContainer;
