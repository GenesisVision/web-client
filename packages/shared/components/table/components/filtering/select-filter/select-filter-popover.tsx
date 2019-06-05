import React, { useCallback } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import GVButton from "shared/components/gv-button";

import { SelectFilterValue } from "../filter.type";
import { ComposedRequestSelectValue } from "./select-filter.constants";

const _SelectFilterPopover: React.FC<Props & InjectedTranslateProps> = ({
  values,
  value,
  t,
  changeFilter
}) => {
  const handleClick = useCallback(
    (value: ComposedRequestSelectValue) => () =>
      changeFilter && changeFilter(value),
    [changeFilter]
  );

  const renderLabel = useCallback(
    (item: SelectFilterValue<ComposedRequestSelectValue>): string =>
      item.labelKey ? t(item.labelKey) : item.label,
    []
  );

  return (
    <div className="select-filter">
      {values.map((x, idx) => {
        const selected = x.value === value;
        return (
          <GVButton
            variant="text"
            color={selected ? "primary" : "secondary"}
            key={idx}
            onClick={handleClick(x.value)}
          >
            {renderLabel(x)}
          </GVButton>
        );
      })}
    </div>
  );
};

interface Props {
  changeFilter?(value: ComposedRequestSelectValue): void;
  values: SelectFilterValue<ComposedRequestSelectValue>[];
  value?: ComposedRequestSelectValue;
}

const SelectFilterPopover = React.memo(translate()(_SelectFilterPopover));
export default SelectFilterPopover;
