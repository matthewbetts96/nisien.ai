import withTranslation from "hocs/withTranslation/withTranslation";
import { Outlet } from "react-router-dom";

export const Shell = () => {
  return (
    <div>
      Shell
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default withTranslation(Shell, "shell");
