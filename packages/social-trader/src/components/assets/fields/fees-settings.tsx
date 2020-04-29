import AssetFormField from "components/assets/asset-fields/asset-form-field";
import AssetRow from "components/assets/asset-fields/asset-row";
import { SimpleNumberField } from "components/simple-fields/simple-number-field";
import React from "react";
import { allowPositiveValuesNumberFormat } from "utils/helpers";

import AssetField from "../asset-fields/asset-field";
import "./fields.scss";

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
    <>
      {title && <div className="create-asset-settings__row-title">{title}</div>}
      <AssetRow>
        <AssetField>
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
        </AssetField>
        <AssetField>
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
        </AssetField>
      </AssetRow>
    </>
  );
};

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

const FeesSettings = React.memo(_FeesSettings);
export default FeesSettings;
