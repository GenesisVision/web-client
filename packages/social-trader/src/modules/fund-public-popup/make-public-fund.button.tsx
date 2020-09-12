import Dialog from "components/dialog/dialog";
import { TableCardActionsItem } from "components/table/components/table-card/table-card-actions";
import useIsOpen from "hooks/is-open.hook";
import dynamic from "next/dist/next-server/lib/dynamic";
import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

const FundPublicPopup = dynamic(() => import("./components/fund-public-popup"));

interface Props {
  id: string;
  name: string;
  onApply?: VoidFunction;
}

const _MakeSignalButton: React.FC<Props> = ({ id, name, onApply }) => {
  const [isOpenPopup, setIsOpenPopup, setIsClosePopup] = useIsOpen();
  const [t] = useTranslation();
  const handleOnApply = useCallback(() => {
    setIsClosePopup();
    onApply && onApply();
  }, []);
  return (
    <>
      <TableCardActionsItem onClick={setIsOpenPopup}>
        {t("dashboard-page:trading.actions.make-public-fund")}
      </TableCardActionsItem>
      <Dialog open={isOpenPopup} onClose={setIsClosePopup}>
        <FundPublicPopup id={id} onApply={handleOnApply} name={name} />
      </Dialog>
    </>
  );
};

const MakePublicFundButton = React.memo(_MakeSignalButton);
export default MakePublicFundButton;
