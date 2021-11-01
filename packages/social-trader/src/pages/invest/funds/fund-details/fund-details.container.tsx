import BreadCrumbs from "components/breadcrumbs/breadcrumbs";
import DetailsDescriptionSection from "components/details/details-description-section/details-description/details-description-section";
import DetailsInvestment from "components/details/details-description-section/details-investment/details-investment";
import { DetailsDivider } from "components/details/details-divider.block";
import Page from "components/page/page";
import { Row } from "components/row/row";
import { ASSET } from "constants/constants";
import { FundDetailsFull } from "gv-api-web";
import { useAccountCurrency } from "hooks/account-currency.hook";
import InvestDefaultPopup from "modules/invest-popup/invest-default-popup";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { GV_FUNDS_ROUTE, INVEST_ROUTE } from "routes/invest.routes";
import {
  composeFundBannerUrl,
  composeFundsDetailsUrl,
  createFundNotificationsToUrl,
  createFundSettingsToUrl
} from "utils/compose-url";
import { CurrencyEnum } from "utils/types";

import FundDetailsHistorySection from "./fund-details-history-section/fund-details-history-section";
import FundDetailsStatisticSection from "./fund-details-statistics-section/fund-details-statistic-section";
import FundAssetsBlock from "./fund-popup/fund-assets-block";
import FundFeesBlock from "./fund-popup/fund-fees-block";
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
  const [origin, setOrigin] = useState<string | undefined>(undefined);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

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
    () =>
      origin
        ? composeFundBannerUrl(description.publicInfo.url, origin)
        : undefined,
    [description, origin]
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
    () => <FundAssetsBlock assets={description.assetsStructure} />,
    [description.assetsStructure]
  );

  const renderPopupAssetDetailsExtraBlock = useCallback(
    () => (
      <FundAssetsBlock canExpand={false} assets={description.assetsStructure} />
    ),
    [description.assetsStructure]
  );

  const renderAssetFeesBlock = useCallback(
    () => (
      <FundFeesBlock
        entryFee={description.entryFeeCurrent}
        exitFee={description.exitFeeCurrent}
      />
    ),
    [description]
  );

  const renderFundPopup = useCallback(
    (popupTop: JSX.Element, form: JSX.Element) => (
      <InvestDefaultPopup
        popupTop={popupTop}
        ownerUrl={description.owner.url}
        assetColor={description.publicInfo.color}
        assetLogo={description.publicInfo.logoUrl}
        AssetDetailsExtraBlock={renderPopupAssetDetailsExtraBlock}
        AssetFeesBlock={renderAssetFeesBlock}
        title={description.publicInfo.title}
        assetOwner={description.owner.username}
        form={form}
      />
    ),
    [description]
  );

  const renderControls = useCallback(
    () => (
      <InvestmentFundControls
        renderAssetPopup={renderFundPopup}
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
      <BreadCrumbs
        items={[
          { href: INVEST_ROUTE, label: t("navigation.invest") },
          {
            href: GV_FUNDS_ROUTE,
            label: t("navigation.gv-funds")
          },
          {
            href: composeFundsDetailsUrl(description.publicInfo.url),
            label: description.publicInfo.title
          }
        ]}
      />
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
        renderAssetPopup={renderFundPopup}
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
