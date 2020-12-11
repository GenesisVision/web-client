import GuidesSection from "components/guides/guides-section/guides-section";
import Page from "components/page/page";
import { navGuides } from "pages/guides/guides.static-data";
import React from "react";
import { useTranslation } from "react-i18next";

const _GuidesPage: React.FC = () => {
  const [t] = useTranslation();
  const title = t("guides:title");

  return (
    <Page title={title}>
      <GuidesSection navGuides={navGuides} />
    </Page>
  );
};

const GuidesPage = React.memo(_GuidesPage);
export default GuidesPage;
