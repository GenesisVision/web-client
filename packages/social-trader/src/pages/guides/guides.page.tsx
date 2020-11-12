import GuidesContainer from "components/guides/guides.container";
import Page from "components/page/page";
import React from "react";
import { useTranslation } from "react-i18next";

const _GuidesPage: React.FC = () => {
  const [t] = useTranslation();
  const title = t("guides:title");

  return (
    <Page title={title}>
      <GuidesContainer />
    </Page>
  );
};

const GuidesPage = React.memo(_GuidesPage);
export default GuidesPage;
