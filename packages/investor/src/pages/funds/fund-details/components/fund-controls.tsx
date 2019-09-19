import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { IFundControlsProps } from "shared/components/funds/fund-details/fund-details.types";

import InvestmentFundControls from "./investment-fund-controls";

const _FundControls: React.FC<IFundControlsProps & WithTranslation> = ({
  fundDescription,
  isAuthenticated
}) => (
  <div className="asset-details-description__controls">
    <InvestmentFundControls
      fundDescription={fundDescription}
      isAuthenticated={isAuthenticated}
    />
  </div>
);

const FundControls = translate()(React.memo(_FundControls));
export default FundControls;
