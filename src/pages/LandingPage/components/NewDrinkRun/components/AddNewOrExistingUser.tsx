import { TextField } from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import withTranslation from "hocs/withTranslation/withTranslation";
import { useGetUsers } from "hooks/useUsers/useGetUsers";
import { withErrorAndLoadingHandler as ErrorAndLoadingHandler } from "hocs/withErrorAndLoadingHandler/withErrorAndLoadingHandler";
import { useEffect } from "react";
import { useCreateUser } from "hooks/useUsers/useUpdateUsers";
import { DrinkRunError, isInvalidUser, User, ValidUser } from "../NewDrinkRun";

interface AddNewOrExistingUserProps {
  setUser: (user: User) => void;
  user: User | null;
  error: DrinkRunError;
  setError: (error: DrinkRunError) => void;
}

const filter = createFilterOptions<any>();

const AddNewOrExistingUser = ({
  setUser,
  user,
  error,
  setError,
}: AddNewOrExistingUserProps) => {
  const { data = [], isLoading, error: getUserError, refetch } = useGetUsers();

  const { mutate: addUser } = useCreateUser();

  useEffect(() => {
    if (isInvalidUser(user)) {
      const [firstName, lastName] = user.title.split(/ (.*)/);

      if (!lastName) {
        setError({ ...error, user: "Please enter both first and last name." });
        return;
      }

      setError({ ...error, user: "" });
      addUser(
        { firstName, lastName },
        {
          onSuccess: (data: any) => {
            console.log("User added successfully:", data);
            setUser(data);
            refetch();
          },
          onError: (apiError: any) => {
            setError({
              ...error,
              user: "An error occurred, please try again later.",
            });
            console.error("Error adding user:", apiError);
          },
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <ErrorAndLoadingHandler
      isLoading={isLoading}
      error={getUserError}
      refetch={refetch}
    >
      <Autocomplete
        onChange={(_, newValue: any) => {
          if (typeof newValue === "string") {
            setUser({ title: newValue });
          } else if (newValue?.inputValue) {
            setUser({ title: newValue.inputValue });
          } else {
            setUser(newValue);
          }
        }}
        filterOptions={(options: ValidUser[], params) => {
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
