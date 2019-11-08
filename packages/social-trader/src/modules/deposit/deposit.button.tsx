import FundDepositContainer from "modules/fund-deposit/fund-deposit";
import ProgramDeposit from "modules/program-deposit/program-deposit";
import React from "react";
import GVButton from "shared/components/gv-button";
import { ASSET } from "shared/constants/constants";
import useIsOpen from "shared/hooks/is-open.hook";
import { useTranslation } from "shared/i18n";
import { CurrencyEnum } from "shared/utils/types";

const _DepositButton: React.FC<Props> = ({
  ownAsset,
  entryFee,
  type,
  id,
  currency,
  broker,
  availableToInvest
}) => {
  const [t] = useTranslation();
  const [isOpenPopup, setIsOpenPopup, setIsClosePopup] = useIsOpen();
  let deposit;
  switch (type) {
    case ASSET.FUND:
      deposit = (
        <FundDepositContainer
          entryFee={entryFee}
          availableToInvest={availableToInvest}
          open={isOpenPopup}
          id={id}
          onClose={setIsClosePopup}
        />
      );
      break;
    default:
      deposit = (
        <ProgramDeposit
          entryFee={entryFee}
          availableToInvest={availableToInvest}
          broker={broker}
          currency={currency}
          open={isOpenPopup}
          id={id}
          onClose={setIsClosePopup}
        />
      );
  }
  const label = ownAsset ? t("buttons.deposit") : t("buttons.invest");
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
  ownAsset?: boolean;
  entryFee?: number;
  availableToInvest?: number;
  broker: string;
  type: ASSET;
  id: string;
  currency: CurrencyEnum;
}

const DepositButton = React.memo(_DepositButton);
export default DepositButton;
