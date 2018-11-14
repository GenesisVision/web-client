import "./reallocate-container.scss";

import Dialog from "shared/components/dialog/dialog";
import { updateAssets } from "./services/reallocate.services";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReallocatePopup from "./components/reallocate-popup";
import * as createFundService from "../../pages/create-fund/services/create-fund.service";

class ReallocateContainer extends Component {
  state = { serverError: "", assets: [] };

  fillAssets = (target, data) => {
    data.forEach(dataItem => {
      target.forEach(targetItem => {
        if (!targetItem.percent)
          targetItem.percent =
            targetItem.name === dataItem.name ? dataItem.percent : 0;
      });
    });
    return target;
  };

  componentDidMount() {
    createFundService.fetchAssets().then(response => {
      const assets = this.fillAssets(response.assets, this.props.assets);
      this.setState({
        assets: assets
      });
    });
  }

  render() {
    const { service, id, remainder, submitInfo, open, onClose } = this.props;
    const { assets } = this.state;
    const handleApply = values => {
      service
        .updateAssets(id, values)
        .then(() => {
          onClose();
        })
        .catch(error => {
          this.setState({ serverError: error.errorMessage });
        });
    };
    const handleClose = () => {
      this.setState({ serverError: "" });
      onClose();
    };
    return (
      <Dialog open={open} onClose={handleClose}>
        <ReallocatePopup
          assets={assets}
          remainder={remainder}
          reallocate={handleApply}
          submitInfo={submitInfo}
          serverError={this.state.serverError}
        />
      </Dialog>
    );
  }
}

ReallocateContainer.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  assets: PropTypes.array,
  remainder: PropTypes.number,
  id: PropTypes.string
};

const mapStateToProps = state => ({
  submitInfo: state.assetEdit.submit
});

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(
    {
      updateAssets
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReallocateContainer);
