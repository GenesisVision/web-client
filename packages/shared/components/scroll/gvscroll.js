import React from "react";
import Scrollbars from "react-custom-scrollbars";

const renderThumb = ({ style, props }) => {
  const thumbStyle = { backgroundColor: `rgba(255,255,255,0.3)` };
  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

const GVScroll = React.forwardRef((props, ref) => {
  const { children, ...other } = props;
  return (
    <Scrollbars
      ref={ref}
      renderThumbVertical={renderThumb}
      renderThumbHorizontal={renderThumb}
      {...other}
    >
      {children}
    </Scrollbars>
  );
});

export default GVScroll;
