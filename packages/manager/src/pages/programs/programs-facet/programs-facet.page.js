import Page from "shared/components/page/page";
import React from "react";
import { translate } from "react-i18next";

import ProgramsFacetContainer from "./components/programs-facet/programs-facet-container";

const ProgramsFacetPage = ({ t }) => (
  <Page title={t("programs-page.title")}>
    <ProgramsFacetContainer />
  </Page>
);
export default translate()(ProgramsFacetPage);
