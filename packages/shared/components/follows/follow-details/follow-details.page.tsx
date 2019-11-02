import "shared/components/details/details.scss";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import FollowDetailsContainer from "./follow-details.contaner";
import { IDescriptionSection } from "./follow-details.types";
import {
  followDescriptionSelector,
  followIdSelector
} from "./reducers/description.reducer";
import { dispatchFollowDescription } from "./services/follow-details.service";

const _FollowDetailsPage: React.FC<Props> = ({ descriptionSection }) => {
  const id = useSelector(followIdSelector);
  const description = useSelector(followDescriptionSelector);
  useEffect(() => {
    dispatchFollowDescription(id)();
  }, []);
  return (
    <FollowDetailsContainer
      descriptionSection={descriptionSection}
      data={description!}
    />
  );
};

interface Props {
  descriptionSection: IDescriptionSection;
}

const FollowDetailsPage = React.memo(_FollowDetailsPage);
export default FollowDetailsPage;
