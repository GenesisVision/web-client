import { Center } from "components/center/center";
import { RowItem } from "components/row-item/row-item";
import * as React from "react";

import "./asset-field.scss";

export const AssetField: React.FC<React.HTMLAttributes<HTMLDivElement> &
  Props> = ({ children, wide, hide }) => {
  return (
    <RowItem large hide={hide} wide={wide} bottomOffset className="asset-field">
      {children}
    </RowItem>
  );
};

interface Props {
  hide?: boolean;
  wide?: boolean;
}

export const AssetFields: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children
}) => (
  <Center wrap className="asset-fields">
    {children}
  </Center>
);

export default AssetField;
