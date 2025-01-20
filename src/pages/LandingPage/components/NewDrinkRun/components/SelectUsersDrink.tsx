import { TextField, Typography } from "@mui/material";
import withTranslation from "hocs/withTranslation/withTranslation";
import {
  AdditionalSpecification,
  DrinkOrder,
  DrinkRunError,
  User,
} from "../NewDrinkRun";
import { useUpdateDrinkOrder } from "hooks/useDrinkOrder/useUpdateDrinkOrder";
import { useState } from "react";

interface SelectUsersDrinkProps {
  setError: (error: DrinkRunError) => void;
  error: DrinkRunError;
  user: User | null;
}

export const SelectUsersDrink = ({
  setError,
  error,
  user,
}: SelectUsersDrinkProps) => {
  const { mutate: addDrinkOrder } = useUpdateDrinkOrder();
  const [drinkChoice, setDrinkChoice] = useState<DrinkOrder | null>(null);
  const [additionalSpecification, setAdditionalSpecification] = useState<
    AdditionalSpecification[]
  >([]);

  console.log(additionalSpecification);

  const handleChange = ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    if (!value) {
      setError({ ...error, drinkChoice: "Please enter a drink" });
      return;
    }
    setError({ ...error, drinkChoice: "" });
    // addDrinkOrder(
    //   {},
    //   {
    //     onSuccess: (data: any) => {
    //       console.log("User added successfully:", data);
    //     },
    //     onError: (apiError: any) => {
    //       setError({
    //         ...error,
    //         user: "An error occurred, please try again later.",
    //       });
    //       console.error("Error adding user:", apiError);
    //     },
    //   }
    // );
  };

  return (
    <div>
      <div>
        <TextField
          error={!!error?.drinkChoice}
          helperText={error?.drinkChoice}
          label="Add Drink Name"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          error={!!error?.drinkChoice}
          helperText={error?.drinkChoice}
          label="Add Drink Type"
          variant="outlined"
          onChange={handleChange}
        />
      </div>
      <div>
        <Typography variant="h6" gutterBottom>
          Additional Specifications
        </Typography>
      </div>

      {[...additionalSpecification, { key: "", value: "" }].map((spec, idx) => {
        return (
          <div>
            <TextField
              error={!!error?.drinkChoice}
              helperText={error?.drinkChoice}
              label="Key"
              variant="outlined"
              value={spec.key || ""}
              onChange={(e) => {
                const newValue = e.target.value;
                const updatedSpecifications = [...additionalSpecification];
                updatedSpecifications[idx] = {
                  ...updatedSpecifications[idx],
                  key: newValue,
                };

                setAdditionalSpecification(updatedSpecifications);
              }}
            />
            <TextField
              error={!!error?.drinkChoice}
              helperText={error?.drinkChoice}
              label="Value"
              variant="outlined"
              value={spec.value || ""}
              onChange={(e) => {
                const newValue = e.target.value;
                const updatedSpecifications = [...additionalSpecification];
                updatedSpecifications[idx] = {
                  ...updatedSpecifications[idx],
                  value: newValue,
                };

                setAdditionalSpecification(updatedSpecifications);
              }}
            />
          </div>
        );
      })}

      <button onClick={() => ""}>Add drink</button>
    </div>
  );
};

export default withTranslation(SelectUsersDrink, "landing");
