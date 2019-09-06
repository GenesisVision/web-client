import CopytradingTablesSection from "modules/copytrading-tables/components/copytrading-tables-section";
import React from "react";

interface IDashboardTradesProps {
  title: string;
}

const DashboardTrades: React.FC<IDashboardTradesProps> = ({ title }) => {
  return <CopytradingTablesSection title={title} />;
};

export default DashboardTrades;
