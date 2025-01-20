import { Box, Button, Modal, Typography } from "@mui/material";
import withTranslation from "hocs/withTranslation/withTranslation";
import AddNewOrExistingUser from "./components/AddNewOrExistingUser";
import SelectUsersDrink from "./components/SelectUsersDrink";
import { useState } from "react";

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

export interface DrinkRunError {
  user: string;
  drinkChoice: string;
}
export interface ValidUser {
  id: string;
  firstName: string;
  lastName: string;
  drinkOrders: any[];
}

export interface InvalidUser {
  title: string;
}

export type User = ValidUser | InvalidUser | null;

export function isInvalidUser(user: User): user is InvalidUser {
  return (user as InvalidUser)?.title !== undefined;
}

export function isValidUser(user: User): user is ValidUser {
  return (user as ValidUser)?.id !== undefined;
}

export const NewDrinkRun = ({ open, setOpen }: any) => {
  const [drinkChoice, setDrinkChoice] = useState<string>("");
  const [user, setUser] = useState<User>(null);
  const [error, setError] = useState<DrinkRunError>({
    user: "",
    drinkChoice: "",
  });

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h2" gutterBottom>
          Create Drink Run
        </Typography>

        <AddNewOrExistingUser
          user={user}
          setUser={setUser}
          setError={setError}
          error={error}
        />
        {isValidUser(user) && (
          <SelectUsersDrink
            setDrinkChoice={setDrinkChoice}
            drinkChoice={drinkChoice}
            user={user}
            setError={setError}
            error={error}
          />
        )}

        <p id="parent-modal-description">
          TABLE FOR USERS AND THEIR DRINKS HERE
        </p>

        <Button>Create drink run</Button>
      </Box>
    </Modal>
  );
};

export default withTranslation(NewDrinkRun, "landing");
