import FollowDetailsContainer from "pages/follows/follow-details/follow-details.contaner";
import React from "react";
import { useSelector } from "react-redux";

import { followDescriptionSelector } from "./reducers/description.reducer";

const _FollowDetailsPage: React.FC = () => {
  const description = useSelector(followDescriptionSelector);
  return <FollowDetailsContainer data={description!} />;
};

const FollowDetailsPage = React.memo(_FollowDetailsPage);
export default FollowDetailsPage;
