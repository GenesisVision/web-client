import React from "react";
import Scrollbars from "react-custom-scrollbars";

function getInnerHeight(el) {
  const { clientHeight } = el;
  const { paddingTop, paddingBottom } = getComputedStyle(el);
  return clientHeight - parseFloat(paddingTop) - parseFloat(paddingBottom);
}

function getInnerWidth(el) {
  const { clientWidth } = el;
  const { paddingLeft, paddingRight } = getComputedStyle(el);
  return clientWidth - parseFloat(paddingLeft) - parseFloat(paddingRight);
}

class GVScrollbar extends Scrollbars {
  getThumbHorizontalWidth() {
    const { thumbSize, thumbMinSize } = this.props;
    const { scrollWidth, clientWidth } = this.view;
    const trackWidth = getInnerWidth(this.trackHorizontal);
    const width = Math.floor((clientWidth / scrollWidth) * trackWidth);
    if (trackWidth === width) return 0;
    if (thumbSize) return thumbSize;
    return Math.max(width, thumbMinSize);
  }

  getThumbVerticalHeight() {
    const { thumbSize, thumbMinSize } = this.props;
    const { scrollHeight, clientHeight } = this.view;
    const trackHeight = getInnerHeight(this.trackVertical);
    const height = Math.floor((clientHeight / scrollHeight) * trackHeight);
    if (trackHeight === height) return 0;
    if (thumbSize) return thumbSize;
    return Math.max(height, thumbMinSize);
  }
}

const renderThumb = ({ style, props }) => {
  const thumbStyle = { backgroundColor: `rgba(255,255,255,0.3)` };
  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

const GVScroll = React.forwardRef((props, ref) => {
  const { children, ...other } = props;
  return (
    <GVScrollbar
      ref={ref}
      renderThumbVertical={renderThumb}
      renderThumbHorizontal={renderThumb}
      {...other}
    >
      {children}
    </GVScrollbar>
  );
});

export default GVScroll;
