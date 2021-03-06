import { InvestmentItem } from "components/details/details-description-section/details-investment/investment-item";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import * as React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";

interface Props {
    volumeFee: number;
    successFee: number;
}

const _FollowFeesBlock: React.FC<Props> = ({ volumeFee, successFee }) => {
    const [t] = useTranslation();
    return (
        <>
            <InvestmentItem
                label={
                    <TooltipLabel
                        tooltipContent={t(
                            "program-details-page:tooltip.success-fee-signal"
                        )}
                        labelText={t("asset-details:description.successFee")}
                    />
                }
            >
                <NumberFormat value={successFee} displayType="text" suffix=" %" />
            </InvestmentItem>
            <InvestmentItem
                label={
                    <TooltipLabel
                        tooltipContent={t("program-details-page:tooltip.volume-fee")}
                        labelText={t("asset-details:description.volume-fee")}
                    />
                }
            >
                <NumberFormat value={volumeFee} displayType="text" suffix=" %" />
            </InvestmentItem>
        </>
    );
};

const FollowFeesBlock = React.memo(_FollowFeesBlock);
export default FollowFeesBlock;
