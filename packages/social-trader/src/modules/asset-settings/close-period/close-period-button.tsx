import { TableCardActionsItem } from "components/table/components/table-card/table-card-actions";
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
      <TableCardActionsItem onClick={setClosePeriodOpen}>
        {t("dashboard-page.trading.actions.close-period")}
      </TableCardActionsItem>
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
