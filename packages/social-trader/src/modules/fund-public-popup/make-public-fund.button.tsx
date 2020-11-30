import { Button } from "components/button/button";
import Dialog from "components/dialog/dialog";
import { TableCardActionsItem } from "components/table/components/table-card/table-card-actions";
import useIsOpen from "hooks/is-open.hook";
import dynamic from "next/dist/next-server/lib/dynamic";
import * as React from "react";
import { useTranslation } from "react-i18next";

const FundPublicPopup = dynamic(() => import("./components/fund-public-popup"));

interface Props {
  id: string;
  onApply: VoidFunction;
  title: string;
}

const _MakePublicFundCardOption: React.FC<Props> = ({ id, title, onApply }) => {
  const [isOpenPopup, setIsOpenPopup, setIsClosePopup] = useIsOpen();
  const [t] = useTranslation();
  return (
    <>
      <TableCardActionsItem onClick={setIsOpenPopup}>
        {t("dashboard-page:trading.actions.make-public-fund")}
      </TableCardActionsItem>
      <Dialog open={isOpenPopup} onClose={setIsClosePopup}>
        <FundPublicPopup id={id} onApply={onApply} name={title} />
      </Dialog>
    </>
  );
};

export const MakePublicFundCardOption = React.memo(_MakePublicFundCardOption);

const _MakePublicFundButton: React.FC<Props> = ({ id, title, onApply }) => {
  const [isOpenPopup, setIsOpenPopup, setIsClosePopup] = useIsOpen();
  const [t] = useTranslation();

  return (
    <>
      <Button onClick={setIsOpenPopup}>
        {t("dashboard-page:trading.actions.make-public-fund")}
      </Button>
      <Dialog open={isOpenPopup} onClose={setIsClosePopup}>
        <FundPublicPopup id={id} onApply={onApply} name={title} />
      </Dialog>
    </>
  );
};

export const MakePublicFundButton = React.memo(_MakePublicFundButton);
