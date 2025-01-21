import { Button, TextField, Typography } from "@mui/material";
import withTranslation, { t } from "hocs/withTranslation/withTranslation";
import useDrinkRun from "context/DrinkRunContext";
import classes from "./SelectUsersDrink.module.css";

interface SelectUsersDrinkProps {
  t: t;
}

export const SelectUsersDrink = ({ t }: SelectUsersDrinkProps) => {
  const {
    newUser,
    error,
    newDrinkOrder,
    addDrinkChoice,
    addAdditionalSpecification,
    handleAddDrinkOrder,
  } = useDrinkRun();

  const hasEnteredName = newUser.firstName && newUser.lastName;

  if (!hasEnteredName) {
    return <></>;
  }

  const hasDrinkOrders = !!newUser.drinkOrders?.length;

  if (hasDrinkOrders) {
    return <></>;
  }

  const additionalSpecification = newDrinkOrder?.additionalSpecification || [];

  const handleChange =
    (key: "name" | "type") =>
    ({ target: { value } }: { target: { value: string } }) => {
      addDrinkChoice(key, value);
    };

  const isDisabled = (): boolean => {
    if (
      !newDrinkOrder ||
      !newDrinkOrder.name ||
      !newDrinkOrder.type ||
      !newDrinkOrder.additionalSpecification?.length ||
      newDrinkOrder.additionalSpecification.some(
        ({ key, value }) => !key || !value
      )
    ) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <div className={classes.drinkDetailsContainer}>
        <TextField
          error={!!error?.drinkChoice}
          helperText={error?.drinkChoice}
          label={t("addDrinkName")}
          variant="outlined"
          onChange={handleChange("name")}
        />
        <TextField
          error={!!error?.drinkChoice}
          helperText={error?.drinkChoice}
          label={t("addDrinkType")}
          variant="outlined"
          onChange={handleChange("type")}
        />
      </div>
      <div>
        <Typography variant="h6" gutterBottom>
          {t("additionalSpec")}
        </Typography>
      </div>

      {[...additionalSpecification, { key: "", value: "" }].map((spec, idx) => {
        return (
          <div className={classes.drinkDetailsContainer}>
            <TextField
              error={!!error?.drinkChoice}
              helperText={error?.drinkChoice}
              label={t("key")}
              variant="outlined"
              value={spec.key || ""}
              onChange={(e) => {
                const newValue = e.target.value;
                const updatedSpecifications = [...additionalSpecification];
                updatedSpecifications[idx] = {
                  ...updatedSpecifications[idx],
                  key: newValue,
                };

                addAdditionalSpecification(updatedSpecifications);
              }}
            />
            <TextField
              error={!!error?.drinkChoice}
              helperText={error?.drinkChoice}
              label={t("value")}
              variant="outlined"
              value={spec.value || ""}
              onChange={(e) => {
                const newValue = e.target.value;
                const updatedSpecifications = [...additionalSpecification];
                updatedSpecifications[idx] = {
                  ...updatedSpecifications[idx],
                  value: newValue,
                };

                addAdditionalSpecification(updatedSpecifications);
              }}
            />
          </div>
        );
      })}

      <Button
        variant={"outlined"}
        onClick={handleAddDrinkOrder}
        disabled={isDisabled()}
      >
        {t("addDrink")}
      </Button>
    </div>
  );
};

export default withTranslation(SelectUsersDrink, "landing");
