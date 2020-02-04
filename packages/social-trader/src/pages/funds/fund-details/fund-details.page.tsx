import * as React from "react";
import { useSelector } from "react-redux";

import FundDetailsContainer from "./fund-details.container";
import { fundDescriptionSelector } from "./reducers/description.reducer";

const _FundDetailsPage: React.FC = () => {
  const description = useSelector(fundDescriptionSelector);
  return <FundDetailsContainer data={description!} />;
};

const FundDetailsPage = React.memo(_FundDetailsPage);
export default FundDetailsPage;
