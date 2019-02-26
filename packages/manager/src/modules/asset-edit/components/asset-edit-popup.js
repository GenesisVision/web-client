import "./asset-edit.scss";

import PropTypes from "prop-types";
import React, { Component } from "react";

import AssetEditForm from "./asset-edit-form";

class AssetEditPopup extends Component {
  render() {
    const { info, edit, serverError, type } = this.props;
    return info ? (
      <AssetEditForm
        title={info.title}
        info={info}
        onSubmit={edit}
        serverError={serverError}
        type={type}
      />
    ) : null;
  }
}

AssetEditPopup.propTypes = {
  fetchInfo: PropTypes.func,
  edit: PropTypes.func,
  info: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    logo: PropTypes.shape({
      src: PropTypes.string
    })
  })
};

export default AssetEditPopup;
