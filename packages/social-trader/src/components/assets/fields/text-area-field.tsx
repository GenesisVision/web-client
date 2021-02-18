import AssetFormField from "components/assets/asset-fields/asset-form-field";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import * as React from "react";
import styled from "styled-components";
import { AnyObjectType } from "utils/types";

import AssetField from "../asset-fields/asset-field";

interface Props {
  value?: string;
  caption: string;
  label: string;
  name: string;
  rules?: AnyObjectType;
}

const Container = styled.div`
  max-width: 500px;
`;

const _TextAreaField: React.FC<Props> = ({
  rules,
  name,
  value,
  label,
  caption
}) => {
  return (
    <AssetField wide>
      <Container>
        <AssetFormField
          wide
          value={value}
          type="textarea"
          name={name}
          label={label}
          component={SimpleTextField}
          caption={caption}
          rules={rules}
        />
      </Container>
    </AssetField>
  );
};

const TextAreaField = React.memo(_TextAreaField);
export default TextAreaField;
