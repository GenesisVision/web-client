import { IConvertAssetSettingsFormOwnProps } from "pages/convert-asset/components/convert-asset-settings";
import React from "react";

import { ConvertAssetSettingsSection } from "./convert-asset-settings-section";

const _ConvertAssetContainer: React.FC<Props> = ({
  currency,
  fromTo,
  title,
  id,
  broker
}) => {
  return (
    <ConvertAssetSettingsSection
      currency={currency}
      fromTo={fromTo}
      id={id}
      broker={broker}
    />
  );
};

interface Props extends IConvertAssetSettingsFormOwnProps {
  title: string;
}

const ConvertAssetContainer = React.memo(_ConvertAssetContainer);
export default ConvertAssetContainer;
