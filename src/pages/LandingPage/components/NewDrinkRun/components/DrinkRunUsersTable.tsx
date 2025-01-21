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
import withTranslation, { t } from "hocs/withTranslation/withTranslation";

interface DrinkRunUsersTableProps {
  t: t;
}

const DrinkRunUsersTable = ({ t }: DrinkRunUsersTableProps) => {
  const { drinkRunUsers } = useDrinkRun();

  if (!drinkRunUsers.length) {
    return <></>;
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell>{t("firstName")}</TableCell>
            <TableCell>{t("lastName")}</TableCell>
            <TableCell>{t("drinkName")}</TableCell>
            <TableCell>{t("drinkType")}</TableCell>
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

export default withTranslation(DrinkRunUsersTable, "landing");
