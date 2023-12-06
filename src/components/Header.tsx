import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const schema = z.object({
  filter_text: z.string(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  handleUpdateFilter: (filter_text: string) => void;
  showLogin: boolean;
}

const Header = ({ handleUpdateFilter, showLogin }: Props) => {
  const { register } = useForm<FormData>({ resolver: zodResolver(schema) });

  return (
    <div className="grow top-0 p-4 h-fit flex items-center justify-between pr-[10%]">
      <div className="flex justify-center items-center h-full">
        <div
          id="logo"
          className=" w-20 aspect-square bg-gradient-to-r from-orange-400 to-red-500"
        />
        <p
          id="site-title"
          className="text-6xl relative py-6 px-1 font-logo font-black bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent"
        >
          Huegram
        </p>
      </div>
      <div>
        {showLogin ? (
          <input
            {...register("filter_text")}
            id="filter-term"
            type="text"
            className="focus:outline-none rounded-full px-2 py-1 font-body font-light bg-transparent text-white border-2"
            placeholder="Search"
            onChangeCapture={(e) => {
              handleUpdateFilter(e.currentTarget.value);
            }}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Header;
