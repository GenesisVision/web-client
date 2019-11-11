import "shared/components/details/details.scss";

import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import FundDetailsContainer from "./fund-details.container";
import { fundDescriptionSelector } from "./reducers/description.reducer";
import { dispatchFundDescription } from "./services/fund-details.service";

const _FundDetailsPage: React.FC = () => {
  const dispatch = useDispatch();
  const description = useSelector(fundDescriptionSelector);
  useEffect(() => {
    dispatch(dispatchFundDescription());
  }, []);
  return <FundDetailsContainer data={description!} />;
};

const FundDetailsPage = React.memo(_FundDetailsPage);
export default FundDetailsPage;
