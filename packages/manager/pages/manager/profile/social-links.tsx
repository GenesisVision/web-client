import React from "react";
import { compose } from "redux";
import withDefaultLayout from "shared/decorators/with-default-layout";
import withPrivateRoute from "shared/decorators/with-private-route";
import SocialLinksPage from "pages/profile/social-links/social-links.page";

const Page: React.FC = () => {
  return <SocialLinksPage />;
};

export default compose(
  withDefaultLayout,
  withPrivateRoute
)(Page);
