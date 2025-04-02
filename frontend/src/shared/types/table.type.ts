export type TableHeaderType = {
  label: string;
  fieldName: string;
};

export interface SharedTableProps<T> {
  headers: TableHeaderType[];
  dataList: T[];
}
