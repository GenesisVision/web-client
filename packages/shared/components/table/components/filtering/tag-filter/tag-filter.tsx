import "./tag-filter.scss";

import { ProgramTag } from "gv-api-web";
import * as React from "react";
import { Fragment } from "react";
import Popover, {
  HORIZONTAL_POPOVER_POS
} from "shared/components/popover/popover";
import TagProgramItem from "shared/components/tag-program/tag-program-item";

import TagFilterButton from "./tag-filter-button";
import TagFilterPopover from "./tag-filter-popover";
import { TAG_NAME_TYPE } from "./tag-filter.constants";
import { Nullable } from "shared/utils/types";
import { TFilter } from "../filter.type";

interface ITagFilterState {
  anchor: Nullable<EventTarget>;
}

export interface ITagFilterProps {
  name: string;
  value: ProgramTag[];
  values: ProgramTag[];
  onChange(value: TFilter<string[]>): void;
}

class TagFilter extends React.Component<ITagFilterProps, ITagFilterState> {
  state = {
    anchor: null
  };
  constructor(props: ITagFilterProps) {
    super(props);
  }
  filterChoosed = (arr: ProgramTag[]): ProgramTag[] =>
    arr.filter(
      item =>
        this.props.value &&
        this.props.value.find(select => item.name === select.name)
    );
  renderValueText = value => value;
  handleOpenPopover = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => this.setState({ anchor: event.currentTarget });
  handleClosePopover = (): void => this.setState({ anchor: null });
  handleChangeFilter = (value: ProgramTag[]): void => {
    this.handleClosePopover();
    this.props.onChange({
      name: this.props.name,
      value: value.map(item => item.name)
    });
  };

  handleRemoveTag = (name: TAG_NAME_TYPE) => (): void => {
    const value = [...this.props.value]
      .filter(item => item.name !== name)
      .map(item => item.name);
    this.props.onChange({
      name: this.props.name,
      value
    });
  };

  render() {
    const { values, value } = this.props;
    const { anchor } = this.state;
    return (
      <Fragment>
        <div className="filter filter--tags">
          <div className="filter__value">
            {this.filterChoosed(values).map(tag => (
              <TagProgramItem
                name={tag.name}
                color={tag.color}
                key={tag.name}
                handleRemove={this.handleRemoveTag}
              />
            ))}
          </div>
          <TagFilterButton
            isActive={anchor}
            onClickHandle={this.handleOpenPopover}
          />
        </div>
        <Popover
          anchorEl={anchor}
          onClose={this.handleClosePopover}
          horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
          noPadding
        >
          <TagFilterPopover
            value={value}
            changeFilter={this.handleChangeFilter}
            values={values}
          />
        </Popover>
      </Fragment>
    );
  }
}

export default TagFilter;
