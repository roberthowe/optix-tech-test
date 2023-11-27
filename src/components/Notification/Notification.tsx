import { Alert, AlertTitle, Snackbar } from "@mui/material";

import {
  clearNotification,
  selectNotification,
  useAppSelector,
  useAppDispatch,
} from "@/stores";

export const Notification = () => {
  const dispatch = useAppDispatch();
  const notification = useAppSelector(selectNotification);
  const { message, title, type } = notification;

  return (
    <Snackbar
      open={title !== ""}
      autoHideDuration={6000}
      onClose={() => {
        dispatch(clearNotification());
      }}
    >
      <Alert
        severity={type || "info"}
        onClose={() => {
          dispatch(clearNotification());
        }}
      >
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );
};
