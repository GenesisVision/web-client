import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { windowScroll } from "shared/actions/ui-actions";
import GVScroll from "shared/components/scroll/gvscroll";

class GVScrollContainer extends Component {
  ref = React.createRef();

  handleScroll = () => {
    const scroll = this.ref.current.getScrollTop();
    this.props.services.handleScroll(scroll);
  };

  componentDidUpdate() {
    const scroll = this.ref.current.getScrollTop();
    this.props.services.handleScroll(scroll);
  }

  render() {
    return (
      <GVScroll
        autoHide
        autoHideTimeout={1000}
        ref={this.ref}
        style={{ width: "100%", height: "100%" }}
        onScrollStop={this.handleScroll}
      >
        {this.props.children}
      </GVScroll>
    );
  }
}

GVScrollContainer.propTypes = {
  services: PropTypes.shape({
    handleScroll: PropTypes.func.isRequired
  })
};

const mapDispatchToProps = dispatch => ({
  services: bindActionCreators(
    {
      handleScroll: windowScroll
    },
    dispatch
  )
});

export default connect(
  undefined,
  mapDispatchToProps,
  null,
  {
    pure: false
  }
)(GVScrollContainer);
