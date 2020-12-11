import FormTextField from "components/assets/fields/form-text-field";
import { Button } from "components/button/button";
import { Row } from "components/row/row";
import withLoader, { WithLoaderProps } from "decorators/with-loader";
import useIsOpen from "hooks/is-open.hook";
import ConfirmClosePeriod from "modules/asset-settings/close-period/confirm-close-period";
import React from "react";
import { useTranslation } from "react-i18next";

import styles from "../asset-settings.module.scss";

interface Props extends WithLoaderProps {
  onApply: () => void;
  id: string;
}
const _CloseAssetPeriod: React.FC<Props> = ({ id, onApply }) => {
  const [t] = useTranslation();
  const [
    isClosePeriodOpen,
    setClosePeriodOpen,
    setClosePeriodClose
  ] = useIsOpen();
  return (
    <>
      <Row onlyOffset className={styles["asset-settings__block-wrapper"]}>
        <FormTextField>
          {t("asset-settings:period-and-closing.text-period")}
        </FormTextField>
        <Row size={"large"}>
          <Button color="primary" onClick={setClosePeriodOpen}>
            {t("asset-settings:close-period.title")}
          </Button>
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

const CloseAssetPeriod = withLoader(React.memo(_CloseAssetPeriod));
export default CloseAssetPeriod;
