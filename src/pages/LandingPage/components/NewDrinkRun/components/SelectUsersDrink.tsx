import { TextField } from "@mui/material";
import withTranslation from "hocs/withTranslation/withTranslation";
import { DrinkRunError, User } from "../NewDrinkRun";

interface SelectUsersDrinkProps {
  setDrinkChoice: (drink: string) => void;
  setError: (error: DrinkRunError) => void;
  drinkChoice: string;
  error: DrinkRunError;
  user: User | null;
}

export const SelectUsersDrink = ({
  setDrinkChoice,
  drinkChoice,
  setError,
  error,
  user,
}: SelectUsersDrinkProps) => {
  const handleChange = ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    if (!value) {
      setDrinkChoice("");
      setError({ ...error, drinkChoice: "Please enter a drink" });
      return;
    }
    setError({ ...error, drinkChoice: "" });
    setDrinkChoice(value);
  };

  return (
    <TextField
      error={!!error?.drinkChoice}
      helperText={error?.drinkChoice}
      label="Add Drink"
      variant="outlined"
      onChange={handleChange}
      value={drinkChoice}
    />
  );
};

export default withTranslation(SelectUsersDrink, "landing");
