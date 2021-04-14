import { DialogButtons } from "components/dialog/dialog-buttons";
import InputAmountField from "components/input-amount-field/hook-form-amount-field";
import { SubmitButton } from "components/submit-button/submit-button";
import useApiRequest from "hooks/api-request.hook";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm, postponeCallback } from "utils/hook-form.helpers";

import { investBSC } from "./bsc-investing.service";

export enum BSC_INVESTING_FORM_FIELDS {
  ASSET_INDEX = "assetIndex",
  AMOUNT = "amount"
}

interface BTCInvestingFormValues {
  [BSC_INVESTING_FORM_FIELDS.ASSET_INDEX]: string;
  [BSC_INVESTING_FORM_FIELDS.AMOUNT]: number | string;
}

export interface Props {
  index: string;
  onClose: () => void;
}

const _BSCInvestingForm: React.FC<Props> = ({ index, onClose }) => {
  const [t] = useTranslation();

  // To do add text to json
  const { sendRequest } = useApiRequest({
    middleware: [postponeCallback(onClose)],
    request: investBSC,
    successMessage: "Transaction sent successfully"
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
      onSubmit={() => sendRequest({ assetIndex: index, amount })}
    >
      <InputAmountField
        currency={"BNB"}
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
