import SharedTable from "../../shared/components/table.component";
import { TableHeaderType } from "../../shared/types/table.type";

const header: TableHeaderType[] = [
  {
    label: "Name",
    fieldName: "name",
  },
  {
    label: "Name",
    fieldName: "price",
  },
];

const dataList = [
  {
    name: "ab",
    price: "10000",
  },
  {
    name: "bc",
    price: "10000",
  },
];

const ChartInfo = () => {
  return <SharedTable headers={header} dataList={dataList} />;
};

export default ChartInfo;
