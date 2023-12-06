const PlaceholderHue = () => {
  return (
    <div className="w-64 flex justify-center font-body font-light">
      <div className="">
        <div
          className={
            "flex flex-col aspect-square rounded-3xl text-center justify-center items-center relative shadow-lg h-64 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-200 to-transparent"
          }
        ></div>

        <div className="grid grid-rows-1 grid-cols-3 w-full justify-items-center items-center h-10">
          <div></div>
          <p className="text-center text-white opacity-25">---</p>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderHue;
