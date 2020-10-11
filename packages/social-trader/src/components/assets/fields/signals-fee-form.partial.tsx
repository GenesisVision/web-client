import AssetFormField from "components/assets/asset-fields/asset-form-field";
import AssetRow from "components/assets/asset-fields/asset-row";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { IRowProps } from "components/row/row.types";
import { SimpleNumberField } from "components/simple-fields/simple-number-field";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { allowPositiveValuesNumberFormat } from "utils/helpers";

interface ISignalsFeeFormPartialProps {
  inDialog?: boolean;
  volumeFeeFieldName: string;
  successFeeFieldName: string;
  hasSubscriptionFeeAutofocus?: boolean;
}

const _SignalsFeeFormPartial: React.FC<ISignalsFeeFormPartialProps> = ({
  inDialog,
  successFeeFieldName,
  volumeFeeFieldName
}) => {
  const [t] = useTranslation();
  const ContainerElem = (inDialog ? Row : RowItem) as React.FC<IRowProps>;
  return (
    <AssetRow>
      <ContainerElem onlyOffset wide={inDialog}>
        <AssetFormField
          wide
          name={volumeFeeFieldName}
          label={t("asset-settings:fields.signal-volume-fee")}
          adornment="%"
          component={SimpleNumberField}
          isAllowed={allowPositiveValuesNumberFormat(4)}
          hintTooltipContent={t(
            "create-account:settings.hints.signal-volume-fee-description"
          )}
          hintContent={t("create-account:settings.hints.signal-volume-fee")}
        />
      </ContainerElem>
      <ContainerElem onlyOffset wide={inDialog}>
        <AssetFormField
          wide
          name={successFeeFieldName}
          label={t("asset-settings:fields.signal-success-fee")}
          adornment="%"
          component={SimpleNumberField}
          isAllowed={allowPositiveValuesNumberFormat(4)}
          hintTooltipContent={t(
            "create-account:settings.hints.signal-success-fee-description"
          )}
          hintContent={t("create-account:settings.hints.signal-success-fee")}
        />
      </ContainerElem>
    </AssetRow>
  );
};

const SignalsFeeFormPartial = React.memo(_SignalsFeeFormPartial);
export default SignalsFeeFormPartial;
