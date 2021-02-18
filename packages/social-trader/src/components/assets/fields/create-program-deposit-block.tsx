import DepositDetailsDefaultBlock, {
  IDepositDetailsDefaultBlockProps
} from "components/assets/fields/deposit-details-default-block";
import { AmountWithCurrency } from "gv-api-web";
import React from "react";
import { convertToCurrency } from "utils/currency-converter";
import { formatCurrencyValue } from "utils/formatter";
import { safeGetElemFromArray } from "utils/helpers";

import useAssetSection from "../asset-section.hook";

interface Props extends IDepositDetailsDefaultBlockProps {
  minimumDepositAmounts: Array<AmountWithCurrency>;
}

const _CreateProgramDepositBlock: React.FC<Props> = ({
  hide,
  blockNumber = 3,
  walletFieldName,
  inputName,
  assetCurrency,
  depositAmount,
  minimumDepositAmounts,
  setFieldValue
}) => {
  const assetSection = useAssetSection({
    assetCurrency
  });
  const { wallet, rate } = assetSection;

  if (!wallet) return null;

  const minimumDepositAmount = safeGetElemFromArray(
    minimumDepositAmounts,
    amountWithCurrency => amountWithCurrency.currency === assetCurrency
  ).amount;

  const minimumDepositAmountInCurr = convertToCurrency(
    minimumDepositAmount,
    rate
  );

  const minimumDepositAmountInCurrFormatted =
    wallet.currency === assetCurrency
      ? minimumDepositAmountInCurr
      : +formatCurrencyValue(minimumDepositAmountInCurr, wallet.currency, {
          up: true
        });

  return (
    <DepositDetailsDefaultBlock
      assetSection={assetSection}
      hide={hide}
      blockNumber={blockNumber}
      walletFieldName={walletFieldName}
      inputName={inputName}
      depositAmount={depositAmount}
      minimumDepositAmount={minimumDepositAmountInCurrFormatted}
      setFieldValue={setFieldValue}
      assetCurrency={assetCurrency}
    />
  );
};

const CreateProgramDepositBlock = React.memo(_CreateProgramDepositBlock);
export default CreateProgramDepositBlock;
