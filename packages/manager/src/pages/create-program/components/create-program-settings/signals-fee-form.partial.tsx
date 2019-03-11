import { GVFormikField, GVTextField } from "gv-react-components";
import React, { FunctionComponent } from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import Hint from "shared/components/hint/hint";
import { VERTICAL_POPOVER_POS } from "shared/components/popover/popover";

interface ISignalsFeeFormPartialProps {
  subscriptionFeeFieldName: string;
  successFeeFieldName: string;
  maxEntryFee: number;
  maxSuccessFee: number;

  hasSubscriptionFeeAutofocus: boolean;
}

const SignalsFeeFormPartial: FunctionComponent<
  ISignalsFeeFormPartialProps & WithTranslation
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
      <div className="create-program-settings__item">
        <GVFormikField
          name={subscriptionFeeFieldName}
          label={t(
            "manager.create-program-page.settings.fields.subscription-fee"
          )}
          adornment="GVT"
          component={GVTextField}
          InputComponent={NumberFormat}
          autoComplete="off"
          decimalScale={4}
          autoFocus={hasSubscriptionFeeAutofocus}
        />
        <Hint
          content={t(
            "manager.create-program-page.settings.hints.subscription-fee"
          )}
          className="create-program-settings__item-caption"
          vertical={VERTICAL_POPOVER_POS.BOTTOM}
          tooltipContent={t(
            "manager.create-program-page.settings.hints.subscription-fee-description"
          )}
        />
      </div>
      <div className="create-program-settings__item">
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
          content={t(
            "manager.create-program-page.settings.hints.signal-success-fee"
          )}
          className="create-program-settings__item-caption"
          vertical={VERTICAL_POPOVER_POS.BOTTOM}
          tooltipContent={t(
            "manager.create-program-page.settings.hints.signal-success-fee-description"
          )}
        />
      </div>
    </div>
  );
};

export default withTranslation()(SignalsFeeFormPartial);
