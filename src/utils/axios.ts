import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import store from "../store";
import authSlice from "../store/slices/auth";

const axiosService = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosService.interceptors.request.use(async (config) => {
  const { token } = store.getState().auth;

  if (token !== null) {
    config.headers.Authorization = "Bearer " + token;
    console.debug(
      "[Request]",
      // @ts-expect-error This code comes from a tutorial. IDK why it would cause an error
      config.baseURL + config.url,
      JSON.stringify(token)
    );
  }
  return config;
});

axiosService.interceptors.response.use(
  (res) => {
    console.debug(
      "[Response]",
      // @ts-expect-error This code comes from a tutorial. IDK why it would cause an error
      res.config.baseURL + res.config.url,
      res.status,
      res.data
    );
    return Promise.resolve(res);
  },
  (err) => {
    console.debug(
      "[Response]",
      err.config.baseURL + err.config.url,
      err.response.status,
      err.response.data
    );
    return Promise.reject(err);
  }
);

// @ts-expect-error This code comes from a tutorial, IDK why it would cause a ts error
const refreshAuthLogic = async (failedRequest) => {
  const { refreshToken } = store.getState().auth;
  if (refreshToken !== null) {
    return axios
      .post(
        "/auth/refresh/",
        {
          refresh: refreshToken,
        },
        {
          baseURL: import.meta.env.VITE_API_URL,
        }
      )
      .then((resp) => {
        const { access, refresh } = resp.data;
        failedRequest.response.config.headers.Authorization =
          "Bearer " + access;
        store.dispatch(
          authSlice.actions.setAuthTokens({
            token: access,
            refreshToken: refresh,
          })
        );
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          store.dispatch(authSlice.actions.logout());
        }
      });
  }
};

createAuthRefreshInterceptor(axiosService, refreshAuthLogic);

export function fetcher<T = string>(url: string) {
  return axiosService.get<T>(url).then((res) => res.data);
}

export default axiosService;
