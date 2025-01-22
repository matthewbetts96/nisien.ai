import { render, screen } from "@testing-library/react";
import { DrinkRunContext, User } from "context/DrinkRunContext";
import { DrinkRunUsersTable } from "./DrinkRunUsersTable";

const mockClearDrinkRunUsers = jest.fn();
const mockClearNewUser = jest.fn();
const mockClearErrors = jest.fn();
const mockCreateNewDrinkRun = jest.fn();
const mockClearDrinkOrder = jest.fn();
const mockSetNewUser = jest.fn();
const mockHandleAddDrinkOrder = jest.fn();
const mockAddNewUser = jest.fn();
const mockAddNewDrinkRunUser = jest.fn();
const mockAddDrinkChoice = jest.fn();
const mockAddAdditionalSpecification = jest.fn();

// Mock `withTranslation`
const t = (x: string) => x;

describe("DrinkRunUsersTable", () => {
  const foo = {
    clearDrinkRunUsers: mockClearDrinkRunUsers,
    clearNewUser: mockClearNewUser,
    clearErrors: mockClearErrors,
    createNewDrinkRun: mockCreateNewDrinkRun,
    clearDrinkOrder: mockClearDrinkOrder,
    drinkRunUsers: [
      {
        id: "1",
        firstName: "Test",
        lastName: "bob",
        drinkOrders: [{ name: "name", type: "type" }],
      } as User,
    ],
    addNewUser: mockAddNewUser,
    newUser: { firstName: "", lastName: "" },
    addNewDrinkRunUser: mockAddNewDrinkRunUser,
    error: {
      user: "",
      drinkChoice: "",
      additionalSpecification: "",
    },
    addDrinkChoice: mockAddDrinkChoice,
    addAdditionalSpecification: mockAddAdditionalSpecification,
    newDrinkOrder: null,
    handleAddDrinkOrder: mockHandleAddDrinkOrder,
    setNewUser: mockSetNewUser,
  };

  it("should render correct items in the table", async () => {
    render(
      <DrinkRunContext.Provider value={foo}>
        <DrinkRunUsersTable t={t} />
      </DrinkRunContext.Provider>
    );

    //Title
    await screen.findByText("currentUsers");

    //Content
    await screen.findByText("Test");
    await screen.findByText("bob");
    await screen.findByText("name");
    await screen.findByText("type");
  });
});
