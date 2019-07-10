import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { IFundControlsProps } from "shared/components/funds/fund-details/fund-details.types";

import InvestmentFundControls from "./investment-fund-controls";

const _FundControls: React.FC<IFundControlsProps & WithTranslation> = ({
  fundDescription,
  isAuthenticated,
  redirectToLogin
}) => (
  <div className="program-details-description__controls">
    <div className="program-details-description__col program-details-description__col--small-size">
      <InvestmentFundControls
        fundDescription={fundDescription}
        isAuthenticated={isAuthenticated}
        redirectToLogin={redirectToLogin}
      />
    </div>
  </div>
);

const FundControls = translate()(React.memo(_FundControls));
export default FundControls;
