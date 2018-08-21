import PropTypes from "prop-types";
import * as ReactDOM from "react-dom";

const Portal = ({ children, open }) =>
  open ? ReactDOM.createPortal(children, document.body) : undefined;

Portal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  open: PropTypes.bool
};

export default Portal;
