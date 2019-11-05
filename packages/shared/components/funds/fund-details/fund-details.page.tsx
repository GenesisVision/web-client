import "shared/components/details/details.scss";

import * as React from "react";
import { useEffect } from "react";
import { connect, ResolveThunks, useSelector } from "react-redux";
import {
  ActionCreatorsMapObject,
  bindActionCreators,
  compose,
  Dispatch
} from "redux";

import FundDetailsContainer from "./fund-details.container";
import { fundDetailsLoaderData } from "./fund-details.loader-data";
import { IDescriptionSection } from "./fund-details.types";
import { fundDescriptionSelector } from "./reducers/description.reducer";
import { dispatchFundDescription } from "./services/fund-details.service";

const _FundDetailsPage: React.FC<Props> = ({
  service: { dispatchFundDescription },
  descriptionSection
}) => {
  const description = useSelector(fundDescriptionSelector);
  console.info(description);
  useEffect(() => {
    dispatchFundDescription();
  }, [dispatchFundDescription]);
  return (
    <FundDetailsContainer
      loaderData={fundDetailsLoaderData}
      descriptionSection={descriptionSection}
      data={description!}
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
