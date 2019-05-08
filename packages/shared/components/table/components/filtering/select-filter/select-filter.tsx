import "./select-filter.scss";

import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";

import Filter from "../filter";
import { SelectFilterValue, TFilter } from "../filter.type";
import SelectFilterPopover from "./select-filter-popover";
import { SelectFilterType } from "./select-filter.constants";

interface ISelectFilterProps {
  name: string;
  label: string;
  value: SelectFilterType;
  values: SelectFilterValue[];
  onChange(value: TFilter<SelectFilterType>): void;
}

class SelectFilter extends React.PureComponent<
  ISelectFilterProps & InjectedTranslateProps
> {
  renderValueText = (value: SelectFilterType) => {
    const { t, values } = this.props;
    const selectedValue = values.find(x => x.value === value);
    if (!selectedValue) return null;
    else if (selectedValue.labelKey !== undefined)
      return t(selectedValue.labelKey);

    return selectedValue.label;
  };

  render() {
    const { label, name, value, onChange } = this.props;
    return (
      <Filter
        label={label}
        name={name}
        renderValueText={this.renderValueText}
        value={value}
        updateFilter={onChange}
      >
        <SelectFilterPopover {...this.props} />
      </Filter>
    );
  }
}

export default translate()(SelectFilter);
