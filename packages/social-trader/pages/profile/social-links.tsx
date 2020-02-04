import withDefaultLayout from "decorators/with-default-layout";
import withPrivateRoute from "decorators/with-private-route";
import SocialLinksPage from "pages/profile/social-links/social-links.page";
import React from "react";
import { compose } from "redux";

const Page: React.FC = () => {
  return <SocialLinksPage />;
};

export default compose(withDefaultLayout, withPrivateRoute)(Page);
