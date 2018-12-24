import "./file-label.scss";

import classnames from "classnames";
import { GVButton } from "gv-react-components";
import PropTypes from "prop-types";
import React from "react";
import { CloseIcon } from "shared/components/icon/close-icon";

const FileLabel = ({ file, onClick, className }) => {
  return (
    <div className={classnames("file-label", className)}>
      <span className="file-label__name">{file.name}</span>
      <GVButton variant="text" onClick={onClick}>
        <CloseIcon />
      </GVButton>
    </div>
  );
};

FileLabel.propTypes = {
  file: PropTypes.shape({
    name: PropTypes.string,
    size: PropTypes.number,
    id: PropTypes.string
  }),
  onClick: PropTypes.func,
  className: PropTypes.string
};

export default FileLabel;
