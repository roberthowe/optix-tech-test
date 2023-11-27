import { useRoutes } from "react-router-dom";

import { Movies } from "../features/movies";

export const AppRoutes = () => {
  const commonRoutes = [{ path: "/", element: <Movies /> }];

  const element = useRoutes([...commonRoutes]);

  return <>{element}</>;
};
