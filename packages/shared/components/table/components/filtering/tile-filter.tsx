import "./tile-filter.scss";

import * as React from "react";
import Popover, {
  HORIZONTAL_POPOVER_POS
} from "shared/components/popover/popover";

import { UpdateFilterFunc } from "../table.types";
import TileFilterButton from "./tile-filter-button";

class TileFilter<TValue, TValues> extends React.PureComponent<
  Props<TValue, TValues>,
  State
> {
  state = {
    anchor: undefined
  };

  handleOpenPopover = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
    this.setState({ anchor: event.currentTarget });
  handleClosePopover = () => this.setState({ anchor: undefined });
  handleChangeFilter = (value: TValue) => {
    this.handleClosePopover();
    this.props.updateFilter({
      name: this.props.name,
      value: [...this.props.value, value]
    });
  };

  render() {
    const { selectedTiles, buttonTitle, value, children } = this.props;
    const { anchor } = this.state;
    const child = React.cloneElement(children as React.ReactElement<any>, {
      value,
      changeFilter: this.handleChangeFilter,
      cancel: this.handleClosePopover
    });
    return (
      <>
        <div className="filter tile-filter">
          <div className="tile-filter__value">{selectedTiles}</div>
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

interface Props<TValue, TValues> {
  value: TValue[];
  values: TValues[];
  updateFilter: UpdateFilterFunc;
  name: string;
  buttonTitle: string;
  selectedTiles: JSX.Element[];
}

interface State {
  anchor?: EventTarget;
}
