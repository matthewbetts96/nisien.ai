import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import useDrinkRun from "context/DrinkRunContext";

export const DrinkRunUsersTable = () => {
  const { drinkRunUsers } = useDrinkRun();

  if (!drinkRunUsers.length) {
    return <></>;
  }

  console.log("drinkRunUsers", drinkRunUsers);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Drink Name</TableCell>
            <TableCell>Drink Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {drinkRunUsers.map((row: any) => (
            <TableRow key={row.id}>
              <TableCell>{row.firstName}</TableCell>
              <TableCell>{row.lastName}</TableCell>
              <TableCell>{row.drinkOrders[0].name || ""}</TableCell>
              <TableCell>{row.drinkOrders[0].type || ""}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
