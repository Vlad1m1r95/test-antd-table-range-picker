import React, { useEffect, useState } from "react";
import { DatePicker as AntdDatePicker } from "antd";
import { FilterDropdownProps } from "antd/lib/table/interface";
import { Moment } from "moment";
import { RangePickerProps } from "antd/lib/date-picker";

const { RangePicker } = AntdDatePicker;
export const DatePicker = ({
  confirm,
  selectedKeys,
  setSelectedKeys,
  clearFilters,
  filters,
}: FilterDropdownProps) => {
  const [pikedDates, setPickedDates] = useState<string[] | undefined>();
  const [isResetable, setIsResetable] = useState(false);
  const onPickDate = (values: []) => {};
  console.log(filters);

  const handleClearFilters = () => {
    setSelectedKeys([]);
    setIsResetable(false);
  };
  console.log(isResetable);

  console.log(selectedKeys);

  return (
    <RangePicker
      allowEmpty={[true, true]}
      format="L"
      //@ts-ignore
      onCalendarChange={(values) => {
        const dates: string[] =
          values?.map((value, index) =>
            index === 0 ? `+${value?.format("L")}` : value?.format("L") || ""
          ) || [];
        console.log(dates, "dates");
        setSelectedKeys(dates);

        // setPickedDates(dates);
        confirm({ closeDropdown: false });
      }}
    />
  );
};
