import DashboardBlock from "pages/dashboard/components/dashboard-block/dashboard-block";
import DashboardPublicCard from "pages/dashboard/components/dashboard-trading/dashboard-public-card";
import { TAsset } from "pages/dashboard/dashboard.types";
import React from "react";
import { useTranslation } from "react-i18next";
import { withBlurLoader } from "shared/decorators/with-blur-loader";

const _DashboardPublic: React.FC<Props> = ({ data }) => {
  const [t] = useTranslation();
  return (
    <DashboardBlock
      label={t("dashboard-page.trading.public")}
      all={""}
      seeAll={false}
    >
      <div className="dashboard-trading__public-cards">
        {data.map(card => (
          <DashboardPublicCard asset={card} />
        ))}
      </div>
    </DashboardBlock>
  );
};

interface Props {
  data: TAsset[];
}

const DashboardPublic = withBlurLoader(React.memo(_DashboardPublic));
export default DashboardPublic;
