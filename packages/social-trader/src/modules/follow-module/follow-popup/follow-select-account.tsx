import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogField } from "components/dialog/dialog-field";
import GVButton from "components/gv-button";
import WalletSelect from "components/wallet-select/wallet-select";
import { FormikProps, withFormik } from "formik";
import { TradingAccountDetails } from "gv-api-web";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { compose } from "redux";

const _FollowSelectAccount: React.FC<Props> = ({
  accounts,
  onSelect,
  values
}) => {
  const [t] = useTranslation();
  const handleNext = useCallback(() => onSelect(values), [onSelect, values]);
  return (
    <form id="follow-select-account">
      <DialogBottom>
        <DialogField>
          <WalletSelect
            name={SELECT_ACCOUNT_FORM_FIELDS.account}
            label={t("follow-program.create-account.from")}
            items={accounts}
          />
        </DialogField>
        <DialogButtons>
          <GVButton onClick={handleNext} className="invest-form__submit-button">
            {t("follow-program.create-account.next")}
          </GVButton>
        </DialogButtons>
      </DialogBottom>
    </form>
  );
};

enum SELECT_ACCOUNT_FORM_FIELDS {
  account = "account"
}

export interface SelectAccountFormValues {
  [SELECT_ACCOUNT_FORM_FIELDS.account]: string;
}

interface Props extends OwnProps, FormikProps<SelectAccountFormValues> {}

interface OwnProps {
  accounts: TradingAccountDetails[];
  onSelect: (values: SelectAccountFormValues) => void;
}

const FollowSelectAccount = compose<React.ComponentType<OwnProps>>(
  withFormik({
    displayName: "follow-select-account",
    mapPropsToValues: ({ accounts }: Props) => ({
      [SELECT_ACCOUNT_FORM_FIELDS.account]: accounts[0].id
    }),
    handleSubmit: () => {}
  }),
  React.memo
)(_FollowSelectAccount);
export default FollowSelectAccount;
