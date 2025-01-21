import { TextField } from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import withTranslation, { t } from "hocs/withTranslation/withTranslation";
import { useGetUsers } from "hooks/useUsers/useGetUsers";
import { withErrorAndLoadingHandler as ErrorAndLoadingHandler } from "hocs/withErrorAndLoadingHandler/withErrorAndLoadingHandler";
import useDrinkRun, { DrinkOrder, User } from "context/DrinkRunContext";
import { useGetDrinkRun } from "hooks/useDrinkRun/useGetDrinkRun";

const filter = createFilterOptions<any>();

interface AddNewOrExistingUserProps {
  t: t;
}

const AddNewOrExistingUser = ({ t }: AddNewOrExistingUserProps) => {
  const { data = [], isLoading, error: getUserError, refetch } = useGetUsers();

  const { addNewUser, addNewDrinkRunUser, error, setNewUser } = useDrinkRun();

  const { data: drinkRunData, isLoading: drinkDataLoading } = useGetDrinkRun();

  if (drinkDataLoading) {
    return <></>;
  }
  const usersAlreadyInDrinkRun = drinkRunData
    .map((order: any) => order.orders.map((i: DrinkOrder) => i.userId))
    .flat();

  const filteredData = data.filter(
    (user: any) => !usersAlreadyInDrinkRun.includes(user.id.toString())
  );

  return (
    <ErrorAndLoadingHandler
      isLoading={isLoading}
      error={getUserError}
      refetch={refetch}
    >
      <Autocomplete
        onChange={(_, newValue: any) => {
          if (!newValue) {
            return;
          }
          if (typeof newValue === "string") {
            addNewUser(newValue);
          } else if (newValue?.inputValue) {
            addNewUser(newValue.inputValue);
          } else {
            //if the user already has a set drink, then we can directly add them
            if (!!newValue?.drinkOrders.length) {
              addNewDrinkRunUser(newValue);
              return;
            }
            //else we add them
            setNewUser(newValue);
          }
        }}
        filterOptions={(options: User[], params) => {
          const filtered = filter(options, params);
          const { inputValue } = params;
          const isExisting = options.some(
            (option) => inputValue === `${option.firstName} ${option.lastName}`
          );
          if (inputValue !== "" && !isExisting) {
            filtered.push({
              inputValue,
              title: `${t("addNewUser")} "${inputValue}"`,
            });
          }
          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="add-new-or-existing-user"
        options={filteredData}
        getOptionLabel={(option) => {
          if (typeof option === "string") return option;
          if (option.inputValue) return option.inputValue;
          return `${option.firstName} ${option.lastName}`;
        }}
        renderOption={(props, { firstName, lastName, inputValue, title }) => {
          const { key, ...optionProps } = props;
          if (inputValue) {
            return (
              <li key={key} {...optionProps}>
                {title}
              </li>
            );
          }
          return (
            <li key={key} {...optionProps}>
              {firstName} {lastName}
            </li>
          );
        }}
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            label={t("addOrSelectNewUser")}
            error={!!error.user}
            helperText={error.user}
          />
        )}
      />
    </ErrorAndLoadingHandler>
  );
};

export default withTranslation(AddNewOrExistingUser, "landing");
