import { Box, Button, Modal, Typography } from "@mui/material";
import withTranslation from "hocs/withTranslation/withTranslation";
import AddNewOrExistingUser from "./components/AddNewOrExistingUser";
import SelectUsersDrink from "./components/SelectUsersDrink";
import { DrinkRunUsersTable } from "./components/DrinkRunUsersTable";
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

export const NewDrinkRun = ({ open, setOpen }: any) => {
  const { clearDrinkRunUsers, clearNewUser, clearErrors } = useDrinkRun();

  const handleClose = () => {
    clearNewUser();
    clearDrinkRunUsers();
    clearErrors();
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h2" gutterBottom>
          Create Drink Run
        </Typography>

        <AddNewOrExistingUser />
        <SelectUsersDrink />
        <DrinkRunUsersTable />

        <Button>Create drink run</Button>
      </Box>
    </Modal>
  );
};

export default withTranslation(NewDrinkRun, "landing");
