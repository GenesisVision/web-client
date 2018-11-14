import "../create-fund-settings.scss";

import FundAssetContainer from "shared/components/fund-asset/fund-asset-container";
import React, { Fragment } from "react";

import FundAssetRatio from "shared/components/fund-asset-ratio/fund-asset-ratio";
import AddButton from "shared/components/add-button/add-button";
import { translate } from "react-i18next";

class CreateFundSettingsAssetsComponent extends React.Component {
  state = {
    hoveringAsset: null
  };

  handleHover = asset => () => {
    this.setState({ hoveringAsset: asset });
  };

  handleLeave = () => {
    this.setState({ hoveringAsset: null });
  };

  render() {
    const { t, assets, remainder, removeHandle, addHandle } = this.props;
    const { hoveringAsset } = this.state;
    return (
      <Fragment>
        <div className="create-fund-settings__assets-and-line">
          <div className="create-fund-settings__row create-fund-settings__assets">
            <FundAssetContainer
              assets={assets}
              type={"middle"}
              removable={true}
              removeHandle={removeHandle}
              remainder={remainder}
              hoveringAsset={hoveringAsset}
            />
          </div>
          <div className="create-fund-settings__line">
            <FundAssetRatio
              end={100}
              start={0}
              values={assets}
              handleHover={this.handleHover}
              handleLeave={this.handleLeave}
            />
          </div>
        </div>
        <div className="create-fund-settings__add-assets">
          <div
            className="create-fund-settings__add-assets-button"
            onClick={addHandle}
          >
            <div>
              <AddButton />
            </div>
            <div>{t("buttons.add-assets")}</div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default translate()(CreateFundSettingsAssetsComponent);
