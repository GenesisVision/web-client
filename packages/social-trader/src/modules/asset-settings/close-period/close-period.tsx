import FormTextField from "components/assets/fields/form-text-field";
import GVButton from "components/gv-button";
import { Row } from "components/row/row";
import withLoader, { WithLoaderProps } from "decorators/with-loader";
import useIsOpen from "hooks/is-open.hook";
import ConfirmClosePeriod from "modules/asset-settings/close-period/confirm-close-period";
import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";

import styles from "../asset-settings.module.scss";

const _CloseAssetPeriod: React.FC<Props> = ({ id, t, onApply }) => {
  const [
    isClosePeriodOpen,
    setClosePeriodOpen,
    setClosePeriodClose
  ] = useIsOpen();
  return (
    <>
      <Row onlyOffset className={styles["asset-settings__block-wrapper"]}>
        <FormTextField>
          {t("asset-settings.period-and-closing.text-period")}
        </FormTextField>
        <Row large>
          <GVButton color="primary" onClick={setClosePeriodOpen}>
            {t("asset-settings.close-period.title")}
          </GVButton>
        </Row>
      </Row>
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
