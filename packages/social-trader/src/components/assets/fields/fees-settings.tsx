import AssetFormField from "components/assets/asset-fields/asset-form-field";
import AssetRow from "components/assets/asset-fields/asset-row";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { SimpleNumberField } from "components/simple-fields/simple-number-field";
import React from "react";
import { allowPositiveValuesNumberFormat } from "utils/helpers";

interface Props {
  firstFeeLabel: string;
  firstFeeUnderText: string;
  firstFeeName: string;
  firstFeeDescription: string;
  secondFeeName: string;
  secondFeeLabel: string;
  secondFeeUnderText: string;
  secondFeeDescription: string;
  title?: string;
}

const _FeesSettings: React.FC<Props> = ({
  title,
  firstFeeLabel,
  firstFeeUnderText,
  firstFeeName,
  firstFeeDescription,
  secondFeeName,
  secondFeeLabel,
  secondFeeUnderText,
  secondFeeDescription
}) => {
  return (
    <div>
      {title && (
        <Row>
          <h3>{title}</h3>
        </Row>
      )}
      <AssetRow>
        <RowItem>
          <AssetFormField
            wide
            name={firstFeeName}
            label={firstFeeLabel}
            adornment="%"
            component={SimpleNumberField}
            isAllowed={allowPositiveValuesNumberFormat(4)}
            hintTooltipContent={firstFeeDescription}
            hintContent={firstFeeUnderText}
          />
        </RowItem>
        <RowItem>
          <AssetFormField
            wide
            name={secondFeeName}
            label={secondFeeLabel}
            adornment="%"
            component={SimpleNumberField}
            isAllowed={allowPositiveValuesNumberFormat(4)}
            hintTooltipContent={secondFeeDescription}
            hintContent={secondFeeUnderText}
          />
        </RowItem>
      </AssetRow>
    </div>
  );
};

const FeesSettings = React.memo(_FeesSettings);
export default FeesSettings;
