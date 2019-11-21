import "components/details/details.scss";

import DetailsDescriptionSection from "components/details/details-description-section/details-description/details-description-section";
import DetailsInvestment from "components/details/details-description-section/details-investment/details-investment";
import { InvestmentDetails } from "components/details/details-description-section/details-investment/details-investment.helpers";
import { FUND_ASSET_TYPE } from "components/fund-asset/fund-asset";
import FundAssetContainer from "components/fund-asset/fund-asset-container";
import Page from "components/page/page";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import { FundDetailsFull } from "gv-api-web";
import { FundWithdrawDialog } from "modules/fund-withdraw/fund-withdraw-dialog";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { currencySelector } from "reducers/account-settings-reducer";
import { fundEventsSelector } from "reducers/platform-reducer";
import { ASSET } from "shared/constants/constants";
import {
  createFundNotificationsToUrl,
  createFundSettingsToUrl
} from "utils/compose-url";
import { CurrencyEnum } from "utils/types";

import FundDetailsHistorySection from "./fund-details-history-section/fund-details-history-section";
import FundDetailsStatisticSection from "./fund-details-statistics-section/fund-details-statistic-section";
import InvestmentFundControls from "./investment-fund-controls/investment-fund-controls";
import { fundEventsTableSelector } from "./reducers/fund-events.reducer";
import { dispatchFundDescriptionWithId } from "./services/fund-details.service";

const _FundDetailsContainer: React.FC<Props> = ({ data: description }) => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const currency = useSelector(currencySelector);
  const handleDispatchDescription = useCallback(() => {
    dispatch(
      dispatchFundDescriptionWithId(description.id, undefined, currency)
    );
  }, []);
  return (
    <Page title={description.title}>
      <DetailsDescriptionSection
        personalDetails={description.personalDetails}
        description={description}
        notificationsUrl={createFundNotificationsToUrl(
          description.url,
          description.title
        )}
        settingsUrl={createFundSettingsToUrl(
          description.url,
          description.title
        )}
        AssetDetailsExtraBlock={() => (
          <div className="details-description__info-block">
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
          </div>
        )}
        Controls={() => (
          <InvestmentFundControls fundDescription={description} />
        )}
      />
      <div className="details__divider" />
      <DetailsInvestment
        fees={{
          exitFee: description.exitFeeCurrent,
          entryFee: description.entryFeeCurrent,
          exitFeePersonal: description.personalDetails
            ? description.personalDetails.exitFeePersonal
            : 0
        }}
        dispatchDescription={handleDispatchDescription}
        eventTypesSelector={fundEventsSelector}
        asset={ASSET.FUND}
        selector={fundEventsTableSelector}
        id={description.id}
        currency={"GVT" as CurrencyEnum}
        personalDetails={description.personalDetails as InvestmentDetails}
        WithdrawContainer={FundWithdrawDialog}
      />
      <FundDetailsStatisticSection />
      <FundDetailsHistorySection id={description.id} />
    </Page>
  );
};

interface Props {
  data: FundDetailsFull;
}

const FundDetailsContainer = React.memo(_FundDetailsContainer);
export default FundDetailsContainer;
