import { DialogButtons } from "components/dialog/dialog-buttons";
import InputAmountField from "components/input-amount-field/hook-form-amount-field";
import { SubmitButton } from "components/submit-button/submit-button";
import useApiRequest from "hooks/api-request.hook";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm, postponeCallback } from "utils/hook-form.helpers";
import { CurrencyEnum } from "utils/types";

import {
  contractInvest,
  investBSC,
  smartContractAddress,
  smartContractAddressDai
} from "./bsc-investing.service";

export enum BSC_INVESTING_FORM_FIELDS {
  ASSET_INDEX = "assetIndex",
  AMOUNT = "amount"
}

interface BTCInvestingFormValues {
  [BSC_INVESTING_FORM_FIELDS.ASSET_INDEX]: number;
  [BSC_INVESTING_FORM_FIELDS.AMOUNT]: number | string;
}

export interface Props {
  currency: CurrencyEnum;
  index: number;
  onClose: () => void;
}

const _BSCInvestingForm: React.FC<Props> = ({ index, onClose, currency }) => {
  const [t] = useTranslation();

  const { sendRequest: invest } = useApiRequest({
    middleware: [postponeCallback(onClose)],
    request: contractInvest,
    successMessage: "deposit-asset:successful-transaction"
  });

  const { sendRequest } = useApiRequest({
    middleware: [res => invest(res)],
    request: investBSC
  });

  const form = useForm<BTCInvestingFormValues>({
    defaultValues: {
      [BSC_INVESTING_FORM_FIELDS.ASSET_INDEX]: index
    },
    mode: "onChange"
  });

  const { watch } = form;

  const { amount = 0 } = watch();

  return (
    <HookForm
      form={form}
      onSubmit={() =>
        sendRequest({
          assetIndex: index,
          amount,
          contractAddress:
            currency === "BNB" ? smartContractAddress : smartContractAddressDai
        })
      }
    >
      <InputAmountField
        currency={currency === "BNB" ? "BNB" : "xDai"}
        label={t("deposit-asset.amount")}
        name={BSC_INVESTING_FORM_FIELDS.AMOUNT}
      />
      <DialogButtons>
        <SubmitButton checkDirty={false} wide>
          {t("deposit-asset.confirm")}
        </SubmitButton>
      </DialogButtons>
    </HookForm>
  );
};

const BSCInvestingForm = React.memo(_BSCInvestingForm);
export default BSCInvestingForm;
