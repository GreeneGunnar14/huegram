import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import authSlice from "../store/slices/auth";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useState } from "react";

const schema = z
  .object({
    username: z
      .string()
      .max(255, "Maximum username length (255 characters) exceeded."),
    password: z
      .string()
      .min(8, "Password must be 8 characters long.")
      .max(255, "Max password length exceeded."),
    confirmPassword: z
      .string()
      .min(8, "Password must be 8 characters long.")
      .max(255, "Max password length exceeded."),
    email: z.string().email("Valid email is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match.",
  });

type FormData = z.infer<typeof schema>;

interface Props {
  handleToFromLogin: () => void;
  handleToFromSignup: () => void;
}

const SignupForm = ({ handleToFromLogin, handleToFromSignup }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (raw_data: FieldValues) => {
    const data = {
      username: raw_data["username"],
      email: raw_data["email"],
      password: raw_data["password"],
    };
    axios
      .post(`${import.meta.env.VITE_API_URL}/accounts/user/`, data)
      .then((res) => {
        const login_data = {
          username: res.data["username"],
          password: raw_data["password"],
        };
        axios
          .post(`/accounts/auth/login/`, login_data, {
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
          });
      })
      .catch((err) => setMessage(err.response.data.message));
  };

  return (
    <div className="flex flex-col w-full items-center gap-6 overflow-y-auto text-white">
      <div
        id="form-container"
        className=" w-1/2 h-fit bg-gradient-to-br from-red-400 to-orange-400 p-1 rounded-lg rounded-br-3xl rounded-tl-3xl"
      >
        <form
          className="p-6 w-full h-fit flex flex-col justify-center items-center bg-slate-800 rounded-lg rounded-br-3xl rounded-tl-3xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-2xl mb-9 font-bold ">Sign up for an account</h2>
          <div className="mb-1 w-full relative">
            <label className="text-lg font-bold mr-3" htmlFor="username">
              Username:
            </label>
            <input
              {...register("username")}
              className="rounded-lg w-full bg-gradient-to-r from-red-400 to-orange-500  text-bold px-1 border-transparent border-2 focus:border-white focus:outline-none"
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
          <div className="mb-1 w-full">
            <label className="text-lg font-bold mr-3" htmlFor="email">
              Email:
            </label>
            <input
              {...register("email")}
              className="rounded-lg w-full bg-gradient-to-r from-red-400 to-orange-500 text-bold px-1 border-transparent border-2 focus:border-white focus:outline-none"
              type="text"
              id="email"
              autoComplete="email"
            />
            {errors.email ? (
              <p className="test-red-600">{errors.email.message}</p>
            ) : (
              <div className="h-6 w-full"></div>
            )}
          </div>
          <div className="mb-1 w-full">
            <label className="text-lg font-bold mr-3" htmlFor="password">
              Password:
            </label>
            <input
              {...register("password")}
              className="rounded-lg w-full bg-gradient-to-r from-red-400 to-orange-500  text-bold px-1 border-transparent border-2 focus:border-white focus:outline-none"
              type="password"
              id="password"
              autoComplete="password1"
            />
            {errors.password ? (
              <p className="text-red-600">{errors.password.message}</p>
            ) : (
              <div className="h-6 w-full"></div>
            )}
          </div>
          <div className="mb-1 w-full">
            <label htmlFor="new-password" className="text-lg font-bold mr-3">
              Confirm Password:
            </label>
            <input
              {...register("confirmPassword")}
              className="rounded-lg w-full bg-gradient-to-r from-red-400 to-orange-500  text-bold px-1 border-transparent border-2 focus:border-white focus:outline-none"
              type="password"
              id="confirm-password"
              autoComplete="new-password"
            />
            {errors.confirmPassword ? (
              <p className="text-red-600">{errors.confirmPassword.message}</p>
            ) : (
              <div className="h-6 w-full"></div>
            )}
          </div>
          <div>
            <button
              className="my-3 text-lg font-bold  bg-gradient-to-r from-red-400 disabled:from-red-900 disabled:to-orange-950 to-orange-500 transition-all disabled:transition-none disabled:hover:translate-y-0 disabled:hover:scale-100 duration-300 px-4 scale-100 hover:scale-110 translate-y-0 hover:-translate-y-1 py-2 rounded-lg"
              type="submit"
            >
              Sign Up
            </button>
          </div>
          {message ? <div>{message}</div> : <div></div>}
        </form>
      </div>
      <p className=" mt-2 text-center">
        Already have an account? Click{" "}
        <button
          onClick={handleToFromLogin}
          className="text-blue-600 hover:text-blue-400"
        >
          here
        </button>{" "}
        to log in.
      </p>
      <button
        onClick={handleToFromSignup}
        className="bg-gradient-to-r from-red-400 to-orange-500 text-white h-fit py-2 px-4 rounded-lg"
      >
        Home
      </button>
    </div>
  );
};

export default SignupForm;
