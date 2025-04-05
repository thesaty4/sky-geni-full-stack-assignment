export type TableHeaderType = {
  label: string;
  fieldName: string;
  prefixText?: string;
  postfixText?: string;
  bgColor?: string;
  width?: string;
  children?: TableHeaderType[];
};

export interface SharedTableProps<T> {
  isFooterTotal?: boolean;
  headers: TableHeaderType[];
  dataList: T[];
}
