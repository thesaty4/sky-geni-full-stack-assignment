export type TableHeaderType = {
  label: string;
  fieldName: string;
  prefixText?: string;
  postfixText?: string;
  children?: TableHeaderType[];
};

export interface SharedTableProps<T> {
  headers: TableHeaderType[];
  dataList: T[];
}
