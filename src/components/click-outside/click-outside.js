import PropTypes from "prop-types";
import React, { Component } from "react";

class ClickOutside extends Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("touchend", this.handleClick);
    document.addEventListener("click", this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener("touchend", this.handleClick);
    document.removeEventListener("click", this.handleClick);
  }

  handleClick = e => {
    const { onClickOutside } = this.props;
    const node = this.containerRef.current;
    if (!node.contains(e.target)) {
      onClickOutside();
    }
  };

  render() {
    const { children, onClickOutside, ...props } = this.props;
    return (
      <div ref={this.containerRef} {...props}>
        {this.props.children}
      </div>
    );
  }
}

ClickOutside.propTypes = {
  onClickOutside: PropTypes.func.isRequired
};

export default ClickOutside;
