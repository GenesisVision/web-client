import { Button } from "components/button/button";
import { ASSET } from "constants/constants";
import { useAccountCurrency } from "hooks/account-currency.hook";
import useIsOpen from "hooks/is-open.hook";
import { useTranslation } from "i18n";
import { FundWithdrawDialog } from "modules/fund-withdraw/fund-withdraw-dialog";
import ProgramWithdrawDialog from "modules/program-withdraw/program-withdraw-dialog";
import React from "react";
import { CurrencyEnum, Sizeable } from "utils/types";

const _WithdrawButton: React.FC<Props> = ({
  infoMessage,
  size,
  onApply,
  type,
  id,
  currency,
  disabled
}) => {
  const accountCurrency = useAccountCurrency();
  const [t] = useTranslation();
  const label = t("buttons.withdraw");
  const [isOpenPopup, setIsOpenPopup, setIsClosePopup] = useIsOpen();
  const withdraw =
    type === ASSET.FUND ? (
      <FundWithdrawDialog
        infoMessage={infoMessage}
        onApply={onApply}
        open={isOpenPopup}
        id={id}
        onClose={setIsClosePopup}
      />
    ) : (
      <ProgramWithdrawDialog
        onApply={onApply}
        open={isOpenPopup}
        id={id}
        accountCurrency={accountCurrency}
        assetCurrency={currency}
        onClose={setIsClosePopup}
      />
    );
  return (
    <>
      <Button
        testId={label}
        className={label}
        size={size}
        disabled={disabled}
        color="secondary"
        variant="outlined"
        onClick={setIsOpenPopup}
      >
        {label}
      </Button>
      {withdraw}
    </>
  );
};

interface Props extends Sizeable {
  infoMessage?: string;
  disabled?: boolean;
  onApply?: VoidFunction;
  type: ASSET;
  id: string;
  currency: CurrencyEnum;
}

const WithdrawButton = React.memo(_WithdrawButton);
export default WithdrawButton;
