import { FormikProps, withFormik } from "formik";
import { TradingAccountDetails } from "gv-api-web";
import React, { useCallback } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import { DialogBottom } from "shared/components/dialog/dialog-bottom";
import { DialogButtons } from "shared/components/dialog/dialog-buttons";
import { DialogField } from "shared/components/dialog/dialog-field";
import GVButton from "shared/components/gv-button";
import WalletSelect from "shared/components/wallet-select/wallet-select";

import { CREATE_ACCOUNT_FORM_FIELDS } from "./follow-popup-create-account";

const _FollowSelectAccount: React.FC<Props> = ({
  t,
  accounts,
  onClick,
  values
}) => {
  const handleNext = useCallback(() => onClick(values), [onClick, values]);
  return (
    <form id="follow-select-account">
      <DialogBottom>
        <DialogField>
          <WalletSelect
            name={CREATE_ACCOUNT_FORM_FIELDS.initialDepositWalletId}
            label={t("follow-program.create-account.from")}
            items={accounts}
          />
        </DialogField>
      </DialogBottom>
      <DialogButtons>
        <GVButton onClick={handleNext} className="invest-form__submit-button">
          {t("follow-program.create-account.next")}
        </GVButton>
      </DialogButtons>
    </form>
  );
};

enum SELECT_ACCOUNT_FORM_FIELDS {
  account = "account"
}

export interface SelectAccountFormValues {
  [SELECT_ACCOUNT_FORM_FIELDS.account]: string;
}

interface Props
  extends OwnProps,
    FormikProps<SelectAccountFormValues>,
    WithTranslation {}

interface OwnProps {
  accounts: TradingAccountDetails[];
  onClick: (values: SelectAccountFormValues) => void;
}

const FollowSelectAccount = compose<React.ComponentType<OwnProps>>(
  translate(),
  withFormik({
    displayName: "follow-select-account",
    mapPropsToValues: ({ accounts }: Props) => ({
      [SELECT_ACCOUNT_FORM_FIELDS.account]: accounts[0]
    }),
    handleSubmit: () => {}
  }),
  React.memo
)(_FollowSelectAccount);
export default FollowSelectAccount;
