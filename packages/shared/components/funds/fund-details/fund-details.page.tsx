import "shared/components/details/details.scss";

import * as React from "react";
import { useEffect } from "react";
import { ResolveThunks, connect, useSelector } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import DetailsContainerTextLoader from "shared/components/details/details.contaner.txt-loader";

import FundDetailsContainer from "./fund-details.container";
import { IDescriptionSection } from "./fund-details.types";
import { fundDescriptionSelector } from "./reducers/description.reducer";
import { dispatchFundDescription } from "./services/fund-details.service";

const _FundDetailsPage: React.FC<Props> = ({
  service: { dispatchFundDescription },
  descriptionSection
}) => {
  const description = useSelector(fundDescriptionSelector);
  useEffect(
    () => {
      dispatchFundDescription();
    },
    [dispatchFundDescription]
  );
  return (
    <FundDetailsContainer
      condition={!!description}
      loader={<DetailsContainerTextLoader assets />}
      descriptionSection={descriptionSection}
      description={description!}
    />
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators(
    {
      dispatchFundDescription
    },
    dispatch
  )
});

interface OwnProps {
  descriptionSection: IDescriptionSection;
}

interface ServiceThunks extends ActionCreatorsMapObject {
  dispatchFundDescription: typeof dispatchFundDescription;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface Props extends OwnProps, DispatchProps {}

const FundDetailsPage = compose<React.ComponentType<OwnProps>>(
  connect(
    null,
    mapDispatchToProps
  ),
  React.memo
)(_FundDetailsPage);
export default FundDetailsPage;
