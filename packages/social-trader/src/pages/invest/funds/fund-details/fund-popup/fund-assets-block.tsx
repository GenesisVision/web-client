import FundAssetContainer, {
    FundAssetType
} from "components/fund-asset/fund-asset-container";
import { Row } from "components/row/row";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import * as React from "react";
import { useTranslation } from "react-i18next";

interface Props {
    assets: Array<FundAssetType>;
    canExpand?: boolean;
}

const _FundAssetsBlock: React.FC<Props> = ({ assets, canExpand }) => {
    const [t] = useTranslation();
    return (
        <>
            <h4>
                <TooltipLabel
                    tooltipContent={t("fund-details-page:tooltip.assets")}
                    labelText={t("asset-details:description.assets")}
                />
            </h4>
            <Row>
                <FundAssetContainer
                    canExpand={canExpand}
                    type={"large"}
                    assets={assets}
                    size={7}
                />
            </Row>
        </>
    );
};

const FundAssetsBlock = React.memo(_FundAssetsBlock);
export default FundAssetsBlock;
