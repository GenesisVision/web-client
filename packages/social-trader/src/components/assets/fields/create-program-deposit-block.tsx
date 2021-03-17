import DepositDetailsDefaultBlock, {
  IDepositDetailsDefaultBlockProps
} from "components/assets/fields/deposit-details-default-block";
import { AmountWithCurrency } from "gv-api-web";
import React from "react";
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
  const { wallet } = assetSection;

  if (!wallet) return null;

  const minimumDepositAmount = safeGetElemFromArray(
    minimumDepositAmounts,
    amountWithCurrency => amountWithCurrency.currency === wallet.currency
  ).amount;

  return (
    <DepositDetailsDefaultBlock
      assetSection={assetSection}
      hide={hide}
      blockNumber={blockNumber}
      walletFieldName={walletFieldName}
      inputName={inputName}
      depositAmount={depositAmount}
      minimumDepositAmount={minimumDepositAmount}
      setFieldValue={setFieldValue}
      assetCurrency={assetCurrency}
    />
  );
};

const CreateProgramDepositBlock = React.memo(_CreateProgramDepositBlock);
export default CreateProgramDepositBlock;
