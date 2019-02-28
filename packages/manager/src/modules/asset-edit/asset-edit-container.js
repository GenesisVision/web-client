import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Dialog from "shared/components/dialog/dialog";

import AssetEditPopup from "./components/asset-edit-popup";
import { editAsset } from "./services/asset-edit.services";

class AssetEditContainer extends Component {
  state = { serverError: "" };
  render() {
    const { service, info, onApply, open, onClose, type } = this.props;
    const handleClose = () => {
      this.setState({ serverError: "" });
      onClose();
    };
    const handleEdit = values => {
      service
        .editAsset(info.id, values, type)
        .then(() => {
          handleClose();
          if (onApply) {
            onApply();
          }
        })
        .catch(error => {
          this.setState({ serverError: error.errorMessage });
        });
    };
    return (
      <Dialog open={open} onClose={handleClose}>
        <AssetEditPopup
          type={type}
          info={info}
          edit={handleEdit}
          serverError={this.state.serverError}
        />
      </Dialog>
    );
  }
}

AssetEditContainer.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onApply: PropTypes.func,
  info: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    logo: PropTypes.shape({
      src: PropTypes.string
    })
  })
};

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(
    {
      editAsset
    },
    dispatch
  )
});

export default connect(
  undefined,
  mapDispatchToProps
)(AssetEditContainer);
