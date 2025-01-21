import withTranslation, { t } from "hocs/withTranslation/withTranslation";
import { useState } from "react";
import DrinkRuns from "./components/DrinkRuns/DrinkRuns";
import NewDrinkRun from "./components/NewDrinkRun/NewDrinkRun";
import { Button } from "@mui/material";

interface LandingPageProps {
  t: t;
}

export const LandingPage = ({ t }: LandingPageProps) => {
  const [newDrinkRunModalOpen, setNewDrinkRunModal] = useState<boolean>(false);

  return (
    <div>
      <Button onClick={() => setNewDrinkRunModal(true)}>New Drink Run</Button>
      <DrinkRuns />
      <NewDrinkRun open={newDrinkRunModalOpen} setOpen={setNewDrinkRunModal} />
    </div>
  );
};

export default withTranslation(LandingPage, "landing");
