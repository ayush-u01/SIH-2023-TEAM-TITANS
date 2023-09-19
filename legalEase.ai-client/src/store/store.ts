import { configureStore } from "@reduxjs/toolkit";
import userReducer, { clearState, fetchUser } from "./userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

store.dispatch(fetchUser());
store.dispatch(clearState());
export default store;
// export * from "./userSlice";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
