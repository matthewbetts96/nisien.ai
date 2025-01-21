import Shell from "components/shell/Shell";
import LandingPage from "pages/LandingPage/LandingPage";

import { Route, Routes } from "react-router";

//App routes pulled out of <App /> as if the app gets larger, the routes portion can get very complicated
export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Shell />}>
        <Route index element={<LandingPage />} />
        <Route path="*" element={<div>Page Unknown</div>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
