interface Props {
  children: JSX.Element | JSX.Element[];
}

const Main = ({ children }: Props) => {
  return (
    <div className="flex flex-wrap w-full justify-center gap-8 overflow-y-auto">
      {children}
    </div>
  );
};

export default Main;
