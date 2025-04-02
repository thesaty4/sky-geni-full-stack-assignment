export interface TableData<T> {
  headers: string[];
  rows: T[];
}

export interface SharedTableProps<T> {
  data: TableData<T>;
}
