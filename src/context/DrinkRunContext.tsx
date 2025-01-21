import { useUpdateDrinkOrder } from "hooks/useDrinkOrder/useUpdateDrinkOrder";
import { useGetDrinkRun } from "hooks/useDrinkRun/useGetDrinkRun";
import { useUpdateDrinkRun } from "hooks/useDrinkRun/useUpdateDrinkRun";
import { useGetUsers } from "hooks/useUsers/useGetUsers";
import { useCreateUser } from "hooks/useUsers/useUpdateUsers";
import React, { createContext, useState, useContext, ReactNode } from "react";

export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  drinkOrders?: DrinkOrder[];
}

export interface DrinkOrder {
  id: string;
  userId: string;
  name: string;
  type: string;
  additionalSpecification: AdditionalSpecification[];
}

export interface AdditionalSpecification {
  key: string;
  value: string;
}

interface DrinkRunContextProps {
  newUser: User;
  setNewUser: React.Dispatch<React.SetStateAction<User>>;
  drinkRunUsers: User[];
  newDrinkOrder: DrinkOrder | null;
  error: DrinkRunError;
  addNewUser: (title: string) => void;
  clearNewUser: () => void;
  addNewDrinkRunUser: (order: User) => void;
  addDrinkChoice: (type: "name" | "type", input: string) => void;
  addAdditionalSpecification: (input: AdditionalSpecification[]) => void;
  handleAddDrinkOrder: () => void;
  createNewDrinkRun: () => void;
  clearDrinkOrder: () => void;
  clearDrinkRunUsers: () => void;
  clearErrors: () => void;
}

export interface DrinkRunError {
  user: string;
  drinkChoice: string;
  additionalSpecification: string;
}

export const DrinkRunContext = createContext<DrinkRunContextProps | undefined>(
  undefined
);

interface DrinkRunProviderProps {
  children: ReactNode;
}

export const DrinkRunProvider: React.FC<DrinkRunProviderProps> = ({
  children,
}) => {
  const [newUser, setNewUser] = useState<User>({ firstName: "", lastName: "" });
  const [newDrinkOrder, setNewDrinkOrder] = useState<DrinkOrder | null>(null);
  const [drinkRunUsers, setDrinkRunUsers] = useState<User[]>([]);
  const [error, setError] = useState<DrinkRunError>({
    user: "",
    drinkChoice: "",
    additionalSpecification: "",
  });

  const { mutate: addUser } = useCreateUser();
  const { refetch } = useGetUsers();
  const { mutate: addDrinkOrder } = useUpdateDrinkOrder();
  const { mutate: createDrinkRun } = useUpdateDrinkRun();
  const { refetch: refetchDrinkRun } = useGetDrinkRun();

  const clearDrinkOrder = () => {
    setNewDrinkOrder(null);
  };

  const clearNewUser = () => {
    setNewUser({ firstName: "", lastName: "" });
  };

  const clearDrinkRunUsers = () => {
    setDrinkRunUsers([]);
  };

  const clearErrors = () => {
    setError({
      user: "",
      drinkChoice: "",
      additionalSpecification: "",
    });
  };

  const addNewUser = (title: string) => {
    const [firstName, lastName] = title.split(/ (.*)/);
    if (!lastName) {
      setError({ ...error, user: "Please enter both first and last name." });
      return;
    }

    setError({ ...error, user: "" });
    addUser(
      { firstName, lastName },
      {
        onSuccess: (data: any) => {
          setNewUser(data);
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
  };

  const addNewDrinkRunUser = (order: User) => {
    setDrinkRunUsers((prevUsers: User[]) => {
      if (prevUsers.some((user: User) => user.id === order.id)) {
        return prevUsers;
      }

      return [...prevUsers, order];
    });
    clearNewUser();
  };

  const addDrinkChoice = (key: "name" | "type", input: string) => {
    setNewDrinkOrder({
      ...newDrinkOrder,
      id: newUser.id,
      [key]: input,
    } as DrinkOrder);
  };

  const addAdditionalSpecification = (input: AdditionalSpecification[]) => {
    setNewDrinkOrder({
      ...newDrinkOrder,
      additionalSpecification: input,
    } as DrinkOrder);
  };

  const handleAddDrinkOrder = () => {
    addDrinkOrder(
      {
        name: newDrinkOrder?.name,
        type: newDrinkOrder?.type,
        additionalSpecification:
          newDrinkOrder?.additionalSpecification?.reduce(
            (obj: any, item: any) => {
              obj[item.key] = item.value;
              return obj;
            },
            {}
          ) || [],
        userId: newUser?.id,
      },
      {
        onSuccess: (data: any) => {
          addNewDrinkRunUser({
            id: newUser.id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            drinkOrders: [data],
          });
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

    clearNewUser();
    clearErrors();
  };

  const createNewDrinkRun = () => {
    createDrinkRun(
      {
        participants: drinkRunUsers.map((i) => ({ userId: i.id?.toString() })),
      },
      {
        onSuccess: (data: any) => {
          setNewUser(data);
          refetch();
          refetchDrinkRun();
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
  };

  return (
    <DrinkRunContext.Provider
      value={{
        addNewUser,
        clearNewUser,
        clearDrinkOrder,
        newUser,
        addNewDrinkRunUser,
        drinkRunUsers,
        error,
        clearDrinkRunUsers,
        addDrinkChoice,
        addAdditionalSpecification,
        newDrinkOrder,
        handleAddDrinkOrder,
        clearErrors,
        setNewUser,
        createNewDrinkRun,
      }}
    >
      {children}
    </DrinkRunContext.Provider>
  );
};

export const useDrinkRun = (): DrinkRunContextProps => {
  const context = useContext(DrinkRunContext);
  if (!context) {
    throw new Error("useDrinkRun must be used within a BasketProvider");
  }
  return context;
};

export default useDrinkRun;
