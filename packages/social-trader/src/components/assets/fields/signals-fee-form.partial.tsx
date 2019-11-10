import "./fields.scss";

import AssetRow from "components/assets/asset-fields/asset-row";
import * as React from "react";
import { useTranslation } from "react-i18next";
import GVFormikField from "shared/components/gv-formik-field";
import GVNumberField from "shared/components/gv-number-field/gv-number-field";
import Hint from "shared/components/hint/hint";
import { VERTICAL_POPOVER_POS } from "shared/components/popover/popover";
import { allowValuesNumberFormat } from "shared/utils/helpers";

import AssetField from "../asset-fields/asset-field";

interface ISignalsFeeFormPartialProps {
  volumeFeeFieldName: string;
  successFeeFieldName: string;
  hasSubscriptionFeeAutofocus?: boolean;
}

const _SignalsFeeFormPartial: React.FC<ISignalsFeeFormPartialProps> = ({
  successFeeFieldName,
  volumeFeeFieldName,
  hasSubscriptionFeeAutofocus = false
}) => {
  const [t] = useTranslation();
  return (
    <>
      <div className="create-asset-settings__row-title">
        {t("create-program-page.settings.signal-provider-fees")}
      </div>
      <AssetRow>
        <AssetField>
          <GVFormikField
            name={volumeFeeFieldName}
            label={t("create-program-page.settings.fields.signal-volume-fee")}
            adornment="%"
            component={GVNumberField}
            autoComplete="off"
            decimalScale={2}
            autoFocus={hasSubscriptionFeeAutofocus}
            isAllowed={allowValuesNumberFormat()}
          />
          <Hint
            content={t("create-program-page.settings.hints.signal-volume-fee")}
            className="create-asset-settings__hint"
            vertical={VERTICAL_POPOVER_POS.BOTTOM}
            tooltipContent={t(
              "create-program-page.settings.hints.signal-volume-fee-description"
            )}
          />
        </AssetField>
        <AssetField>
          <GVFormikField
            name={successFeeFieldName}
            label={t("create-program-page.settings.fields.signal-success-fee")}
            adornment="%"
            component={GVNumberField}
            autoComplete="off"
            decimalScale={2}
            isAllowed={allowValuesNumberFormat()}
          />
          <Hint
            content={t("create-program-page.settings.hints.signal-success-fee")}
            className="create-asset-settings__hint"
            vertical={VERTICAL_POPOVER_POS.BOTTOM}
            tooltipContent={t(
              "create-program-page.settings.hints.signal-success-fee-description"
            )}
          />
        </AssetField>
      </AssetRow>
    </>
  );
};

const SignalsFeeFormPartial = React.memo(_SignalsFeeFormPartial);
export default SignalsFeeFormPartial;
