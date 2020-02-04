import GVButton from "components/gv-button";
import {
  PopoverContent,
  PopoverContentListItem
} from "components/popover/popover-content";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { SelectFilterValue } from "../filter.type";
import { ComposedRequestSelectValue } from "./select-filter.constants";

const _SelectFilterPopover: React.FC<Props> = ({
  values,
  value,
  changeFilter
}) => {
  const [t] = useTranslation();
  const handleClick = useCallback(
    (value: ComposedRequestSelectValue) => () =>
      changeFilter && changeFilter(value),
    [changeFilter]
  );

  const renderLabel = useCallback(
    (item: SelectFilterValue<ComposedRequestSelectValue>): string =>
      (item.labelKey ? t(item.labelKey) : item.label) as string,
    []
  );

  return (
    <PopoverContent type={"list"}>
      {values.map((x, idx) => {
        const selected = x.value === value;
        return (
          <GVButton
            noPadding
            variant="text"
            color={selected ? "primary" : "secondary"}
            key={idx}
            onClick={handleClick(x.value)}
          >
            <PopoverContentListItem>{renderLabel(x)} </PopoverContentListItem>
          </GVButton>
        );
      })}
    </PopoverContent>
  );
};

interface Props {
  changeFilter?(value: ComposedRequestSelectValue): void;
  values: SelectFilterValue<ComposedRequestSelectValue>[];
  value?: ComposedRequestSelectValue;
}

const SelectFilterPopover = React.memo(_SelectFilterPopover);
export default SelectFilterPopover;
