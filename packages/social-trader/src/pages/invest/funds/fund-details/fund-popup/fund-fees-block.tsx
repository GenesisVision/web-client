import { InvestmentItem } from "components/details/details-description-section/details-investment/investment-item";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import * as React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { formatValue } from "utils/formatter";

interface Props {
    entryFee: number;
    exitFee: number;
}

const _FundFeesBlock: React.FC<Props> = ({ entryFee, exitFee }) => {
    const [t] = useTranslation();
    return (
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
                    value={formatValue(entryFee)}
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
                    value={formatValue(exitFee)}
                    displayType="text"
                    suffix=" %"
                />
            </InvestmentItem>
        </>
    );
};

const FundFeesBlock = React.memo(_FundFeesBlock);
export default FundFeesBlock;
