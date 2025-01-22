import { render, screen } from "@testing-library/react";
import { DrinkRunContext } from "context/DrinkRunContext";
import { SelectUsersDrink } from "./SelectUsersDrink";

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

describe("SelectUsersDrink", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should render nothing if no first name", async () => {
    const foo = {
      clearDrinkRunUsers: mockClearDrinkRunUsers,
      clearNewUser: mockClearNewUser,
      clearErrors: mockClearErrors,
      createNewDrinkRun: mockCreateNewDrinkRun,
      clearDrinkOrder: mockClearDrinkOrder,
      drinkRunUsers: [],
      addNewUser: mockAddNewUser,
      newUser: { firstName: "", lastName: "vgvu" },
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
    render(
      <DrinkRunContext.Provider value={foo}>
        <SelectUsersDrink t={t} />
      </DrinkRunContext.Provider>
    );

    await screen.findByTestId("no-name");
  });

  it("should render nothing if no last  name", async () => {
    const foo = {
      clearDrinkRunUsers: mockClearDrinkRunUsers,
      clearNewUser: mockClearNewUser,
      clearErrors: mockClearErrors,
      createNewDrinkRun: mockCreateNewDrinkRun,
      clearDrinkOrder: mockClearDrinkOrder,
      drinkRunUsers: [],
      addNewUser: mockAddNewUser,
      newUser: { firstName: "dfgdg", lastName: "" },
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
    render(
      <DrinkRunContext.Provider value={foo}>
        <SelectUsersDrink t={t} />
      </DrinkRunContext.Provider>
    );

    await screen.findByTestId("no-name");
  });

  it("should render nothing if the user does have drink orders", async () => {
    const foo = {
      clearDrinkRunUsers: mockClearDrinkRunUsers,
      clearNewUser: mockClearNewUser,
      clearErrors: mockClearErrors,
      createNewDrinkRun: mockCreateNewDrinkRun,
      clearDrinkOrder: mockClearDrinkOrder,
      drinkRunUsers: [],
      addNewUser: mockAddNewUser,
      newUser: {
        firstName: "sfsdf",
        lastName: "sdfsf",
        drinkOrders: [
          {
            id: "string",
            userId: "string",
            name: "string",
            type: "string",
            additionalSpecification: [],
          },
        ],
      },
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
    render(
      <DrinkRunContext.Provider value={foo}>
        <SelectUsersDrink t={t} />
      </DrinkRunContext.Provider>
    );

    await screen.findByTestId("no-drink-orders");
  });

  it("should render correct items", async () => {
    const foo = {
      clearDrinkRunUsers: mockClearDrinkRunUsers,
      clearNewUser: mockClearNewUser,
      clearErrors: mockClearErrors,
      createNewDrinkRun: mockCreateNewDrinkRun,
      clearDrinkOrder: mockClearDrinkOrder,
      drinkRunUsers: [],
      addNewUser: mockAddNewUser,
      newUser: {
        firstName: "sfsdf",
        lastName: "sdfsf",
        drinkOrders: [],
      },
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
    render(
      <DrinkRunContext.Provider value={foo}>
        <SelectUsersDrink t={t} />
      </DrinkRunContext.Provider>
    );

    await screen.findAllByText("key");
    await screen.findAllByText("value");
    await screen.findByText("addDrink");
  });
});
