import "./tile-filter.scss";

import * as React from "react";
import Popover, {
  HORIZONTAL_POPOVER_POS
} from "shared/components/popover/popover";

import { UpdateFilterFunc } from "../table.types";
import TileFilterButton from "./tile-filter-button";
import { ITileFilterItemProps } from "./tile-filter-item";

class TileFilter extends React.PureComponent<Props, State> {
  state = {
    anchor: undefined
  };

  handleOpenPopover = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
    this.setState({ anchor: event.currentTarget });
  handleClosePopover = () => this.setState({ anchor: undefined });
  handleAdd = (id: string) => {
    const { name, value, updateFilter } = this.props;
    this.handleClosePopover();
    updateFilter({
      name,
      value: [...value, id]
    });
  };
  handleRemove = (id: string) => {
    const { name, value, updateFilter } = this.props;
    updateFilter({
      name,
      value: value.filter(x => x !== id)
    });
  };

  render() {
    const { selectedTiles, buttonTitle, value, children } = this.props;
    const { anchor } = this.state;
    const selectedItems = selectedTiles.map(x =>
      React.cloneElement(x, {
        removeTile: this.handleRemove
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

interface Props {
  value: string[];
  updateFilter: UpdateFilterFunc;
  name: string;
  buttonTitle: string;
  selectedTiles: React.ReactElement<ITileFilterItemProps>[];
}

interface State {
  anchor?: EventTarget;
}
