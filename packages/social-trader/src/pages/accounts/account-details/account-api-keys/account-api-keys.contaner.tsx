import { AddApiKeyButton } from "components/api-keys/api-key/add-account-api-key/add-api-key.button";
import { ApiKeysTable } from "components/api-keys/api-keys.table";
import { DefaultTableBlock } from "components/default.block/default-table.block";
import { DefaultBlock } from "components/default.block/default.block";
import DetailsDescriptionSection from "components/details/details-description-section/details-description/details-description-section";
import { DetailsDivider } from "components/details/details-divider.block";
import Page from "components/page/page";
import { ASSET } from "constants/constants";
import Crashable from "decorators/crashable";
import * as React from "react";
import { useCallback } from "react";

import PerformanceData from "../account-details-description/performance-data";
import { AccountDetailsDataType } from "../account-details.types";

interface Props {
  data: AccountDetailsDataType;
}

const _AccountApiKeysContainer: React.FC<Props> = ({ data: description }) => {
  const renderPerformanceData = useCallback(
    () => <PerformanceData description={description} />,
    [description]
  );

  return (
    <Page title={description.publicInfo.title}>
      <DetailsDescriptionSection
        isOwnAsset={true}
        logo={description.brokerDetails.logoUrl}
        title={description.publicInfo.title}
        id={description.id}
        currency={description.tradingAccountInfo.currency}
        asset={ASSET.FOLLOW}
        PerformanceData={renderPerformanceData}
        Controls={() => (
          <DefaultBlock size={"large"} bordered tall>
            <AddApiKeyButton id={description.id} />
          </DefaultBlock>
        )}
      />
      <DetailsDivider />
      <DefaultTableBlock wide>
        <ApiKeysTable id={description.id} />
      </DefaultTableBlock>
    </Page>
  );
};

const AccountApiKeysContainer = React.memo(Crashable(_AccountApiKeysContainer));
export default AccountApiKeysContainer;
