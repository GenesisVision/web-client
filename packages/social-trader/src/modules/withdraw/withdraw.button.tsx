import FundWithdrawContainer from "modules/fund-withdraw/fund-withdraw-container";
import ProgramWithdrawContainer from "modules/program-withdraw/program-withdraw-container";
import React from "react";
import GVButton from "shared/components/gv-button";
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
        <FundWithdrawContainer
          open={isOpenPopup}
          id={id}
          accountCurrency={"GVT"}
          assetCurrency={currency}
          onClose={setIsClosePopup}
          onSubmit={() => {}}
        />
      );
      break;
    default:
      withdraw = (
        <ProgramWithdrawContainer
          open={isOpenPopup}
          id={id}
          accountCurrency={"GVT"}
          assetCurrency={currency}
          onClose={setIsClosePopup}
          onSubmit={() => {}}
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
