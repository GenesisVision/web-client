import "./tag-filter.scss";

import * as React from "react";
import { Fragment } from "react";
import Popover from "shared/components/popover/popover";
import TagProgramItem from "shared/components/tag-program/tag-program-item";

import TagFilterButton from "./tag-filter-button";
import TagFilterPopover from "./tag-filter-popover";
import { ProgramTag } from "gv-api-web";

interface ITagFilterState {
  anchor: any;
}

export interface ITagFilterProps {
  name: string;
  value: ProgramTag[];
  values: ProgramTag[];
  onChange(value: { name: string; value: string[] }): void;
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
        this.props.value.find(choose => item.name === choose.name)
    );
  renderValueText = value => value;
  handleOpenPopover = (event: any): void =>
    this.setState({ anchor: event.currentTarget });
  handleClosePopover = (): void => this.setState({ anchor: null });
  handleChangeFilter = (value: ProgramTag[]): void => {
    this.handleClosePopover();
    this.props.onChange({
      name: this.props.name,
      value: value.map(item => item.name)
    });
  };

  handleRemoveTag = (name: string) => (): void => {
    const value = [...this.props.value].find(item => item.name === name).name;
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
        <div className="filter">
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
          horizontal={"right"}
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
