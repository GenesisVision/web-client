import "./tile-filter.scss";

import * as React from "react";
import Popover, {
  HORIZONTAL_POPOVER_POS
} from "shared/components/popover/popover";

import { UpdateFilterFunc } from "../table.types";
import TileFilterButton from "./tile-filter-button";
import { ITileFilterItemProps } from "./tile-filter-item";

class TileFilter<TValue> extends React.PureComponent<Props<TValue>, State> {
  state = {
    anchor: undefined
  };

  handleOpenPopover = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
    this.setState({ anchor: event.currentTarget });
  handleClosePopover = () => this.setState({ anchor: undefined });
  handleAdd = (value: TValue) => {
    this.handleClosePopover();
    this.props.updateFilter({
      name: this.props.name,
      value: [...this.props.value, value]
    });
  };
  handleRemove = (item: TValue) => () => {
    this.props.updateFilter({
      name: this.props.name,
      value: this.props.value.filter(x => x !== item)
    });
  };

  render() {
    const { selectedTiles, buttonTitle, value, children } = this.props;
    const { anchor } = this.state;
    const selectedItems = selectedTiles.map(x =>
      React.cloneElement(x, {
        removeTile: this.handleRemove((x.key as unknown) as TValue)
      })
    );
    const child = React.cloneElement(children as React.ReactElement<any>, {
      value,
      changeFilter: this.handleAdd,
      cancel: this.handleClosePopover
    });
    return (
      <>
        <div className="filter tile-filter">
          <div className="tile-filter__value">{selectedItems}</div>
          <TileFilterButton
            isActive={!!anchor}
            onClick={this.handleOpenPopover}
            title={buttonTitle}
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

interface Props<TValue> {
  value: TValue[];
  updateFilter: UpdateFilterFunc;
  name: string;
  buttonTitle: string;
  selectedTiles: React.ReactElement<ITileFilterItemProps>[];
}

interface State {
  anchor?: EventTarget;
}
