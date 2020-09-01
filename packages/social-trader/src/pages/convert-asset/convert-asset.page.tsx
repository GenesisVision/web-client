import Page from "components/page/page";
import { IConvertAssetSettingsFormOwnProps } from "pages/convert-asset/components/convert-asset-settings";
import { ConvertAssetSettingsSection } from "pages/convert-asset/components/convert-asset-settings-section";
import * as React from "react";
import { useTranslation } from "react-i18next";

interface Props extends IConvertAssetSettingsFormOwnProps {}

const _ConvertAssetPage: React.FC<Props> = ({
  fromTo,
  id,
  broker,
  currency
}) => {
  const [t] = useTranslation();
  const title = t(
    `convert-page:convert-${fromTo.assetFrom.toLowerCase()}-to-${fromTo.assetTo.toLowerCase()}`
  );
  return (
    <Page showTitle title={title}>
      <ConvertAssetSettingsSection
        currency={currency}
        fromTo={fromTo}
        id={id}
        broker={broker}
      />
    </Page>
  );
};

const ConvertAssetPage = React.memo(_ConvertAssetPage);
export default ConvertAssetPage;
