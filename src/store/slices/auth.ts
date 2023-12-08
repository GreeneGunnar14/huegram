// auth slice from https://dev.to/koladev/django-rest-authentication-cmh
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccountResponse } from "../../types";

type State = {
  token: string | null;
  refreshToken: string | null;
  account: AccountResponse | null;
};

const initialState: State = {
  token: null,
  refreshToken: null,
  account: {
    username: "",
    id: "-1",
    email: "",
    is_active: false,
    access: "",
    refresh: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthTokens(
      state: State,
      action: PayloadAction<{ token: string; refreshToken: string }>
    ) {
      state.refreshToken = action.payload.refreshToken;
      state.token = action.payload.token;
    },
    setAccount(state: State, action: PayloadAction<AccountResponse>) {
      state.account = action.payload;
    },
    logout(state: State) {
      state.account = null;
      state.refreshToken = null;
      state.token = null;
    },
  },
});

export default authSlice;
