import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { useMemo, useState } from "react";
import { Path } from "../../types/common.type";
import { SharedTableProps } from "../../types/table.type";
import { ExtendedString } from "../../types/util.type";
import { get } from "../../utils/common.util";
import TableHeader from "./table-header.component";

const SharedTable = <T extends Record<string, unknown>>({
  isFooterTotal,
  headers,
  dataList,
}: SharedTableProps<T>) => {
  const [order, setOrder] = useState<ExtendedString<"asc" | "desc">>("asc");
  const [orderBy, setOrderBy] = useState<string>("");

  const sortedRows = useMemo(() => {
    if (!orderBy) return dataList;

    return [...dataList].sort((a, b) => {
      const aValue = get(a, orderBy as Path<T, keyof T>) ?? "";
      const bValue = get(b, orderBy as Path<T, keyof T>) ?? "";

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
        <TableHeader
          headers={headers}
          onSort={(config) => {
            setOrder(config.order);
            setOrderBy(config.orderBy);
          }}
        />
        <TableBody>
          {sortedRows.map((row, outerIndex) => (
            <TableRow
              key={outerIndex}
              sx={{ background: outerIndex % 2 ? "#F5F5F5" : "" }}
            >
              {headers.map((header, headerIndex) =>
                header?.children?.map((childHeader, childIndex) => (
                  <TableCell
                    align="center"
                    key={`${headerIndex}-${childIndex}`}
                    sx={{
                      border: "1px solid #e0e0e0",
                      padding: "5px",
                      fontWeight:
                        isFooterTotal && outerIndex === sortedRows.length - 1
                          ? 600
                          : 0,
                    }}
                  >
                    {childHeader?.prefixText}
                    {get(
                      row,
                      `${header.fieldName}.${childHeader.fieldName}` as never
                    )}{" "}
                    {childHeader?.postfixText}
                  </TableCell>
                ))
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SharedTable;
