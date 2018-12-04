import "./asset-edit.scss";

import AssetEditForm from "modules/asset-edit/components/asset-edit-form";
import AssetEditTop from "modules/asset-edit/components/asset-edit-top";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";

class AssetEditPopup extends Component {
  render() {
    const { info, submitInfo, edit, serverError, type } = this.props;
    return info ? (
      <Fragment>
        {/*<AssetEditTop title={info.title} type={type} />*/}
        <AssetEditForm
          title={info.title}
          errorMessage={submitInfo.errorMessage}
          info={info}
          disabled={submitInfo.isPending}
          onSubmit={edit}
          serverError={serverError}
          type={type}
        />
      </Fragment>
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
    logo: {
      src: PropTypes.string
    }
  })
};

export default AssetEditPopup;
