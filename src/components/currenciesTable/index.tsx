import * as React from "react";
//MATERIAL UI
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";

import { Currencies } from "@/data/types";

import styles from "./styles.module.scss";

interface ICurrenciesTableProps {
  data: Currencies[];
  setFromValue: (currency: Currencies) => void;
  setToValue: (currency: Currencies) => void;
  showAllCurr: boolean;
}

const CurrenciesTable = ({ data, setFromValue, setToValue, showAllCurr }: ICurrenciesTableProps) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className={`${styles.wrapper} ${showAllCurr ? styles.showAllCurr : ""}`}>
      <TableContainer className={styles.tableContainer}>
        <Table stickyHeader>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((currency: Currencies) => (
              <TableRow key={currency.shortName}>
                <TableCell component="th" scope="row">
                  {currency.shortName.toUpperCase()} - {currency.fullName}
                </TableCell>
                <TableCell className={styles.setButtons}>
                  <Button
                    variant="contained"
                    className={styles.setter}
                    onClick={() => {
                      setFromValue(currency);
                    }}
                  >
                    Set From
                  </Button>
                  <Button
                    variant="contained"
                    className={styles.setter}
                    onClick={() => {
                      setToValue(currency);
                    }}
                  >
                    Set To
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};
export default CurrenciesTable;
