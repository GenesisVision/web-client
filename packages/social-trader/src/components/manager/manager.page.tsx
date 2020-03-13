import { getConversationPostListLoaderData } from "components/conversation/conversation.loader";
import { PostList } from "components/conversation/post-list/post-list";
import DetailsDescriptionSection from "components/details/details-description-section/details-description/details-description-section";
import { DETAILS_TYPE } from "components/details/details.types";
import { FUND_ASSET_TYPE } from "components/fund-asset/fund-asset";
import FundAssetContainer, {
  FundAssetType
} from "components/fund-asset/fund-asset-container";
import ManagerHistorySection from "components/manager/manager-history/manager-history-section";
import { getManagerSchema } from "components/manager/manager.schema";
import Page from "components/page/page";
import StatisticItem from "components/statistic-item/statistic-item";
import Crashable from "decorators/crashable";
import { PublicProfile } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import filesService from "services/file-service";
import { localizedDate } from "utils/dates";

const _ManagerPage: React.FC<Props> = ({ profile }) => {
  const [t] = useTranslation();
  const memberSince = `${t("manager-page.member-since")} ${localizedDate(
    profile.regDate
  )}`;
  const title = `${t("manager-page.title")} ${profile.username}`;
  return (
    <Page
      title={title}
      schemas={[getManagerSchema(profile)]}
      description={profile.about || title}
      previewImage={filesService.getFileUrl(profile.avatar)}
    >
      <PostList posts={getConversationPostListLoaderData()} />
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

const ManagerPage = React.memo(Crashable(_ManagerPage));
export default ManagerPage;
