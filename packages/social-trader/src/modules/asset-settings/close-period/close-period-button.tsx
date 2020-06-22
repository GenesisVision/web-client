import { TableCardActionsItem } from "components/table/components/table-card/table-card-actions";
import useIsOpen from "hooks/is-open.hook";
import { useTranslation } from "i18n";
import ConfirmClosePeriod from "modules/asset-settings/close-period/confirm-close-period";
import React from "react";

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
        {t("dashboard-page:trading.actions.close-period")}
      </TableCardActionsItem>
      <ConfirmClosePeriod
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
