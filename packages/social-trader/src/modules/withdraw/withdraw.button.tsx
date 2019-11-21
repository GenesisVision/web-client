import GVButton from "components/gv-button";
import useIsOpen from "hooks/is-open.hook";
import { FundWithdrawDialog } from "modules/fund-withdraw/fund-withdraw-dialog";
import ProgramWithdrawDialog from "modules/program-withdraw/program-withdraw-dialog";
import React from "react";
import { ASSET } from "shared/constants/constants";
import { useTranslation } from "shared/i18n";
import { CurrencyEnum } from "utils/types";

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
