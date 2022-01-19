import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { DialogButtons } from "components/dialog/dialog-buttons";
import InputAmountField from "components/input-amount-field/hook-form-amount-field";
import { SubmitButton } from "components/submit-button/submit-button";
import useApiRequest from "hooks/api-request.hook";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm, postponeCallback } from "utils/hook-form.helpers";
import { CurrencyEnum } from "utils/types";
import { minMaxNumberRules } from "utils/validators/validators";

import { useMetamaskConnect } from "../hooks/metamask-connect";
import { web3InvestMinValue } from "../web3.helpers";
import { metamaskInvest } from "../web3.service";
import { withWeb3 } from "../with-web3";

export enum METAMASK_INVESTING_FORM_FIELDS {
  AMOUNT = "amount"
}

interface MetamaskInvestingFormValues {
  [METAMASK_INVESTING_FORM_FIELDS.AMOUNT]: string;
}

export interface Props {
  currency: CurrencyEnum;
  index: number;
  onClose: () => void;
}

const _MetamaskInvestingForm: React.FC<Props> = ({
  index,
  onClose,
  currency
}) => {
  const [t] = useTranslation();
  const { active, account, library: provider } = useWeb3React<Web3Provider>();
  const { connectMetamask, isPending } = useMetamaskConnect();

  const { sendRequest } = useApiRequest({
    middleware: [postponeCallback(onClose)],
    request: metamaskInvest,
    successMessage: "deposit-asset.successful-transaction"
  });

  const form = useForm<MetamaskInvestingFormValues>({
    mode: "onChange"
  });

  const { watch } = form;

  const { amount = 0 } = watch();

  const invest = () => {
    return sendRequest({
      account: account!,
      amount,
      assetIndex: index,
      currency,
      provider: provider!
    });
  };

  return (
    <HookForm form={form} onSubmit={active ? invest : connectMetamask}>
      <InputAmountField
        currency={currency === "BNB" ? "BNB" : "xDai"}
        label={t("deposit-asset.amount")}
        name={METAMASK_INVESTING_FORM_FIELDS.AMOUNT}
        triggerRules={active}
        showError={false}
        rules={
          active
            ? minMaxNumberRules({
                t,
                min: web3InvestMinValue,
                max: Number.MAX_SAFE_INTEGER
              })
            : undefined
        }
      />
      <DialogButtons>
        <SubmitButton checkDirty={false} wide disabled={isPending}>
          {active ? t("deposit-asset.confirm") : t("buttons.connect")}
        </SubmitButton>
      </DialogButtons>
    </HookForm>
  );
};

const MetamaskInvestingForm = withWeb3(React.memo(_MetamaskInvestingForm));
export default MetamaskInvestingForm;
