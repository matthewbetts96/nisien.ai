import Shell from "components/shell/Shell";
import LandingPage from "pages/LandingPage/LandingPage";
import OrderPage from "pages/OrderPage/OrderPage";

import { Route, Routes } from "react-router";

//App routes pulled out of <App /> as if the app gets larger, the routes portion can get very complicated
export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Shell />}>
        <Route index element={<LandingPage />} />
        <Route index element={<OrderPage />} />
        <Route path="*" element={<div>Page Unknown</div>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
