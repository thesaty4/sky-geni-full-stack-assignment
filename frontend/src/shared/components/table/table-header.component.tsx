import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { JSX, useState } from "react";
import { TableHeaderType } from "../../types";
import { ExtendedString } from "../../types/util.type";

/**
 * Props for the TableHeader component
 * @typedef {Object} TableHeaderProps
 * @property {TableHeaderType[]} headers - Array of header configurations
 * @property {Function} [onSort] - Callback function for sort events
 */
type TableHeaderProps = {
  headers: TableHeaderType[];
  onSort?: (config: {
    order: ExtendedString<"asc" | "desc">;
    orderBy: string;
  }) => void;
};

/**
 * Table header component that renders a multi-level header with sorting capability
 * @param {TableHeaderProps} props - Component props
 * @returns {JSX.Element} The table header element
 */
const TableHeader = ({ headers, onSort }: TableHeaderProps) => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("");

  /**
   * Calculates the depth of a header structure
   * @param {TableHeaderType} header - Header item to calculate depth for
   * @returns {number} Maximum depth of the header structure
   */
  const getDepth = (header: TableHeaderType): number => {
    if (!header.children) return 1;
    return 1 + Math.max(...header.children.map(getDepth));
  };

  /**
   * Counts the number of leaf nodes in a header structure
   * @param {TableHeaderType} header - Header item to count leaves for
   * @returns {number} Number of leaf nodes
   */
  const getLeavesCount = (header: TableHeaderType): number => {
    if (!header.children) return 1;
    return header.children.reduce(
      (sum, child) => sum + getLeavesCount(child),
      0
    );
  };

  const maxDepth = Math.max(...headers.map(getDepth));

  /**
   * Handles sort column click events
   * @param {string} column - Column field name to sort by
   */
  const handleSort = (column: string) => {
    const newOrder = orderBy === column && order === "asc" ? "desc" : "asc";
    setOrder(newOrder);
    setOrderBy(column);
    onSort?.({ order: newOrder, orderBy: column });
  };

  /**
   * Recursively renders header cells
   * @param {TableHeaderType[]} headers - Array of header items to render
   * @param {number} currentDepth - Current recursion depth
   * @param {number} targetDepth - Target depth to render
   * @param {string} parentKey - Key prefix for React keys
   * @returns {JSX.Element[]} Array of header cell elements
   */
  const renderHeaderCells = (
    headers: TableHeaderType[],
    currentDepth: number,
    targetDepth: number,
    parentKey: string
  ): JSX.Element[] => {
    return headers.flatMap((header, ind) => {
      const currentKey = `${parentKey}-${header.fieldName}-${ind}`;
      if (currentDepth < targetDepth && header.children) {
        return renderHeaderCells(
          header.children,
          currentDepth + 1,
          targetDepth,
          currentKey
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
            key={currentKey}
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
        <TableRow key={`depth-${depth}`}>
          {renderHeaderCells(headers, 0, depth, `depth-${depth}`)}
        </TableRow>
      ))}
    </TableHead>
  );
};

export default TableHeader;
