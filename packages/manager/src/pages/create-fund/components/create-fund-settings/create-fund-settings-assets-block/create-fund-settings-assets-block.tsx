import "../create-fund-settings.scss";

import { FundAssetPartWithIcon } from "gv-api-web";
import * as React from "react";
import { MouseEventHandler } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import AddButton from "shared/components/add-button/add-button";
import FundAssetRatio from "shared/components/fund-asset-ratio/fund-asset-ratio";
import { FUND_ASSET_TYPE } from "shared/components/fund-asset/fund-asset";
import FundAssetContainer, {
  TFundAssetRemoveHandle
} from "shared/components/fund-asset/fund-asset-container";

class _CreateFundSettingsAssetsComponent extends React.PureComponent<
  Props,
  State
> {
  state = {
    hoveringAssetName: undefined
  };

  handleHover = (asset: string) => () => {
    this.setState({ hoveringAssetName: asset });
  };

  handleLeave = () => {
    this.setState({ hoveringAssetName: undefined });
  };

  render() {
    const { t, assets, remainder, removeHandle, addHandle } = this.props;
    const { hoveringAssetName } = this.state;
    return (
      <>
        <div className="create-fund-settings__assets-and-line">
          <div className="create-fund-settings__row create-fund-settings__assets">
            <FundAssetContainer
              assets={assets}
              type={FUND_ASSET_TYPE.MIDDLE}
              removable={true}
              removeHandle={removeHandle}
              remainder={remainder}
              hoveringAsset={hoveringAssetName}
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
      </>
    );
  }
}

interface Props extends InjectedTranslateProps {
  assets: FundAssetPartWithIcon[];
  remainder: number;
  removeHandle: TFundAssetRemoveHandle;
  addHandle: MouseEventHandler;
}

interface State {
  hoveringAssetName?: string;
}

const CreateFundSettingsAssetsComponent = translate()(
  _CreateFundSettingsAssetsComponent
);
export default CreateFundSettingsAssetsComponent;
