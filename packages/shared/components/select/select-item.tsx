import classNames from "classnames";
import { GVButton } from "gv-react-components";
import * as React from "react";

export interface ISelectItemProps {
  value: string;
  name?: string;
  isSelected?: boolean;
  className?: string;
  onClick(props: {
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>;
    isSelected: boolean;
  }): void;
  children: string;
}

class SelectItem extends React.Component<ISelectItemProps> {
  handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    this.props.onClick({ event, isSelected: Boolean(this.props.isSelected) });
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
        // @ts-ignore
        onClick={this.handleClick} // TODO fix GVButton type
        name={name}
      >
        {children}
      </GVButton>
    );
  }
}

export default SelectItem;
