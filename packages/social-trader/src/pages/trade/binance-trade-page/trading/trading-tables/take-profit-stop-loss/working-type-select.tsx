import Select, { ISelectChangeEvent } from "components/select/select";
import React from "react";

export const WORKING_MARK_VALUE = "Mark";
export const WORKING_LAST_VALUE = "Contract";

const WORKING_TYPE_VALUES = [
  { label: "Mark", value: WORKING_MARK_VALUE },
  { label: "Last", value: WORKING_LAST_VALUE }
];

interface Props {
  workingType: string;
  setWorkingType: (value: string) => void;
}

const _WorkingTypeSelect: React.FC<Props> = ({
  workingType,
  setWorkingType
}) => {
  return (
    <Select
      fixedWidth={false}
      size={"small"}
      name="workingType"
      value={workingType}
      onChange={(e: ISelectChangeEvent) => setWorkingType(e.target.value)}
    >
      {WORKING_TYPE_VALUES.map(({ value, label }) => (
        <option value={value} key={value}>
          {label}
        </option>
      ))}
    </Select>
  );
};

export const WorkingTypeSelect = React.memo(_WorkingTypeSelect);
