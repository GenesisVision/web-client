import ResizeObserver from "@juggle/resize-observer";
import debounce from "debounce";
import PropTypes from "prop-types";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { windowScrollAction } from "shared/actions/ui-actions";
import GVScroll from "shared/components/scroll/gvscroll";

class GVScrollContainer extends React.PureComponent {
  scroll = React.createRef();
  container = React.createRef();

  handleScroll = () => {
    const scroll = this.scroll.current.getScrollTop();
    this.props.services.handleScroll(scroll);
  };

  componentDidUpdate() {
    const scroll = this.scroll.current.getScrollTop();
    debounce(() => {
      this.props.services.handleScroll(scroll);
    }, 166);
  }

  getResizer = () => {
    if (!this.resizer) {
      this.resizer = new ResizeObserver(this.scroll.current.handleWindowResize);
    }
    return this.resizer;
  };

  componentDidMount() {
    this.getResizer().observe(this.container.current);
  }

  componentWillUnmount() {
    this.getResizer().unobserve(this.container.current);
  }

  render() {
    return (
      <GVScroll
        ref={this.scroll}
        style={{ width: "100%", height: "100%" }}
        onScrollStop={this.handleScroll}
      >
        <div className={"gv-scroll"} ref={this.container}>
          {this.props.children}
        </div>
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
      handleScroll: windowScrollAction
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
