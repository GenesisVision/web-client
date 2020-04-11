import AssetFormField from "components/assets/asset-fields/asset-form-field";
import AssetRow from "components/assets/asset-fields/asset-row";
import { RowItem } from "components/row-item/row-item";
import { SimpleNumberField } from "components/simple-fields/simple-number-field";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { allowPositiveValuesNumberFormat } from "utils/helpers";

import AssetField from "../asset-fields/asset-field";

interface ISignalsFeeFormPartialProps {
  volumeFeeFieldName: string;
  successFeeFieldName: string;
  hasSubscriptionFeeAutofocus?: boolean;
}

const _SignalsFeeFormPartial: React.FC<ISignalsFeeFormPartialProps> = ({
  successFeeFieldName,
  volumeFeeFieldName
}) => {
  const [t] = useTranslation();
  return (
    <AssetRow>
      <RowItem>
        <AssetFormField
          wide
          name={volumeFeeFieldName}
          label={t("create-program-page.settings.fields.signal-volume-fee")}
          adornment="%"
          component={SimpleNumberField}
          isAllowed={allowPositiveValuesNumberFormat(4)}
          hintTooltipContent={t(
            "create-program-page.settings.hints.signal-volume-fee-description"
          )}
          hintContent={t(
            "create-program-page.settings.hints.signal-volume-fee"
          )}
        />
      </RowItem>
      <RowItem>
        <AssetFormField
          wide
          name={successFeeFieldName}
          label={t("create-program-page.settings.fields.signal-success-fee")}
          adornment="%"
          component={SimpleNumberField}
          isAllowed={allowPositiveValuesNumberFormat(4)}
          hintTooltipContent={t(
            "create-program-page.settings.hints.signal-success-fee-description"
          )}
          hintContent={t(
            "create-program-page.settings.hints.signal-success-fee"
          )}
        />
      </RowItem>
    </AssetRow>
  );
};

const SignalsFeeFormPartial = React.memo(_SignalsFeeFormPartial);
export default SignalsFeeFormPartial;
