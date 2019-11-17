import React from "react";
import { FundWithdrawDialog } from "shared/components/fund-withdraw/fund-withdraw-dialog";
import GVButton from "shared/components/gv-button";
import ProgramWithdrawDialog from "shared/components/program-withdraw/program-withdraw-dialog";
import { ASSET } from "shared/constants/constants";
import useIsOpen from "shared/hooks/is-open.hook";
import { useTranslation } from "shared/i18n";
import { CurrencyEnum } from "shared/utils/types";

const _WithdrawButton: React.FC<Props> = ({ type, id, currency }) => {
  const [t] = useTranslation();
  const [isOpenPopup, setIsOpenPopup, setIsClosePopup] = useIsOpen();
  let withdraw;
  switch (type) {
    case ASSET.FUND:
      withdraw = (
        <FundWithdrawDialog
          open={isOpenPopup}
          id={id}
          onClose={setIsClosePopup}
        />
      );
      break;
    default:
      withdraw = (
        <ProgramWithdrawDialog
          open={isOpenPopup}
          id={id}
          accountCurrency={"GVT"} // TODO change to real currecny
          assetCurrency={currency}
          onClose={setIsClosePopup}
        />
      );
  }
  return (
    <>
      <GVButton
        className="table-cards__button"
        color="secondary"
        variant="outlined"
        onClick={setIsOpenPopup}
      >
        {t("buttons.withdraw")}
      </GVButton>
      {withdraw}
    </>
  );
};

interface Props {
  type: ASSET;
  id: string;
  currency: CurrencyEnum;
}

const WithdrawButton = React.memo(_WithdrawButton);
export default WithdrawButton;
