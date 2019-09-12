import "shared/components/details/details.scss";

import React, { useEffect } from "react";
import { ResolveThunks, connect, useSelector } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import DetailsContainerLoader from "shared/components/details/details.contaner.loader";
import {
  dispatchPlatformLevelsParameters,
  dispatchProgramDescription
} from "shared/components/programs/program-details/services/program-details.service";

import ProgramDetailsContainer from "./program-details.contaner";
import { IDescriptionSection } from "./program-details.types";
import { programDescriptionSelector } from "./reducers/description.reducer";

const _ProgramDetailsPage: React.FC<Props> = ({
  service: { dispatchProgramDescription, dispatchPlatformLevelsParameters },
  descriptionSection
}) => {
  const description = useSelector(programDescriptionSelector);
  useEffect(() => {
    dispatchProgramDescription();
  }, []);
  useEffect(
    () => {
      description && dispatchPlatformLevelsParameters(description.currency);
    },
    [description]
  );
  return (
    <ProgramDetailsContainer
      condition={!!description}
      loader={<DetailsContainerLoader />}
      descriptionSection={descriptionSection}
      description={description!}
    />
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      dispatchProgramDescription,
      dispatchPlatformLevelsParameters
    },
    dispatch
  )
});

interface OwnProps {
  descriptionSection: IDescriptionSection;
}
interface ServiceThunks extends ActionCreatorsMapObject {
  dispatchProgramDescription: typeof dispatchProgramDescription;
  dispatchPlatformLevelsParameters: typeof dispatchPlatformLevelsParameters;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface Props extends OwnProps, DispatchProps {}

const ProgramDetailsPage = compose<React.ComponentType<OwnProps>>(
  connect(
    null,
    mapDispatchToProps
  ),
  React.memo
)(_ProgramDetailsPage);
export default ProgramDetailsPage;
