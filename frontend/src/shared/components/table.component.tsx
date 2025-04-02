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
  data,
}: SharedTableProps<T>) => {
  const defaultOrderBy = data.headers.length > 0 ? data.headers[0] : "";
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>(defaultOrderBy);

  const handleSort = (column: string) => {
    setOrder((prev) => (orderBy === column && prev === "asc" ? "desc" : "asc"));
    setOrderBy(column);
  };

  const sortedRows = useMemo(() => {
    return [...data.rows].sort((a, b) => {
      const aValue = a[orderBy] ?? "";
      const bValue = b[orderBy] ?? "";

      if (typeof aValue === "number" && typeof bValue === "number") {
        return order === "asc" ? aValue - bValue : bValue - aValue;
      }

      return order === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }, [data.rows, order, orderBy]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {data.headers.map((header) => (
              <TableCell key={header}>
                <TableSortLabel
                  active={orderBy === header}
                  direction={orderBy === header ? order : "asc"}
                  onClick={() => handleSort(header)}
                >
                  {header}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedRows.map((row, index) => (
            <TableRow key={index}>
              {data.headers.map((header) => (
                <TableCell key={header}>
                  {typeof row[header] === "number"
                    ? row[header].toLocaleString()
                    : String(row[header])}
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
