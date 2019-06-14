import "rc-slider/assets/index.css";

import "./filter.scss";

import * as React from "react";
import Popover, {
  HORIZONTAL_POPOVER_POS
} from "shared/components/popover/popover";

import TagProgramItem from "../../../tag-program/tag-program-item";
import { UpdateFilterFunc } from "../table.types";
import TileFilterButton from "./tile-filter-button";

class TileFilter extends React.PureComponent<
  ITileFilterProps,
  ITileFilterState
> {
  state = {
    anchor: undefined
  };

  handleOpenPopover = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
    this.setState({ anchor: event.currentTarget });
  handleClosePopover = () => this.setState({ anchor: undefined });
  handleChangeFilter = (value: any) => {
    this.handleClosePopover();
    this.props.updateFilter &&
      this.props.updateFilter({ name: this.props.name, value });
  };

  filterTiles = (arr: any[]): any[] =>
    arr.filter(
      item =>
        this.props.value &&
        this.props.value.find(select => item.name === select.name)
    );

  removeTag = (name: string) => (): void => {
    const value = this.props.value
      .filter(item => item.name !== name)
      .map(item => item.name);
    this.props.updateFilter({
      name: this.props.name,
      value
    });
  };

  render() {
    const { values, value, children } = this.props;
    const { anchor } = this.state;
    const selectedTiles = this.filterTiles(values);
    const child = React.cloneElement(children as React.ReactElement<any>, {
      value,
      changeFilter: this.handleChangeFilter,
      cancel: this.handleClosePopover
    });
    return (
      <>
        <div className="filter filter--tags">
          <div className="filter__value">
            {selectedTiles.map(tag => (
              <TagProgramItem
                name={tag.name}
                color={tag.color}
                key={tag.name}
                handleRemove={this.removeTag}
              />
            ))}
          </div>
          <TileFilterButton
            isActive={!!anchor}
            onClick={this.handleOpenPopover}
            title="Tag"
          />
        </div>
        <Popover
          anchorEl={anchor}
          onClose={this.handleClosePopover}
          horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
          noPadding
        >
          {child}
        </Popover>
      </>
    );
  }
}

export default TileFilter;

interface ITileFilterProps {
  value: any[];
  values: any[];
  updateFilter: UpdateFilterFunc;
  name: string;
}

interface ITileFilterState {
  anchor?: EventTarget;
}
