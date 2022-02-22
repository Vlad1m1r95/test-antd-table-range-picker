import { Table as AntTable } from "antd";
import { FilterDropdownProps, ColumnsType } from "antd/lib/table/interface";
import moment, { MomentInput } from "moment";
import { ReactNode } from "react";
import { DatePicker } from "../DatePicker";
type TableData = [{ key: string; name: string; createdOn: MomentInput }];

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

const generateData = (): TableData => {
  const name = "user";
  const data: TableData = [
    { key: "0", name: "user0", createdOn: "01/01/2022" },
  ];

  for (let i = 100; i > 1; i--) {
    const day = getRandomInt(25);
    const month = getRandomInt(12);
    const createdOn = `${month < 10 ? "0" + month : month}/${
      day < 10 ? "0" + day : day
    }/2022`;
    data.push({ key: `${i}`, name, createdOn });
  }

  return data;
};

const data = generateData();

// function onChange(pagination, filters, sorter, extra) {
//   console.log("params", pagination, filters, sorter, extra);
// }

interface getColumnDatePicker {
  filterDropdown: (props: FilterDropdownProps) => ReactNode;
}

const getColumnDatePickerProps = (dataIndex: string): getColumnDatePicker => ({
  filterDropdown: (props) => <DatePicker {...props} />,
});

const columns: ColumnsType<TableData[0]> | undefined = [
  {
    title: "Name",
    dataIndex: "name",
  },

  {
    title: "createdOn",
    dataIndex: "createdOn",
    ...getColumnDatePickerProps("createdOn"),
    onFilter: (value, record) =>
      value.toString().charAt(0) === "+"
        ? moment(record.createdOn).format("L") >= value
        : moment(record.createdOn).format("L") <= value,
  },
  //@ts-ignore
];

export const Table = () => {
  return <AntTable columns={columns} dataSource={data} />;
};
