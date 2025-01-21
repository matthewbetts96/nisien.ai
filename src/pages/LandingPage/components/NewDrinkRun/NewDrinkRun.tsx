import { Box, Button, Modal, Typography } from "@mui/material";
import withTranslation, { t } from "hocs/withTranslation/withTranslation";
import AddNewOrExistingUser from "./components/AddNewOrExistingUser";
import SelectUsersDrink from "./components/SelectUsersDrink";
import DrinkRunUsersTable from "./components/DrinkRunUsersTable";
import useDrinkRun from "context/DrinkRunContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface CreateRunProps {
  t: t;
  open: boolean;
  setOpen: (open: boolean) => void;
}

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
      <Box sx={style}>
        <Typography variant="h2" gutterBottom>
          {t("newRun")}
        </Typography>
        <AddNewOrExistingUser />
        <SelectUsersDrink />
        <DrinkRunUsersTable />
        <Button
          onClick={() => {
            createNewDrinkRun();
            handleClose();
          }}
          disabled={!drinkRunUsers.length}
        >
          {t("createRun")}
        </Button>
      </Box>
    </Modal>
  );
};

export default withTranslation(NewDrinkRun, "landing");
