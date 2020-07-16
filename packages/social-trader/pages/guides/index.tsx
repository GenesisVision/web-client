import withDefaultLayout from "decorators/with-default-layout";
import { GuidesCategory } from "gv-api-web";
import { NextPage } from "next";
import GuidesPage from "pages/guides/guides.page";
import React from "react";
import { compose } from "redux";
import { api } from "services/api-client/swagger-custom-client";

const Page: NextPage<Props> = ({ guides }) => {
  return <GuidesPage guides={guides} />;
};

Page.getInitialProps = async () => {
  let guides;
  await api
    .guides()
    .getGuides()
    .then(({ items }) => {
      guides = items;
    });
  return { namespacesRequired: ["guides"], guides };
};

interface Props {
  guides: GuidesCategory[];
}

export default compose(withDefaultLayout)(Page);
