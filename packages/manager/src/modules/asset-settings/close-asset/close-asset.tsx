import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import useIsOpen from "shared/hooks/is-open.hook";

import ConfirmCloseAssetContainer from "./confirm-close-asset-container";

const _CloseAsset: React.FC<Props> = ({ id, t, onApply, canClose }) => {
  const [isCloseAssetOpen, setCloseAssetOpen, setCloseAssetClose] = useIsOpen();
  return (
    <>
      <div className="asset-settings__block-wrapper">
        <p className="asset-settings__text">
          {t("manager.asset-settings.period-and-closing.text-asset")}
        </p>
        <GVButton
          color="primary"
          disabled={!canClose}
          onClick={setCloseAssetOpen}
        >
          {t("asset-details-page.description.close-asset")}
        </GVButton>
      </div>
      <ConfirmCloseAssetContainer
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
  canClose: boolean;
  onApply: () => void;
  id: string;
}

const CloseAsset = compose<React.ComponentType<OwnProps>>(
  translate(),
  React.memo
)(_CloseAsset);
export default CloseAsset;
