import { windowScroll } from "actions/ui-actions";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class GVScroll extends Component {
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
      <Scrollbars
        ref={this.ref}
        autoHide
        autoHideTimeout={1000}
        style={{ width: "100%", height: "100%" }}
        onScrollStop={this.handleScroll}
      >
        {this.props.children}
      </Scrollbars>
    );
  }
}

GVScroll.propTypes = {
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

export default connect(undefined, mapDispatchToProps, null, {
  pure: false
})(GVScroll);
