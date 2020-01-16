import "./fields.scss";

import AssetFormField from "components/assets/asset-fields/asset-form-field";
import AssetRow from "components/assets/asset-fields/asset-row";
import GVNumberField from "components/gv-number-field/gv-number-field";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { allowPositiveValuesNumberFormat } from "utils/helpers";

import AssetField from "../asset-fields/asset-field";

interface ISignalsFeeFormPartialProps {
  volumeFeeFieldName: string;
  successFeeFieldName: string;
  hasSubscriptionFeeAutofocus?: boolean;
  isSignalProgram?: boolean;
}

const _SignalsFeeFormPartial: React.FC<ISignalsFeeFormPartialProps> = ({
  successFeeFieldName,
  volumeFeeFieldName,
  isSignalProgram
}) => {
  const [t] = useTranslation();
  return (
    <>
      <div className="create-asset-settings__row-title">
        {t("create-program-page.settings.signal-provider-fees")}
      </div>
      <AssetRow>
        <AssetField>
          <AssetFormField
            wide
            disabled={isSignalProgram}
            name={volumeFeeFieldName}
            label={t("create-program-page.settings.fields.signal-volume-fee")}
            adornment="%"
            component={GVNumberField}
            isAllowed={allowPositiveValuesNumberFormat(4)}
            hintTooltipContent={t(
              "create-program-page.settings.hints.signal-volume-fee-description"
            )}
            hintContent={t(
              "create-program-page.settings.hints.signal-volume-fee"
            )}
          />
        </AssetField>
        <AssetField>
          <AssetFormField
            wide
            disabled={isSignalProgram}
            name={successFeeFieldName}
            label={t("create-program-page.settings.fields.signal-success-fee")}
            adornment="%"
            component={GVNumberField}
            isAllowed={allowPositiveValuesNumberFormat(4)}
            hintTooltipContent={t(
              "create-program-page.settings.hints.signal-success-fee-description"
            )}
            hintContent={t(
              "create-program-page.settings.hints.signal-success-fee"
            )}
          />
        </AssetField>
      </AssetRow>
    </>
  );
};

const SignalsFeeFormPartial = React.memo(_SignalsFeeFormPartial);
export default SignalsFeeFormPartial;
