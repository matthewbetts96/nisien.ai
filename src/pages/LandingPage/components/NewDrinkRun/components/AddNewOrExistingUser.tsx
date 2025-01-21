import { TextField } from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import withTranslation from "hocs/withTranslation/withTranslation";
import { useGetUsers } from "hooks/useUsers/useGetUsers";
import { withErrorAndLoadingHandler as ErrorAndLoadingHandler } from "hocs/withErrorAndLoadingHandler/withErrorAndLoadingHandler";
import useDrinkRun, { User } from "context/DrinkRunContext";

const filter = createFilterOptions<any>();

const AddNewOrExistingUser = () => {
  const { data = [], isLoading, error: getUserError, refetch } = useGetUsers();

  const { addNewUser, addNewDrinkRunUser, error, setNewUser } = useDrinkRun();

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
            console.log("newValue", newValue);
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
              title: `Add new user "${inputValue}"`,
            });
          }
          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="add-new-or-existing-user"
        options={data}
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
            label="Add or Select User"
            error={!!error.user}
            helperText={error.user}
          />
        )}
      />
    </ErrorAndLoadingHandler>
  );
};

export default withTranslation(AddNewOrExistingUser, "landing");
