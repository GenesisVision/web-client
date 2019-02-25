import { GVFormikField, GVTextField } from "gv-react-components";
import React, { FunctionComponent } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import Hint from "shared/components/hint/hint";

interface ISignalsFeeFormPartialProps {
  subscriptionFeeFieldName: string;
  successFeeFieldName: string;
  maxEntryFee: number;
  maxSuccessFee: number;

  hasSubscriptionFeeAutofocus: boolean;
}

const SignalsFeeFormPartial: FunctionComponent<
  ISignalsFeeFormPartialProps & InjectedTranslateProps
> = ({
  t,
  successFeeFieldName,
  subscriptionFeeFieldName,
  maxEntryFee,
  maxSuccessFee,
  hasSubscriptionFeeAutofocus = false
}) => {
  return (
    <div className="create-program-settings__row">
      <div className="create-program-settings__row-title">
        {t("manager.create-program-page.settings.signal-provider-fees")}
      </div>
      <div className="create-program-settings__fee">
        <GVFormikField
          name={subscriptionFeeFieldName}
          label={t(
            "manager.create-program-page.settings.fields.monthly-subscription-fee"
          )}
          adornment="GVT"
          component={GVTextField}
          InputComponent={NumberFormat}
          autoComplete="off"
          decimalScale={4}
          autoFocus={hasSubscriptionFeeAutofocus}
        />
        <Hint
          content={t("manager.create-program-page.settings.hints.entry-fee")}
          className="create-program-settings__fee-hint"
          vertical={"bottom"}
          tooltipContent={`
          ${t(
            "manager.create-program-page.settings.hints.entry-fee-description",
            {
              maxFee: maxEntryFee
            }
          )}. ${t(
            "manager.create-program-page.settings.hints.entry-fee-levels"
          )}
          `}
        />
      </div>
      <div className="create-program-settings__fee">
        <GVFormikField
          name={successFeeFieldName}
          label={t(
            "manager.create-program-page.settings.fields.signal-success-fee"
          )}
          adornment="%"
          component={GVTextField}
          InputComponent={NumberFormat}
          autoComplete="off"
          decimalScale={4}
        />
        <Hint
          content={t("manager.create-program-page.settings.hints.success-fee")}
          className="create-program-settings__fee-hint"
          vertical={"bottom"}
          tooltipContent={t(
            "manager.create-program-page.settings.hints.success-fee-description",
            {
              maxFee: maxSuccessFee
            }
          )}
        />
      </div>
    </div>
  );
};

export default translate()(SignalsFeeFormPartial);
