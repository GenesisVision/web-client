import DetailsDescriptionSection from "components/details/details-description-section/details-description/details-description-section";
import DetailsInvestment from "components/details/details-description-section/details-investment/details-investment";
import { DetailsDivider } from "components/details/details-divider.block";
import { DETAILS_TYPE } from "components/details/details.types";
import { FUND_ASSET_TYPE } from "components/fund-asset/fund-asset";
import FundAssetContainer from "components/fund-asset/fund-asset-container";
import Page from "components/page/page";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import { ASSET } from "constants/constants";
import Crashable from "decorators/crashable";
import { FundDetailsFull } from "gv-api-web";
import { useAccountCurrency } from "hooks/account-currency.hook";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import filesService from "services/file-service";
import {
  createFundNotificationsToUrl,
  createFundSettingsToUrl
} from "utils/compose-url";
import { CurrencyEnum } from "utils/types";

import FundDetailsHistorySection from "./fund-details-history-section/fund-details-history-section";
import FundDetailsStatisticSection from "./fund-details-statistics-section/fund-details-statistic-section";
import { getFundSchema } from "./fund-schema";
import InvestmentFundControls from "./investment-fund-controls/investment-fund-controls";
import { fundEventsTableSelector } from "./reducers/fund-events.reducer";
import { dispatchFundDescriptionWithId } from "./services/fund-details.service";

const _FundDetailsContainer: React.FC<Props> = ({ data: description }) => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const currency = useAccountCurrency();
  const handleDispatchDescription = useCallback(() => {
    dispatch(
      dispatchFundDescriptionWithId(description.id, undefined, currency)
    );
  }, []);
  const title = `${t("funds-page.title")} - ${description.publicInfo.title}`;
  return (
    <Page
      title={title}
      schemas={[getFundSchema(description)]}
      description={`${t("funds-page.title")} ${
        description.publicInfo.title
      } - ${description.publicInfo.description}`}
      previewImage={filesService.getFileUrl(description.publicInfo.logo)}
    >
      <DetailsDescriptionSection
        detailsType={DETAILS_TYPE.ASSET}
        personalDetails={description.personalDetails}
        isOwnAsset={description.publicInfo.isOwnAsset}
        id={description.id}
        title={description.publicInfo.title}
        logo={description.publicInfo.logo}
        color={description.publicInfo.color}
        subtitleUrl={description.owner.url}
        socialLinks={description.owner.socialLinks}
        subtitle={description.owner.username}
        asset={ASSET.FUND}
        description={description.publicInfo.description}
        notificationsUrl={createFundNotificationsToUrl(
          description.publicInfo.url,
          description.publicInfo.title
        )}
        settingsUrl={
          description.publicInfo.status !== "Disabled" &&
          description.publicInfo.status !== "Closed"
            ? createFundSettingsToUrl(
                description.publicInfo.url,
                description.publicInfo.title
              )
            : undefined
        }
        AssetDetailsExtraBlock={() => (
          <>
            <h4 className="details-description__subheading">
              <TooltipLabel
                tooltipContent={t("fund-details-page.tooltip.assets")}
                labelText={t("fund-details-page.description.assets")}
              />
            </h4>
            <div>
              <FundAssetContainer
                type={FUND_ASSET_TYPE.LARGE}
                assets={description.assetsStructure}
                size={7}
              />
            </div>
          </>
        )}
        Controls={() => (
          <InvestmentFundControls
            fundDescription={description}
            onApply={handleDispatchDescription}
          />
        )}
      />
      <DetailsDivider />
      <DetailsInvestment
        isOwnAsset={description.publicInfo.isOwnAsset}
        fees={{
          exitFee: description.exitFeeCurrent,
          entryFee: description.entryFeeCurrent,
          exitFeePersonal: description.personalDetails
            ? description.personalDetails.exitFeePersonal
            : 0
        }}
        dispatchDescription={handleDispatchDescription}
        asset={ASSET.FUND}
        selector={fundEventsTableSelector}
        id={description.id}
        currency={"GVT" as CurrencyEnum}
        personalFundDetails={description.personalDetails}
      />
      <FundDetailsStatisticSection />
      <FundDetailsHistorySection id={description.id} />
    </Page>
  );
};

interface Props {
  data: FundDetailsFull;
}

const FundDetailsContainer = React.memo(Crashable(_FundDetailsContainer));
export default FundDetailsContainer;
