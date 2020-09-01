import { IConvertAssetSettingsFormOwnProps } from "pages/convert-asset/components/convert-asset-settings";
import React from "react";

import { ConvertAssetSettingsSection } from "./convert-asset-settings-section";

interface Props extends IConvertAssetSettingsFormOwnProps {
  title: string;
}

const _ConvertAssetContainer: React.FC<Props> = props => {
  return <ConvertAssetSettingsSection {...props} />;
};

const ConvertAssetContainer = React.memo(_ConvertAssetContainer);
export default ConvertAssetContainer;
