interface Props {
  children: JSX.Element | JSX.Element[];
}

const Main = ({ children }: Props) => {
  return (
    <div className="flex h-full px-4 gap-4 w-5/6 justify-center">
      {children}
    </div>
  );
};

export default Main;
