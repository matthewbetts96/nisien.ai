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
  Tooltip,
  Typography,
} from "@mui/material";
import withTranslation, { t } from "hocs/withTranslation/withTranslation";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  InfoOutlined,
} from "@mui/icons-material";
import { useGetDrinkRun } from "hooks/useDrinkRun/useGetDrinkRun";
import { withErrorAndLoadingHandler as ErrorAndLoadingHandler } from "hocs/withErrorAndLoadingHandler/withErrorAndLoadingHandler";
import { useState } from "react";
import { DrinkOrder } from "context/DrinkRunContext";

interface DrinkRunsProps {
  t: t;
}

export const DrinkRuns = ({ t }: DrinkRunsProps) => {
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
              <TableCell>{t("firstName")}</TableCell>
              <TableCell>{t("lastName")}</TableCell>
              <TableCell>{t("drinkNum")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: any) => (
              <ExpandableRow key={row.name} row={row} t={t} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ErrorAndLoadingHandler>
  );
};

const ExpandableRow = ({ row, t }: { row: any; t: t }) => {
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
                  <TableCell align="center">{t("requestee")}</TableCell>
                  <TableCell align="center">{t("name")}</TableCell>
                  <TableCell align="center">{t("type")}</TableCell>
                  <TableCell align="center">{t("additionalSpec")}</TableCell>
                </TableRow>
              </TableHead>
              {orders.map((order: DrinkOrder) => {
                return (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center"></TableCell>
                      <TableCell align="center">{order.name}</TableCell>
                      <TableCell align="center">{order.type}</TableCell>
                      <TableCell align="center">
                        <Tooltip
                          title={
                            <div>
                              {Object.entries(
                                order.additionalSpecification
                              ).map((i) => `${i[0]}: ${i[1]}`)}
                            </div>
                          }
                        >
                          <InfoOutlined />
                        </Tooltip>
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
