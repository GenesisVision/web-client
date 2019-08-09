import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import { ASSET } from "shared/constants/constants";
import useIsOpen from "shared/hooks/is-open.hook";

import ConfirmCloseAssetContainer from "./confirm-close-asset-container";

const _CloseAsset: React.FC<Props> = ({ asset, id, t, onApply, canClose }) => {
  const [isCloseAssetOpen, setCloseAssetOpen, setCloseAssetClose] = useIsOpen();
  return (
    <>
      <div className="asset-settings__block-wrapper">
        <p className="asset-settings__text">
          {t(
            `manager.asset-settings.period-and-closing.text-${asset.toLowerCase()}`
          )}
        </p>
        <GVButton
          color="primary"
          disabled={!canClose}
          onClick={setCloseAssetOpen}
        >
          {t(`manager.asset-settings.buttons.close-${asset.toLowerCase()}`)}
        </GVButton>
      </div>
      <ConfirmCloseAssetContainer
        asset={asset}
        open={isCloseAssetOpen}
        onClose={setCloseAssetClose}
        onApply={onApply}
        id={id}
      />
    </>
  );
};

interface Props extends OwnProps, WithTranslation {}

interface OwnProps {
  asset: ASSET;
  canClose: boolean;
  onApply: () => void;
  id: string;
}

const CloseAsset = compose<React.ComponentType<OwnProps>>(
  translate(),
  React.memo
)(_CloseAsset);
export default CloseAsset;
