import DetailsDescriptionSection from "components/details/details-description-section/details-description/details-description-section";
import { DETAILS_TYPE } from "components/details/details.types";
import { FUND_ASSET_TYPE } from "components/fund-asset/fund-asset";
import FundAssetContainer, {
  FundAssetType
} from "components/fund-asset/fund-asset-container";
import ManagerHistorySection from "components/manager/manager-history/manager-history-section";
import Page from "components/page/page";
import StatisticItem from "components/statistic-item/statistic-item";
import { PublicProfile } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { localizedDate } from "shared/utils/dates";

const _ManagerPage: React.FC<Props> = ({ profile }) => {
  const [t] = useTranslation();
  const memberSince = `${t("manager-page.member-since")} ${localizedDate(
    profile.regDate
  )}`;
  return (
    <Page title={`${t("manager-page.title")} ${profile.username}`}>
      <DetailsDescriptionSection
        descriptionTitle={t("manager-page.about")}
        subtitle={memberSince}
        detailsType={DETAILS_TYPE.USER}
        id={profile.id}
        title={profile.username}
        logo={profile.avatar}
        description={profile.about}
        socialLinks={profile.socialLinks}
        AssetDetailsExtraBlock={() => (
          <StatisticItem label={t("manager-page.assets")}>
            <FundAssetContainer
              assets={profile.assets.map(
                (item: string) =>
                  ({
                    asset: item,
                    name: item,
                    percent: 0,
                    icon: ""
                  } as FundAssetType)
              )}
              type={FUND_ASSET_TYPE.TEXT}
              size={profile.assets.length}
            />
          </StatisticItem>
        )}
      />
      <ManagerHistorySection ownerId={profile.id} title={profile.username} />
    </Page>
  );
};

interface Props {
  profile: PublicProfile;
}

const ManagerPage = React.memo(_ManagerPage);
export default ManagerPage;
