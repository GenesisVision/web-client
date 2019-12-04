import * as React from "react";
import * as ReactDOM from "react-dom";

const Portal: React.FC<Props> = ({ children, open }) =>
  open
    ? ReactDOM.createPortal(children, document.getElementById("modal-root")!)
    : null;

export default Portal;

interface Props {
  open?: boolean;
}
