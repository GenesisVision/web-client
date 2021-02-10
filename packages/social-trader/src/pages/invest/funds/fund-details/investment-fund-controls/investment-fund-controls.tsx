import { DefaultBlock } from "components/default.block/default.block";
import { DetailsStatisticContainer } from "components/details/details-description-section/details-description/details-structure-blocks";
import { InvestmentItem } from "components/details/details-description-section/details-investment/investment-item";
import { Row } from "components/row/row";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import { ASSET } from "constants/constants";
import { FundDetailsFull } from "gv-api-web";
import DepositButton from "modules/deposit/deposit.button";
import InvestmentFundInfo from "pages/invest/funds/fund-details/fund-details-description/investment-fund-info";
import * as React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";
import { formatValue } from "utils/formatter";

const _InvestmentFundControls: React.FC<Props> = props => {
  const [t] = useTranslation();
  const {
    hasTradingSchedule,
    infoMessage,
    fundDescription,
    onApply,
    AssetDetailsExtraBlock
  } = props;
  const isOwnProgram = fundDescription.publicInfo.isOwnAsset;
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const canInvest = isAuthenticated
    ? !!fundDescription.personalDetails &&
    fundDescription.personalDetails.canInvest
    : true;
  console.log(fundDescription);
  return (
    <DefaultBlock size={"large"} bordered>
      <InvestmentFundInfo fundDescription={fundDescription} />
      <Row>
        <DetailsStatisticContainer>
          <DepositButton
            ownerUrl={fundDescription.owner.url}
            assetColor={fundDescription.publicInfo.color}
            AssetDetailsExtraBlock={AssetDetailsExtraBlock}
            assetOwner={fundDescription.owner.username}
            renderFees={
              <>
                <InvestmentItem
                  label={
                    <TooltipLabel
                      tooltipContent={t("fund-details-page:tooltip.entry-fee")}
                      labelText={t("asset-details:description.entryFee")}
                    />
                  }
                >
                  <NumberFormat
                    value={formatValue(fundDescription.entryFeeCurrent)}
                    displayType="text"
                    suffix=" %"
                  />
                </InvestmentItem>
                <InvestmentItem
                  label={
                    <TooltipLabel
                      tooltipContent={t("fund-details-page:tooltip.exit-fee")}
                      labelText={t("asset-details:description.exitFee")}
                    />
                  }
                >
                  <NumberFormat
                    value={formatValue(fundDescription.exitFeeCurrent)}
                    displayType="text"
                    suffix=" %"
                  />
                </InvestmentItem>
              </>
            }
            assetLogo={fundDescription.publicInfo.logoUrl}
            infoMessage={hasTradingSchedule ? infoMessage : undefined}
            disabled={!canInvest}
            title={fundDescription.publicInfo.title}
            onApply={onApply}
            size={"xlarge"}
            ownAsset={isOwnProgram}
            entryFee={fundDescription.entryFeeCurrent}
            type={ASSET.FUND}
            id={fundDescription.id}
          />
        </DetailsStatisticContainer>
      </Row>
    </DefaultBlock>
  );
};

interface Props {
  AssetDetailsExtraBlock: React.ComponentType<any>;
  hasTradingSchedule?: boolean;
  infoMessage?: string;
  fundDescription: FundDetailsFull;
  onApply: () => any;
}

const InvestmentFundControls = React.memo(_InvestmentFundControls);
export default InvestmentFundControls;
