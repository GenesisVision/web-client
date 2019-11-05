import FundDepositContainer from "modules/fund-deposit/fund-deposit";
import ProgramDeposit from "modules/program-deposit/program-deposit";
import React from "react";
import GVButton from "shared/components/gv-button";
import { ASSET } from "shared/constants/constants";
import useIsOpen from "shared/hooks/is-open.hook";
import { useTranslation } from "shared/i18n";
import { CurrencyEnum } from "shared/utils/types";

const _DepositButton: React.FC<Props> = ({ type, id, currency }) => {
  const [t] = useTranslation();
  const [isOpenPopup, setIsOpenPopup, setIsClosePopup] = useIsOpen();
  let deposit;
  switch (type) {
    case ASSET.FUND:
      deposit = (
        <FundDepositContainer
          open={isOpenPopup}
          id={id}
          onClose={setIsClosePopup}
        />
      );
      break;
    default:
      deposit = (
        <ProgramDeposit
          currency={currency}
          open={isOpenPopup}
          id={id}
          onClose={setIsClosePopup}
        />
      );
  }
  const label = "isOwnAsset" ? t("buttons.deposit") : t("buttons.invest");
  return (
    <>
      <GVButton className="table-cards__button" onClick={setIsOpenPopup}>
        {label}
      </GVButton>
      {deposit}
    </>
  );
};

interface Props {
  type: ASSET;
  id: string;
  currency: CurrencyEnum;
}

const DepositButton = React.memo(_DepositButton);
export default DepositButton;
