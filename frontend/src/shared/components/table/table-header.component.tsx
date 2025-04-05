import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { JSX, useState } from "react";
import { TableHeaderType } from "../../types";
import { ExtendedString } from "../../types/util.type";

type TableHeaderProps = {
  headers: TableHeaderType[];
  onSort?: (config: {
    order: ExtendedString<"asc" | "desc">;
    orderBy: string;
  }) => void;
};

const TableHeader = ({ headers, onSort }: TableHeaderProps) => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("");

  const getDepth = (header: TableHeaderType): number => {
    if (!header.children) return 1;
    return 1 + Math.max(...header.children.map(getDepth));
  };

  const getLeavesCount = (header: TableHeaderType): number => {
    if (!header.children) return 1;
    return header.children.reduce(
      (sum, child) => sum + getLeavesCount(child),
      0
    );
  };

  const maxDepth = Math.max(...headers.map(getDepth));

  const handleSort = (column: string) => {
    const newOrder = orderBy === column && order === "asc" ? "desc" : "asc";
    setOrder(newOrder);
    setOrderBy(column);
    onSort?.({ order: newOrder, orderBy: column });
  };

  const renderHeaderCells = (
    headers: TableHeaderType[],
    currentDepth: number,
    targetDepth: number
  ): JSX.Element[] => {
    return headers.flatMap((header, ind) => {
      if (currentDepth < targetDepth && header.children) {
        return renderHeaderCells(
          header.children,
          currentDepth + 1,
          targetDepth
        );
      }

      if (currentDepth === targetDepth) {
        const isLeaf = !header.children;
        const colSpan = isLeaf ? 1 : getLeavesCount(header);
        const rowSpan = isLeaf ? maxDepth - targetDepth : 1;

        const bgColor = !isLeaf ? (ind % 2 ? "#5B9AD5" : "#4371C4") : "#f5f5f5"; // "#f5f5f5",
        const textColor = !isLeaf ? "#ffffff" : "";

        return (
          <TableCell
            key={header.fieldName}
            colSpan={colSpan}
            rowSpan={rowSpan}
            align="center"
            sx={{
              border: "1px solid #e0e0e0",
              backgroundColor: bgColor,
              fontWeight: 600,
              color: textColor,
            }}
          >
            {isLeaf ? (
              <TableSortLabel
                active={orderBy === header.fieldName}
                direction={orderBy === header.fieldName ? order : "asc"}
                onClick={() => handleSort(header.fieldName)}
              >
                {header.label}
              </TableSortLabel>
            ) : (
              header.label
            )}
          </TableCell>
        );
      }

      return [];
    });
  };

  return (
    <TableHead>
      {Array.from({ length: maxDepth }).map((_, depth) => (
        <TableRow key={depth}>
          {/* First column (Cust Type) */}
          {/* {depth === 0 && (
            <TableCell
              rowSpan={maxDepth}
              align="center"
              sx={{
                border: "1px solid #e0e0e0",
                backgroundColor: "#f5f5f5",
                fontWeight: 600,
              }}
            >
              Cust Type
            </TableCell>
          )} */}
          {renderHeaderCells(headers, 0, depth)}
          {/* Last column (Total) */}
          {/* {depth === 0 && (
            <TableCell
              rowSpan={maxDepth}
              align="center"
              sx={{
                border: "1px solid #e0e0e0",
                backgroundColor: "#f5f5f5",
                fontWeight: 600,
              }}
            >
              Total
            </TableCell>
          )} */}
        </TableRow>
      ))}
    </TableHead>
  );
};

export default TableHeader;
