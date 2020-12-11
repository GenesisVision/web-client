import DetailsDescriptionSection from "components/details/details-description-section/details-description/details-description-section";
import DetailsInvestment from "components/details/details-description-section/details-investment/details-investment";
import { DetailsDivider } from "components/details/details-divider.block";
import FundAssetContainer from "components/fund-asset/fund-asset-container";
import Page from "components/page/page";
import { Row } from "components/row/row";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import { ASSET } from "constants/constants";
import { FundDetailsFull } from "gv-api-web";
import { useAccountCurrency } from "hooks/account-currency.hook";
import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
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
import {
  dispatchFundDescriptionWithId,
  generateScheduleText
} from "./services/fund-details.service";

const _FundDetailsContainer: React.FC<Props> = ({ data: description }) => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const currency = useAccountCurrency();
  const handleDispatchDescription = useCallback(() => {
    dispatch(
      dispatchFundDescriptionWithId(description.id, undefined, currency)
    );
  }, []);

  const hasTradingSchedule = description.tradingSchedule.hasTradingSchedule;
  const schedule = generateScheduleText(description.tradingSchedule);
  const investMessage = `${t("trading-schedule.invest-fund")} \n${schedule}`;
  const investmentMessage = `${t(
    "trading-schedule.post-create-fund"
  )} \n${schedule}`;

  const title = `${t("fund-details-page:title")} - ${
    description.publicInfo.title
  }`;

  const banner = useMemo(
    // () => composeFundBannerUrl(description.publicInfo.url),
    () => description.publicInfo.logoUrl,
    [description]
  );
  const schemas = useMemo(() => [getFundSchema(description)], [description]);

  const notificationsUrl = useMemo(
    () =>
      createFundNotificationsToUrl(
        description.publicInfo.url,
        description.publicInfo.title
      ),
    [description]
  );
  const settingsUrl = useMemo(
    () =>
      description.publicInfo.status !== "Disabled" &&
      description.publicInfo.status !== "Closed"
        ? createFundSettingsToUrl(
            description.publicInfo.url,
            description.publicInfo.title
          )
        : undefined,
    [description]
  );

  const renderAssetDetailsExtraBlock = useCallback(
    () => (
      <>
        <h4>
          <TooltipLabel
            tooltipContent={t("fund-details-page:tooltip.assets")}
            labelText={t("asset-details:description.assets")}
          />
        </h4>
        <Row>
          <FundAssetContainer
            type={"large"}
            assets={description.assetsStructure}
            size={7}
          />
        </Row>
      </>
    ),
    [description]
  );
  const renderControls = useCallback(
    () => (
      <InvestmentFundControls
        hasTradingSchedule={hasTradingSchedule}
        infoMessage={investMessage}
        fundDescription={description}
        onApply={handleDispatchDescription}
      />
    ),
    [description, handleDispatchDescription]
  );

  const fees = useMemo(
    () => ({
      exitFee: description.exitFeeCurrent,
      entryFee: description.entryFeeCurrent,
      exitFeePersonal: description.personalDetails
        ? description.personalDetails.exitFeePersonal
        : 0
    }),
    [description]
  );

  return (
    <Page
      type={"article"}
      title={title}
      schemas={schemas}
      description={`${t("funds-page:title")} ${
        description.publicInfo.title
      } - ${description.publicInfo.description}`}
      previewImage={banner}
    >
      <DetailsDescriptionSection
        personalDetails={description.personalDetails}
        isOwnAsset={description.publicInfo.isOwnAsset}
        id={description.id}
        title={description.publicInfo.title}
        logo={description.publicInfo.logoUrl}
        color={description.publicInfo.color}
        subtitleUrl={description.owner.url}
        socialLinks={description.owner.socialLinks}
        subtitle={description.owner.username}
        asset={ASSET.FUND}
        description={description.publicInfo.description}
        systemUrl={description.publicInfo.systemUrl}
        notificationsUrl={notificationsUrl}
        settingsUrl={settingsUrl}
        AssetDetailsExtraBlock={renderAssetDetailsExtraBlock}
        Controls={renderControls}
      />
      <DetailsDivider />
      <DetailsInvestment
        title={description.publicInfo.title}
        hasTradingSchedule={hasTradingSchedule}
        investmentMessage={hasTradingSchedule ? investmentMessage : undefined}
        withdrawMessage={hasTradingSchedule ? investMessage : undefined}
        isOwnAsset={description.publicInfo.isOwnAsset}
        fees={fees}
        dispatchDescription={handleDispatchDescription}
        asset={ASSET.FUND}
        selector={fundEventsTableSelector}
        id={description.id}
        currency={"GVT" as CurrencyEnum}
        personalFundDetails={description.personalDetails}
      />
      <Row onlyOffset>
        <FundDetailsStatisticSection />
      </Row>
      <FundDetailsHistorySection id={description.id} />
    </Page>
  );
};

interface Props {
  data: FundDetailsFull;
}

const FundDetailsContainer = React.memo(_FundDetailsContainer);
export default FundDetailsContainer;
