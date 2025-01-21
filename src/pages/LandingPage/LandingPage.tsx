import withTranslation, { t } from "hocs/withTranslation/withTranslation";
import { useState } from "react";
import DrinkRuns from "./components/DrinkRuns/DrinkRuns";
import NewDrinkRun from "./components/NewDrinkRun/NewDrinkRun";
import { Button } from "@mui/material";
import classes from "./LandingPage.module.css";

interface LandingPageProps {
  t: t;
}

export const LandingPage = ({ t }: LandingPageProps) => {
  const [newDrinkRunModalOpen, setNewDrinkRunModal] = useState<boolean>(false);

  return (
    <div>
      <Button onClick={() => setNewDrinkRunModal(true)}>
        {t("createRun")}
      </Button>
      <div className={classes.container}>
        <DrinkRuns />
      </div>
      <NewDrinkRun open={newDrinkRunModalOpen} setOpen={setNewDrinkRunModal} />
    </div>
  );
};

export default withTranslation(LandingPage, "landing");
