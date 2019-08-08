import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import useIsOpen from "shared/hooks/is-open.hook";

import ConfirmClosePeriodContainer from "./confirm-close-period-container";

const _CloseAssetPeriod: React.FC<Props> = ({ id, t, onApply, canClose }) => {
  const [
    isClosePeriodOpen,
    setClosePeriodOpen,
    setClosePeriodClose
  ] = useIsOpen();
  return (
    <>
      <div className="asset-settings__block-wrapper">
        <p className="asset-settings__text">
          {t("manager.asset-settings.period-and-closing.text-period")}
        </p>
        <GVButton
          color="primary"
          disabled={!canClose}
          onClick={setClosePeriodOpen}
        >
          {t("asset-details-page.close-period.title")}
        </GVButton>
      </div>
      <ConfirmClosePeriodContainer
        open={isClosePeriodOpen}
        onClose={setClosePeriodClose}
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

const CloseAssetPeriod = compose<React.ComponentType<OwnProps>>(
  translate(),
  React.memo
)(_CloseAssetPeriod);
export default CloseAssetPeriod;
