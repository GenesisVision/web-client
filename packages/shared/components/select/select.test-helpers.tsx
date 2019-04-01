import * as React from "react";

import { SelectChangeEvent } from "./select";

interface InjectedProps {
  test: string;
  handleChange(props: SelectChangeEvent): void;
}

interface Props {
  value: string;
  children(props: InjectedProps): JSX.Element;
}

export default class SelectTestParent extends React.Component<Props, any> {
  state = {
    test: this.props.value
  };
  handleChange = (event: SelectChangeEvent) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    return this.props!.children({
      test: this.state.test,
      handleChange: this.handleChange
    });
  }
}
