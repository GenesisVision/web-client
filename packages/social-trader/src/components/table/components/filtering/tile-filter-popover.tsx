import GVTextField from "components/gv-text-field";
import { PopoverContentCardBlock } from "components/popover/popover-card.block";
import { FilterTitle } from "components/table/components/filtering/filter-title";
import * as React from "react";

class TileFilterPopover<
  T extends TileFilterPopoverItemType
> extends React.PureComponent<Props<T>, State<T>> {
  state = {
    filteredItems: this.props.values
  };

  componentDidUpdate(prevProps: Props<T>) {
    const { values } = this.props;
    if (values !== prevProps.values) {
      this.setState({
        filteredItems: values
      });
    }
  }

  search = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      filteredItems: this.findItem(e.target.value, this.props.values)
    });
  };

  findItem = (searchValue: string, array: T[]) => {
    if (!searchValue) return array;
    return array.filter(
      item => ~item.searchValue.toUpperCase().indexOf(searchValue.toUpperCase())
    );
  };

  handleClick = (id: string) => {
    if (this.props.changeFilter) {
      this.props.changeFilter(id);
    }
  };

  render() {
    const { filteredItems: filteredAssets } = this.state;
    const { header, placeholder, children } = this.props;
    return (
      <PopoverContentCardBlock>
        <FilterTitle>{header}</FilterTitle>
        <GVTextField
          name="queryValue"
          placeholder={placeholder}
          autoComplete="off"
          adornmentPosition="start"
          onChange={this.search}
        />
        {children(filteredAssets, this.handleClick)}
      </PopoverContentCardBlock>
    );
  }
}

export default TileFilterPopover;

interface State<T extends TileFilterPopoverItemType> {
  filteredItems: T[];
}

interface Props<T extends TileFilterPopoverItemType> {
  header: string;
  placeholder: string;
  values: T[];
  changeFilter(value: string): void;
  children(items: T[], select: (id: string) => void): React.ReactNode;
}

export type TileFilterPopoverItemType = {
  id: string;
  searchValue: string;
};
