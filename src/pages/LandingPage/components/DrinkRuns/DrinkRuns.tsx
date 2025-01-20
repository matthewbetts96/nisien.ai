import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import withTranslation from "hocs/withTranslation/withTranslation";
import { useGetDrinkRun } from "hooks/useDrinkRun/useGetDrinkRun";
import { withErrorAndLoadingHandler as ErrorAndLoadingHandler } from "hocs/withErrorAndLoadingHandler/withErrorAndLoadingHandler";

export const DrinkRuns = () => {
  const { data, isLoading, error, refetch } = useGetDrinkRun();

  return (
    <ErrorAndLoadingHandler
      isLoading={isLoading}
      error={error}
      refetch={refetch}
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[].map((row: any) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ErrorAndLoadingHandler>
  );
};

export default withTranslation(DrinkRuns, "landing");
