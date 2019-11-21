import GVButton from "components/gv-button";
import useIsOpen from "hooks/is-open.hook";
import ConfirmClosePeriodContainer from "modules/asset-settings/close-period/confirm-close-period-container";
import React from "react";
import { useTranslation } from "shared/i18n";

const _ClosePeriodButton: React.FC<{ id: string; onApply?: () => void }> = ({
  id,
  onApply = () => {}
}) => {
  const [t] = useTranslation();
  const [
    isClosePeriodOpen,
    setClosePeriodOpen,
    setClosePeriodClose
  ] = useIsOpen();
  return (
    <>
      <GVButton variant="text" color="secondary" onClick={setClosePeriodOpen}>
        {t("dashboard-page.trading.actions.close-period")}
      </GVButton>
      <ConfirmClosePeriodContainer
        open={isClosePeriodOpen}
        onClose={setClosePeriodClose}
        onApply={onApply}
        id={id}
      />
    </>
  );
};

const ClosePeriodButton = React.memo(_ClosePeriodButton);
export default ClosePeriodButton;
