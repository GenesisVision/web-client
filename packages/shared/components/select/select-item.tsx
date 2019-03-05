import classNames from "classnames";
import { GVButton } from "gv-react-components";
import * as React from "react";

interface ISelectItemProps {
  value: string;
  name?: string;
  isSelected?: boolean;
  className?: string;
  onClick?(props: { event: MouseEvent; isSelected: boolean }): void;
}

class SelectItem extends React.Component<ISelectItemProps> {
  handleClick = (event: MouseEvent) => {
    this.props.onClick({ event, isSelected: this.props.isSelected });
  };
  render() {
    const { isSelected, className, children, name } = this.props;
    return (
      <GVButton
        variant="text"
        color="secondary"
        className={classNames("select__option", className, {
          "select__option--selected": isSelected
        })}
        onClick={this.handleClick}
        name={name}
      >
        {children}
      </GVButton>
    );
  }
}

export default SelectItem;
