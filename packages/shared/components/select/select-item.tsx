import classNames from "classnames";
import * as React from "react";
import GVButton from "shared/components/gv-button";

class SelectItem extends React.Component<Props> {
  handleClick = (event: SelectItemClick) => {
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

interface Props {
  value: string;
  name?: string;
  isSelected?: boolean;
  className?: string;
  onClick(props: { event: SelectItemClick; isSelected: boolean }): void;
  children: string;
}

interface SelectItemClick
  extends React.MouseEvent<HTMLButtonElement, MouseEvent> {}
