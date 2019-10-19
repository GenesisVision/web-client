import React from "react";
import { useTranslation } from "react-i18next";

const _DashboardFailChart: React.FC<{ errorMessage: string }> = ({
  errorMessage
}) => {
  const [t] = useTranslation();
  return (
    <div className="get-started">
      <h1>{t(`dashboard-page.fail-chart`)}</h1>
      <div className="get-started__text">
        <div>{errorMessage}</div>
      </div>
    </div>
  );
};

const DashboardFailChart = React.memo(_DashboardFailChart);
export default DashboardFailChart;
