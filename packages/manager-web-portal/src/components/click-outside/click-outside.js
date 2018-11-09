import PropTypes from "prop-types";
import React, { Component } from "react";

class ClickOutside extends Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
  }

  componentDidMount() {
    if (this.props.shouldHandleClick) {
      this.toggleClickOutsideEvent(true);
    }
  }

  componentWillUnmount() {
    this.toggleClickOutsideEvent(false);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.shouldHandleClick !== this.props.shouldHandleClick) {
      this.toggleClickOutsideEvent(this.props.shouldHandleClick);
    }
  }

  toggleClickOutsideEvent(enabled) {
    if (enabled) {
      document.addEventListener("touchend", this.handleClick);
      document.addEventListener("click", this.handleClick);
    } else {
      document.removeEventListener("touchend", this.handleClick);
      document.removeEventListener("click", this.handleClick);
    }
  }

  handleClick = e => {
    const { onClickOutside } = this.props;
    const node = this.containerRef.current;
    if (!node.contains(e.target)) {
      onClickOutside();
    }
  };

  render() {
    return (
      <div ref={this.containerRef} className={this.props.className}>
        {this.props.children}
      </div>
    );
  }
}

ClickOutside.propTypes = {
  shouldHandleClick: PropTypes.bool,
  onClickOutside: PropTypes.func.isRequired
};

ClickOutside.defaultProps = {
  shouldHandleClick: true
};

export default ClickOutside;
