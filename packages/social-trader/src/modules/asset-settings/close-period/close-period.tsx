import GVButton from "components/gv-button";
import withLoader, { WithLoaderProps } from "decorators/with-loader";
import useIsOpen from "hooks/is-open.hook";
import ConfirmClosePeriod from "modules/asset-settings/close-period/confirm-close-period";
import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";

const _CloseAssetPeriod: React.FC<Props> = ({ id, t, onApply }) => {
  const [
    isClosePeriodOpen,
    setClosePeriodOpen,
    setClosePeriodClose
  ] = useIsOpen();
  return (
    <>
      <div className="asset-settings__block-wrapper">
        <p className="asset-settings__text">
          {t("program-settings.period-and-closing.text-period")}
        </p>
        <GVButton color="primary" onClick={setClosePeriodOpen}>
          {t("program-details-page.close-period.title")}
        </GVButton>
      </div>
      <ConfirmClosePeriod
        open={isClosePeriodOpen}
        onClose={setClosePeriodClose}
        onApply={onApply}
        id={id}
      />
    </>
  );
};

interface Props extends OwnProps, WithTranslation {}

interface OwnProps extends WithLoaderProps {
  onApply: () => void;
  id: string;
}

const CloseAssetPeriod = compose<React.ComponentType<OwnProps>>(
  withLoader,
  translate(),
  React.memo
)(_CloseAssetPeriod);
export default CloseAssetPeriod;
