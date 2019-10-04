import * as React from "react";

import { ISelectChangeEvent } from "./select";

interface InjectedProps {
  test: string;
  handleChange(props: ISelectChangeEvent): void;
}

interface Props {
  value: string;
  children(props: InjectedProps): JSX.Element;
}

export default class SelectTestParent extends React.Component<Props, any> {
  state = {
    test: this.props.value
  };
  handleChange = (event: ISelectChangeEvent) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    return this.props!.children({
      test: this.state.test,
      handleChange: this.handleChange
    });
  }
}

export const onSelectChange = (onChangeFn: (value: any) => void) => (
  _: ISelectChangeEvent,
  target: JSX.Element
) => {
  onChangeFn(target.props.value);
};
