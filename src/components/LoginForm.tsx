import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import authSlice from "../store/slices/auth";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useState } from "react";

const schema = z.object({
  username: z
    .string()
    .max(255, "Maximum username length (255 characters) exceeded."),
  password: z.string().max(128).min(8, "Password is too short."),
});

type FormData = z.infer<typeof schema>;

interface Props {
  handleToFromLogin: () => void;
  handleToFromSignup: () => void;
}

const LoginForm = ({ handleToFromLogin, handleToFromSignup }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: FieldValues) => {
    axios
      .post(`/accounts/auth/login/`, data, {
        baseURL: import.meta.env.VITE_API_URL,
        headers: { "Content-Type": "Application/json" },
      })
      .then((res) => {
        dispatch(
          authSlice.actions.setAuthTokens({
            token: res.data.access,
            refreshToken: res.data.refresh,
          })
        );
        console.log(res.data.user);
        dispatch(authSlice.actions.setAccount(res.data.user));
        handleToFromLogin();
        navigate("/");
      })
      .catch((err) => {
        setMessage(err.response.data.detail.toString());
      });
  };

  return (
    <div className="flex flex-col w-full pt-10 items-center gap-8 overflow-y-auto text-white">
      <div
        id="form-container"
        className="w-fit h-fit bg-gradient-to-br from-red-400 to-orange-400 p-1 rounded-lg rounded-br-3xl rounded-tl-3xl"
      >
        <form
          className="p-6 w-fit h-fit flex flex-col justify-center items-center bg-slate-800 rounded-lg rounded-br-3xl rounded-tl-3xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-2xl mb-9 font-bold ">Log in to your account</h2>
          <div className="mb-3">
            <label className="text-lg  font-bold mr-3" htmlFor="username">
              Username:
            </label>
            <input
              {...register("username")}
              className="rounded-lg bg-gradient-to-r from-red-400 to-orange-500  text-bold px-1 border-transparent border-2 focus:border-white focus:outline-none"
              type="text"
              id="username"
              autoComplete="username"
            />
            {errors.username ? (
              <p className="text-red-600">{errors.username.message}</p>
            ) : (
              <div className="h-6 w-full"></div>
            )}
          </div>
          <div className="mb-3">
            <label className="text-lg  font-bold mr-3" htmlFor="password">
              Password:
            </label>
            <input
              {...register("password")}
              className="rounded-lg bg-gradient-to-r from-red-400 to-orange-500  text-bold px-1 border-transparent border-2 focus:border-white focus:outline-none"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {errors.password ? (
              <p className="text-red-600">{errors.password.message}</p>
            ) : (
              <div className="h-6 w-full"></div>
            )}
          </div>
          <div>
            <button
              className="my-3 text-lg font-bold  bg-gradient-to-r from-red-400 disabled:from-red-900 disabled:to-orange-950 to-orange-500 transition-all disabled:transition-none disabled:hover:translate-y-0 disabled:hover:scale-100 duration-300 px-4 scale-100 hover:scale-110 translate-y-0 hover:-translate-y-1 py-2 rounded-lg"
              type="submit"
              disabled={!isValid}
            >
              Log In
            </button>
          </div>
          {message ? <div>{message}</div> : <div></div>}
        </form>
      </div>
      <p className=" my-2 text-center">
        No account yet? Click{" "}
        <button
          onClick={handleToFromSignup}
          className="text-blue-600 hover:text-blue-400"
        >
          here
        </button>{" "}
        to sign up.
      </p>
      <button
        onClick={handleToFromLogin}
        className="bg-gradient-to-r from-red-400 to-orange-500 text-white h-fit py-2 px-4 rounded-lg"
      >
        Home
      </button>
    </div>
  );
};

export default LoginForm;
