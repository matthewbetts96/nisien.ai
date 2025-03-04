import withTranslation from "hocs/withTranslation/withTranslation";

import { Outlet } from "react-router-dom";
import classes from "./Shell.module.css";
import Header from "./components/header/Header";

/**
 * The shell component is present on every page and thus it should contain
 * any and all common elements that should be present
 */

export const Shell = () => {
  return (
    <div className={classes.content}>
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default withTranslation(Shell, "shell");
