import "./level-filter.scss";

import React, { useCallback } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

import Filter from "../filter";
import { TFilter } from "../filter.type";
import LevelFilterPopover from "./level-filter-popover";
import { LevelFilterType } from "./level-filter.constants";

const _LevelFilter: React.FC<Props> = ({ t, name, value, onChange }) => {
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

interface Props extends WithTranslation {
  name: string;
  value: LevelFilterType;
  onChange(value: TFilter<LevelFilterType>): void;
}

const LevelFilter = translate()(React.memo(_LevelFilter));
export default LevelFilter;
