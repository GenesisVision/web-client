import AssetFormField from "components/assets/asset-fields/asset-form-field";
import GVTextField from "components/gv-text-field";
import * as React from "react";

import AssetField from "../asset-fields/asset-field";

const _TextAreaField: React.FC<Props> = ({ name, value, label, caption }) => {
  return (
    <AssetField wide>
      <AssetFormField
        wide
        className="text-area-field"
        value={value}
        type="textarea"
        name={name}
        label={label}
        component={GVTextField}
        caption={caption}
      />
    </AssetField>
  );
};

interface Props {
  value?: string;
  caption: string;
  label: string;
  name: string;
}

const TextAreaField = React.memo(_TextAreaField);
export default TextAreaField;
