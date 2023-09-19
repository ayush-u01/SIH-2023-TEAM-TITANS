import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosPrivate } from "../hooks/useAxiosPrivate";
import useRefreshToken from "../hooks/useRefreshToken";
import { LoginType, RegisterType } from "../utils/interface";
import { useRouter } from "next/navigation";

const AxiosPrivate = () => {
  const refresh = useRefreshToken();
  axiosPrivate.interceptors.request.use(
    (config) => {
      if (
        !config.headers["Authorization"] &&
        !config.headers["X-Refresh-Token"]
      ) {
        config.headers["Authorization"] = `Bearer ${localStorage.getItem(
          "accessToken"
        )}`;
        config.headers["X-Refresh-Token"] = `Bearer ${localStorage.getItem(
          "refreshToken"
        )}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  // axiosPrivate.interceptors.request.eject(requestIntercept);

  axiosPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error?.config;
      if (error?.response?.status === 401 && !prevRequest?.sent) {
        prevRequest.sent = true;
        const newAccessToken = await refresh();
        prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        prevRequest.headers["X-Refresh-Token"] = `Bearer ${localStorage.getItem(
          "refreshToken"
        )}`;
        return axiosPrivate(prevRequest);
      }
      return Promise.reject(error);
    }
  );
};

/* Fetch User for fetching user data if token present in localStorage  */
export const fetchUser = createAsyncThunk<StateType>(
  "user/fetchUser",
  async (_) => {
    console.log("Fetching user");
    AxiosPrivate();
    let token = localStorage.getItem("refreshToken");
    if (token) {
      try {
        // token = JSON.parse(token);
        console.log("Fetching user from token");
        const response = await axiosPrivate.post("/auth/authme");
        console.log(response);
        localStorage.setItem("authId", response?.data?.data?.user.authid);
        return response?.data?.data?.user;
      } catch (err) {
        console.log("Fetching user from token error: ", err);
      }
    }
    return;
  }
);

/* Login Thunk */
export const loginUser = createAsyncThunk(
  "user/login",
  async ({ isEmail, email, phoneNo, password }: LoginType, thunkAPI) => {
    const refresh = useRefreshToken();
    try {
      const response = await axios.post(
        "https://ec2-13-232-131-158.ap-south-1.compute.amazonaws.com/api/auth/login",
        { isEmail, email, phoneNo, password }
      );
      let data = response.data;
      console.log(data);
      if (response.status === 200) {
        localStorage.setItem("refreshToken", data.data.user.refreshToken);
        const accessTok = await refresh();
        console.log(accessTok);

        return data.data.user;
      } else {
        throw new Error(data.message);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

// Only for student/parent
export const newAccount = createAsyncThunk<StateType>(
  "user/newaccount",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://ec2-13-232-131-158.ap-south-1.compute.amazonaws.com/api/user/create",
        userData
      );
      let data = response.data;
      console.log("new Account", data);
      if (response.status === 200) {
        localStorage.setItem("token", JSON.stringify(data.token));
        return data.user;
      } else {
        throw new Error(data.message);
      }
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const RegisterTemp = createAsyncThunk(
  "user/register",
  async ({ isEmail, email, phoneNo, password }: RegisterType, thunkAPI) => {
    const router = useRouter();
    try {
      const response = await axios.post(
        "https://ec2-13-232-131-158.ap-south-1.compute.amazonaws.com/api/auth/signup",
        {
          isEmail,
          email,
          phoneNo,
          password,
        }
      );
      let data = { ...response.data.data.user };
      console.log("register", response);
      if (response.status === 200) {
        localStorage.setItem(
          "refreshToken",
          response.data.data.tokens.refreshToken
        );
        localStorage.setItem(
          "accessToken",
          response.data.data.tokens.accessToken
        );
        router.push("/");
        return data;
      } else {
        console.log(data);

        return data;
        // throw new Error(data.message);
      }
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export interface StateType {
  userInfo: Object;
  isFetching: boolean;
  isSuccess: boolean;
  isLogged: boolean;
  isError: boolean;
  isNewRegister: boolean;
  isNewAccount: boolean;
  errorMessage: string;
}

const AuthType = {
  authid: "",
  countryCode: "",
  createdAt: "",
  email: "",
  hashedPassword: "",
  otp: "",
  phoneNo: "",
  refreshToken: "",
  role: "",
  updatedAt: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: AuthType,
    isFetching: false,
    isSuccess: false,
    isLogged: false,
    isError: false,
    isNewRegister: false,
    isNewAccount: false,
    errorMessage: "",
  },
  reducers: {
    clearState(state) {
      state.isFetching = false;
      state.isError = false;
      state.isSuccess = false;
      state.isLogged = false;
      state.isNewAccount = false;
      state.isNewRegister = false;
      state.errorMessage = "";
    },

    logout(state) {
      state.userInfo = AuthType;
      localStorage.clear();
    },
  },
  extraReducers: {
    [loginUser.pending.toString()]: (state) => {
      state.isFetching = true;
    },
    [loginUser.rejected.toString()]: (state, { payload }) => {
      console.log("login rejected ", payload);
      state.isFetching = false;
      state.isError = true;
      state.isLogged = false;
      state.isSuccess = false;
      state.errorMessage = payload.message;
    },
    [loginUser.fulfilled.toString()]: (state, { payload }) => {
      console.log("payload");
      state.userInfo = payload;
      state.isFetching = false;
      state.isLogged = true;
      state.isSuccess = true;
      return state;
    },
    // fetchUser on page refresh if token is in localstorage
    [fetchUser.pending.toString()]: (state) => {
      state.isFetching = true;
      state.isSuccess = false;
    },
    [fetchUser.rejected.toString()]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = payload;
    },
    [fetchUser.fulfilled.toString()]: (state, { payload }) => {
      state.userInfo = payload;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [RegisterTemp.pending.toString()]: (state) => {
      state.isFetching = true;
    },
    [RegisterTemp.rejected.toString()]: (state, { payload }) => {
      console.log("login rejected ", payload);
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.isNewRegister = false;
      state.errorMessage = payload.message;
    },
    [RegisterTemp.fulfilled.toString()]: (state, { payload }) => {
      console.log("payload", payload);
      state.userInfo = payload;
      state.isFetching = false;
      state.isNewRegister = true;
      state.isSuccess = true;
      return state;
    },
    // newAccount
    [newAccount.pending.toString()]: (state) => {
      state.isFetching = true;
    },
    [newAccount.rejected.toString()]: (state, { payload }) => {
      console.log("login rejected ", payload);
      state.isFetching = false;
      state.isError = true;
      state.isNewAccount = false;
      state.isSuccess = false;
      state.errorMessage = payload.message;
    },
    [newAccount.fulfilled.toString()]: (state, { payload }) => {
      console.log("payload");
      state.userInfo = payload;
      state.isFetching = false;
      state.isNewAccount = true;
      state.isSuccess = true;
      return state;
    },
  },
});

export const { clearState, logout } = userSlice.actions;
export default userSlice.reducer;
