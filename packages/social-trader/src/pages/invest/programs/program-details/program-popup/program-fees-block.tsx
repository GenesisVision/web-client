import { InvestmentItem } from "components/details/details-description-section/details-investment/investment-item";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import * as React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { formatValue } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

interface Props {
    currency: CurrencyEnum;
    managementFee: number;
    successFee: number;
    stopOut: number;
}

const ProgramFeesBlock: React.FC<Props> = ({
    currency,
    managementFee,
    successFee,
    stopOut
}) => {
    const [t] = useTranslation();
    return (
        <>
            <InvestmentItem
                label={
                    <TooltipLabel
                        tooltipContent={t("asset-details:description.tooltips.currency")}
                        labelText={t("asset-details:description.currency")}
                    />
                }
            >
                {currency}
            </InvestmentItem>
            <InvestmentItem
                label={
                    <TooltipLabel
                        tooltipContent={t("program-details-page:tooltip.management-fee")}
                        labelText={t("asset-details:description.management-fee")}
                    />
                }
            >
                <NumberFormat
                    value={formatValue(managementFee)}
                    displayType="text"
                    suffix=" %"
                />
            </InvestmentItem>
            <InvestmentItem
                label={
                    <TooltipLabel
                        tooltipContent={t("program-details-page:tooltip.success-fee")}
                        labelText={t("asset-details:description.successFee")}
                    />
                }
            >
                <NumberFormat
                    value={formatValue(successFee)}
                    displayType="text"
                    suffix=" %"
                />
            </InvestmentItem>
            <InvestmentItem
                label={
                    <TooltipLabel
                        tooltipContent={t("program-details-page:tooltip.stop-out-level")}
                        labelText={t("asset-details:description.stop-out-level")}
                    />
                }
            >
                <NumberFormat
                    value={formatValue(stopOut)}
                    displayType="text"
                    suffix=" %"
                />
            </InvestmentItem>
        </>
    );
};

export default ProgramFeesBlock;
