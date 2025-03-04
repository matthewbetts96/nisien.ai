import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";
import useDrinkRun from "context/DrinkRunContext";
import withTranslation, { t } from "hocs/withTranslation/withTranslation";

interface DrinkRunUsersTableProps {
  t: t;
}

export const DrinkRunUsersTable = ({ t }: DrinkRunUsersTableProps) => {
  const { drinkRunUsers } = useDrinkRun();

  if (!drinkRunUsers.length) {
    return <div id="no-drink-run-users" />;
  }

  return (
    <div>
      <Typography variant="h6" gutterBottom color="textPrimary">
        {t("currentUsers")}
      </Typography>
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
    </div>
  );
};

export default withTranslation(DrinkRunUsersTable, "landing");
