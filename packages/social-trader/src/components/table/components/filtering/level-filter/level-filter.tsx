import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

import Filter from "../filter";
import { TFilter } from "../filter.type";
import LevelFilterPopover from "./level-filter-popover";
import { LevelFilterType } from "./level-filter.constants";

interface Props {
  name: string;
  value: LevelFilterType;
  onChange: (value: TFilter<LevelFilterType>) => void;
}
const _LevelFilter: React.FC<Props> = ({ name, value, onChange }) => {
  const [t] = useTranslation();
  const renderValueText = useCallback((value: number[]): string => {
    if (value[0] === value[1]) return value[0].toString();
    return `${value[0]}-${value[1]}`;
  }, []);

  return (
    <Filter
      label={t("filters.level.label")}
      name={name}
      renderValueText={renderValueText}
      value={value}
      updateFilter={onChange}
    >
      <LevelFilterPopover value={value} />
    </Filter>
  );
};

const LevelFilter = React.memo(_LevelFilter);
export default LevelFilter;
