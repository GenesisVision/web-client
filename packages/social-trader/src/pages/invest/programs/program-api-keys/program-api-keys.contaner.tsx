import { AddApiKeyButton } from "components/api-keys/api-key/add-account-api-key/add-api-key.button";
import { ApiKeysTable } from "components/api-keys/api-keys.table";
import { DefaultTableBlock } from "components/default.block/default-table.block";
import { DefaultBlock } from "components/default.block/default.block";
import DetailsDescriptionSection from "components/details/details-description-section/details-description/details-description-section";
import { DetailsTags } from "components/details/details-description-section/details-description/details-tags.block";
import { DetailsDivider } from "components/details/details-divider.block";
import Page from "components/page/page";
import { ASSET } from "constants/constants";
import Crashable from "decorators/crashable";
import { LevelsParamsInfo } from "gv-api-web";
import PerformanceData from "pages/invest/programs/program-details/program-details-description/performance-data";
import { levelsParamsLoaderData } from "pages/invest/programs/program-details/program-details.loader-data";
import { ProgramDescriptionDataType } from "pages/invest/programs/program-details/program-details.types";
import * as React from "react";
import { useCallback } from "react";

interface Props {
  levelsParameters?: LevelsParamsInfo;
  data: ProgramDescriptionDataType;
}

const _ProgramApiKeysContainer: React.FC<Props> = ({
  levelsParameters,
  data: description
}) => {
  const {
    programDetails,
    followDetails,
    publicInfo: { isOwnAsset, title, logoUrl, color },
    owner: { username, url: ownerUrl, socialLinks },
    tradingAccountInfo: { currency },
    tags,
    id
  } = description;

  const isExchange = programDetails?.type === "DailyPeriod";

  const programPersonalDetails =
    programDetails && programDetails.personalDetails;
  const followPersonalDetails = followDetails && followDetails.personalDetails;
  const personalDetails = followPersonalDetails || programPersonalDetails;

  const assetType = !!followDetails ? ASSET.FOLLOW : ASSET.PROGRAM;

  const renderPerformanceData = useCallback(
    () => (
      <PerformanceData
        isExchange={isExchange}
        leverageMax={description.tradingAccountInfo.leverageMax}
        leverageMin={description.tradingAccountInfo.leverageMin}
        currency={description.tradingAccountInfo.currency}
        status={description.publicInfo.status}
        brokerDetails={description.brokerDetails}
        loaderData={levelsParamsLoaderData}
        data={levelsParameters!}
        programDetails={description.programDetails}
      />
    ),
    [description, levelsParamsLoaderData, levelsParameters]
  );

  const renderAssetDetailsExtraBlock = useCallback(
    () => <DetailsTags tags={tags} />,
    [tags]
  );

  return (
    <Page title={description.publicInfo.title}>
      <DetailsDescriptionSection
        isOwnAsset={isOwnAsset}
        logo={logoUrl}
        title={title}
        id={id}
        subtitle={username}
        socialLinks={socialLinks}
        subtitleUrl={ownerUrl}
        currency={currency}
        color={color}
        asset={assetType}
        programDetails={programDetails || followDetails}
        description={description.publicInfo.description}
        AssetDetailsExtraBlock={renderAssetDetailsExtraBlock}
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

const ProgramApiKeysContainer = React.memo(Crashable(_ProgramApiKeysContainer));
export default ProgramApiKeysContainer;
