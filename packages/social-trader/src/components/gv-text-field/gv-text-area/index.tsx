import "./style.scss";

import classNames from "classnames";
import React from "react";

const ROWS_HEIGHT = 22;

interface GVTextAreaProps {
  className?: string;
  textAreaClassName?: string;
  value: string;
  rows?: number;
  onChange: (e: any) => void;
}

interface GVTextAreaState {
  height: number;
}

class GVTextArea extends React.PureComponent<GVTextAreaProps, GVTextAreaState> {
  static defaultProps: Partial<GVTextAreaProps> = {
    rows: 1
  };

  shadowRef: React.RefObject<HTMLTextAreaElement>;

  constructor(props: GVTextAreaProps) {
    super(props);
    this.shadowRef = React.createRef();

    this.state = {
      height: props.rows! * ROWS_HEIGHT
    };
  }

  componentDidMount() {
    this.syncHeightWithShadow();
  }

  componentDidUpdate() {
    this.syncHeightWithShadow();
  }

  handleChange = (event: any) => {
    const value = event.target.value;

    if (this.shadowRef.current) {
      this.shadowRef.current.value = value;
      this.syncHeightWithShadow();
    }

    if (this.props.onChange) {
      this.props.onChange(event);
    }
  };

  syncHeightWithShadow() {
    const shadowRef = this.shadowRef.current;
    if (!shadowRef) return;

    const lineHeight = parseFloat(
      window.getComputedStyle(shadowRef).lineHeight || ROWS_HEIGHT.toString()
    );
    const newHeight = Math.max(shadowRef.scrollHeight, lineHeight);

    if (Math.abs(this.state.height - newHeight) > 1) {
      this.setState({
        height: newHeight
      });
    }
  }

  render() {
    const { textAreaClassName, onChange, ...props } = this.props;
    return (
      <div className={classNames("gv-text-area", textAreaClassName)}>
        <textarea
          className={classNames("gv-text-area__hidden", props.className)}
          readOnly
          ref={this.shadowRef}
          rows={props.rows}
          tabIndex={-1}
          value={props.value}
        />
        <textarea
          style={{ height: this.state.height }}
          onChange={this.handleChange}
          {...props}
        />
      </div>
    );
  }
}

export default GVTextArea;
