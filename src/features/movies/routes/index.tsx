import { Route, Routes } from "react-router-dom";

import { Movies } from "./Movies";

export const MoviesRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Movies />} />
    </Routes>
  );
};
