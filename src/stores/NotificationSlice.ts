import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "@/stores";

type NotificationState = {
  value: {
    type?: "info" | "warning" | "success" | "error";
    title: string;
    message?: string;
  };
};

const initialState: NotificationState = {
  value: {
    type: "info",
    title: "",
  },
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (
      state,
      action: PayloadAction<Omit<NotificationState, "value.id">>
    ) => {
      const { type, title, message } = action.payload.value;
      state.value = { type, title, message };
    },
    clearNotification: (state) => {
      state.value = { title: "" };
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const selectNotification = (state: RootState) =>
  state.notification.value;

export default notificationSlice.reducer;
