import debounce from "lodash/debounce";
import React, { Component, ReactElement } from "react";
import ReactResizeDetector from "react-resize-detector";

interface InjectedProps {
  width: number;
  height: number;
}

interface Props {
  width?: string | number;
  height?: string | number;
  defaultWidth?: number;
  defaultHeight?: number;
  children: (props: InjectedProps) => ReactElement;
  debounce?: number;
}

interface State {
  containerWidth: number;
  containerHeight: number;
}

class ResponsiveContainer extends Component<Props, State> {
  static defaultProps = {
    width: "100%",
    height: "100%",
    debounce: 0
  };

  handleResize: () => void;
  mounted: boolean = false;
  container = React.createRef<HTMLDivElement>();

  constructor(props: Props) {
    super(props);

    this.state = {
      containerWidth: props.defaultWidth || -1,
      containerHeight: props.defaultHeight || -1
    };

    this.handleResize =
      props.debounce || 0 > 0
        ? debounce(this.updateDimensionsImmediate, props.debounce)
        : this.updateDimensionsImmediate;
  }

  componentDidMount() {
    this.mounted = true;

    const size = this.getContainerSize();

    if (size) {
      this.setState(size);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  getContainerSize() {
    if (!this.container.current) {
      return null;
    }

    return {
      containerWidth: this.container.current.clientWidth,
      containerHeight: this.container.current.clientHeight
    };
  }

  updateDimensionsImmediate = () => {
    if (!this.mounted) {
      return;
    }

    const newSize = this.getContainerSize();

    if (newSize) {
      const {
        containerWidth: oldWidth,
        containerHeight: oldHeight
      } = this.state;
      const { containerWidth, containerHeight } = newSize;

      if (containerWidth !== oldWidth || containerHeight !== oldHeight) {
        this.setState({ containerWidth, containerHeight });
      }
    }
  };

  renderChart() {
    const { containerWidth, containerHeight } = this.state;
    if (containerWidth < 0 || containerHeight < 0) {
      return null;
    }
    const { children } = this.props;
    return children({ width: containerWidth, height: containerHeight });
  }

  render() {
    const { width, height } = this.props;
    const style = { width, height };

    return (
      <div style={style} ref={this.container}>
        {this.renderChart()}
        <ReactResizeDetector handleWidth onResize={this.handleResize} />
      </div>
    );
  }
}

export default ResponsiveContainer;
