import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { useMemo, useState } from "react";
import { SharedTableProps } from "../types/table.type";

const SharedTable = <T extends Record<string, string>>({
  headers,
  dataList,
}: SharedTableProps<T>) => {
  const defaultOrderBy = headers.length > 0 ? headers[0].fieldName : "";
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>(defaultOrderBy);

  const handleSort = (column: string) => {
    setOrder((prev) => (orderBy === column && prev === "asc" ? "desc" : "asc"));
    setOrderBy(column);
  };

  const sortedRows = useMemo(() => {
    return [...dataList].sort((a, b) => {
      const aValue = a[orderBy] ?? "";
      const bValue = b[orderBy] ?? "";

      if (typeof aValue === "number" && typeof bValue === "number") {
        return order === "asc" ? aValue - bValue : bValue - aValue;
      }

      return order === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }, [dataList, order, orderBy]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={header.fieldName}>
                <TableSortLabel
                  active={orderBy === header.fieldName}
                  direction={orderBy === header.fieldName ? order : "asc"}
                  onClick={() => handleSort(header.fieldName)}
                >
                  {header.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedRows.map((row, index) => (
            <TableRow key={index}>
              {headers.map((header) => (
                <TableCell key={header.fieldName}>
                  {typeof row[header.fieldName] === "number"
                    ? row[header.fieldName].toLocaleString()
                    : String(row[header.fieldName])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SharedTable;
