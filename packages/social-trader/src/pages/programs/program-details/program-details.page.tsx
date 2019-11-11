import { statisticCurrencyAction } from "pages/programs/program-details/actions/program-details.actions";
import ProgramDetailsContainer from "pages/programs/program-details/components/program-details.contaner";
import { programDescriptionSelector } from "pages/programs/program-details/reducers/description.reducer";
import {
  dispatchPlatformLevelsParameters,
  dispatchProgramDescription
} from "pages/programs/program-details/service/program-details.service";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const _ProgramDetailsPage: React.FC = () => {
  const dispatch = useDispatch();
  const description = useSelector(programDescriptionSelector);
  useEffect(() => {
    dispatch(dispatchProgramDescription());
  }, []);
  useEffect(() => {
    if (!description) return;
    dispatch(dispatchPlatformLevelsParameters(description.currency));
    dispatch(statisticCurrencyAction(description.currency));
  }, [description]);
  return <ProgramDetailsContainer data={description!} />;
};

const ProgramDetailsPage = React.memo(_ProgramDetailsPage);
export default ProgramDetailsPage;
