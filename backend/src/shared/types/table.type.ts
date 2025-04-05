export type Cols = {
  field: string;
  headerName: string;
  width: number;
  type?: string;
  valueFormatter?: (params: any) => string;
};
