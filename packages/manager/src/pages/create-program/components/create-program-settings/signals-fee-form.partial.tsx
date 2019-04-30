import { GVFormikField, GVTextField } from "gv-react-components";
import React, { FunctionComponent } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import Hint from "shared/components/hint/hint";
import { VERTICAL_POPOVER_POS } from "shared/components/popover/popover";
import { allowValuesNumberFormat } from "shared/utils/helpers";

interface ISignalsFeeFormPartialProps {
  volumeFeeFieldName: string;
  successFeeFieldName: string;
  hasSubscriptionFeeAutofocus?: boolean;
}

const SignalsFeeFormPartial: FunctionComponent<
  ISignalsFeeFormPartialProps & InjectedTranslateProps
> = ({
  t,
  successFeeFieldName,
  volumeFeeFieldName,
  hasSubscriptionFeeAutofocus = false
}) => {
  return (
    <div className="create-program-settings__row">
      <div className="create-program-settings__row-title">
        {t("manager.create-program-page.settings.signal-provider-fees")}
      </div>
      <div className="create-program-settings__item">
        <GVFormikField
          name={volumeFeeFieldName}
          label={t(
            "manager.create-program-page.settings.fields.signal-volume-fee"
          )}
          adornment="%"
          component={GVTextField}
          InputComponent={NumberFormat}
          autoComplete="off"
          decimalScale={2}
          autoFocus={hasSubscriptionFeeAutofocus}
          isAllowed={allowValuesNumberFormat()}
        />
        <Hint
          content={t(
            "manager.create-program-page.settings.hints.signal-volume-fee"
          )}
          className="create-program-settings__item-caption"
          vertical={VERTICAL_POPOVER_POS.BOTTOM}
          tooltipContent={t(
            "manager.create-program-page.settings.hints.signal-volume-fee-description"
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
          isAllowed={allowValuesNumberFormat()}
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

export default translate()(SignalsFeeFormPartial);
