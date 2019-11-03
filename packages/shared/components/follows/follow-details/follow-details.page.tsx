import "shared/components/details/details.scss";

import React from "react";
import { useSelector } from "react-redux";

import FollowDetailsContainer from "./follow-details.contaner";
import { IDescriptionSection } from "./follow-details.types";
import { followDescriptionSelector } from "./reducers/description.reducer";

const _FollowDetailsPage: React.FC<Props> = ({ descriptionSection }) => {
  const description = useSelector(followDescriptionSelector);
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
