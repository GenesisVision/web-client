import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { statisticCurrencyAction } from "./actions/program-details.actions";
import ProgramDetailsContainer from "./program-details.contaner";
import { programDescriptionSelector } from "./reducers/description.reducer";
import { dispatchPlatformLevelsParameters } from "./service/program-details.service";

const _ProgramDetailsPage: React.FC = () => {
  const dispatch = useDispatch();
  const description = useSelector(programDescriptionSelector);
  useEffect(() => {
    if (!description) return;
    const { currency } = description.tradingAccountInfo;
    dispatch(dispatchPlatformLevelsParameters(currency));
    dispatch(statisticCurrencyAction(currency));
  }, [description]);
  return <ProgramDetailsContainer data={description!} />;
};

const ProgramDetailsPage = React.memo(_ProgramDetailsPage);
export default ProgramDetailsPage;
