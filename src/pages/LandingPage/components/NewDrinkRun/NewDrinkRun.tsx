import { Box, Button, Modal, Typography } from "@mui/material";
import withTranslation, { t } from "hocs/withTranslation/withTranslation";
import AddNewOrExistingUser from "./components/AddNewOrExistingUser";
import SelectUsersDrink from "./components/SelectUsersDrink";
import DrinkRunUsersTable from "./components/DrinkRunUsersTable";
import useDrinkRun from "context/DrinkRunContext";
import classes from "./NewDrinkRun.module.css";

interface CreateRunProps {
  t: t;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const style = {
  bgcolor: "background.paper",
};

export const NewDrinkRun = ({ open, setOpen, t }: CreateRunProps) => {
  const {
    clearDrinkRunUsers,
    clearNewUser,
    clearErrors,
    createNewDrinkRun,
    clearDrinkOrder,
    drinkRunUsers,
  } = useDrinkRun();

  const handleClose = () => {
    clearNewUser();
    clearDrinkRunUsers();
    clearErrors();
    clearDrinkOrder();
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style} className={classes.centeredBox}>
        <Typography variant="h2" gutterBottom>
          {t("newRun")}
        </Typography>
        <AddNewOrExistingUser />
        <div className={classes.spacer}>
          <SelectUsersDrink />
        </div>
        <div className={classes.spacer}>
          <DrinkRunUsersTable />
        </div>
        <div className={classes.spacer}>
          <Button
            onClick={() => {
              createNewDrinkRun();
              handleClose();
            }}
            disabled={!drinkRunUsers.length}
            variant={"outlined"}
          >
            {t("createRun")}
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default withTranslation(NewDrinkRun, "landing");
