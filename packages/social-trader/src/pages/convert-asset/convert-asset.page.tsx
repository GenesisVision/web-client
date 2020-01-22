import Page from "components/page/page";
import { IConvertAssetSettingsFormOwnProps } from "pages/convert-asset/components/convert-asset-settings";
import * as React from "react";
import { useTranslation } from "react-i18next";

import ConvertAssetContainer from "./components/convert-asset.container";

const _ConvertAssetPage: React.FC<Props> = ({
  fromTo,
  id,
  broker,
  currency
}) => {
  const [t] = useTranslation();
  const title = t(
    `convert-page.convert-${fromTo.assetFrom.toLowerCase()}-to-${fromTo.assetTo.toLowerCase()}`
  );
  return (
    <Page showTitle title={title}>
      <ConvertAssetContainer
        currency={currency}
        fromTo={fromTo}
        title={title}
        id={id}
        broker={broker}
      />
    </Page>
  );
};

interface Props extends IConvertAssetSettingsFormOwnProps {}

const ConvertAssetPage = React.memo(_ConvertAssetPage);
export default ConvertAssetPage;
