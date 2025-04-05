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

        let bgColor = !isLeaf ? (ind % 2 ? "#4371C4" : "#5B9AD5") : "#f5f5f5";
        let textColor = !isLeaf ? "#ffffff" : "";

        bgColor = header.bgColor === "" ? "" : bgColor;
        textColor = header.bgColor === "" ? "" : textColor;

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
              minWidth: header.width,
              padding: "5px",
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
        <TableRow key={depth}>{renderHeaderCells(headers, 0, depth)}</TableRow>
      ))}
    </TableHead>
  );
};

export default TableHeader;
