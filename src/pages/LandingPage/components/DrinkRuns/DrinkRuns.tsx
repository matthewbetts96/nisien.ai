import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import withTranslation from "hocs/withTranslation/withTranslation";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  InfoOutlined,
} from "@mui/icons-material";
import { useGetDrinkRun } from "hooks/useDrinkRun/useGetDrinkRun";
import { withErrorAndLoadingHandler as ErrorAndLoadingHandler } from "hocs/withErrorAndLoadingHandler/withErrorAndLoadingHandler";
import { useState } from "react";

export const DrinkRuns = () => {
  const { data = [], isLoading, error, refetch } = useGetDrinkRun();

  return (
    <ErrorAndLoadingHandler
      isLoading={isLoading}
      error={error}
      refetch={refetch}
    >
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Number of Drinks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: any) => (
              <ExpandableRow key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ErrorAndLoadingHandler>
  );
};

const ExpandableRow = ({ row }: { row: any }) => {
  const [open, setOpen] = useState(false);

  const orders = row.orders;
  const drinkMaker = row.drinkMaker;

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{drinkMaker.firstName}</TableCell>
        <TableCell>{drinkMaker.lastName}</TableCell>
        <TableCell>{orders.length}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Requestee</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Type</TableCell>
                  <TableCell align="center">Additional Specification</TableCell>
                </TableRow>
              </TableHead>
              {orders.map((order: any) => {
                console.log(order);
                return (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center"></TableCell>
                      <TableCell align="center">{order.name}</TableCell>
                      <TableCell align="center">{order.type}</TableCell>
                      <TableCell align="center">
                        <InfoOutlined />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                );
              })}
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default withTranslation(DrinkRuns, "landing");
