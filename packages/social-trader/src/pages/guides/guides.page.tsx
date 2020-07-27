import GuidesContainer from "components/guides/guides.container";
import Page from "components/page/page";
import { guidesSelector } from "pages/guides/reducers/guides.reducers";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const _GuidesPage: React.FC = () => {
  const [t] = useTranslation();
  const title = t("guides:title");
  const data = useSelector(guidesSelector);

  if (!data) return null;

  return (
    <Page title={title}>
      <GuidesContainer navGuides={data.items} />
    </Page>
  );
};

const GuidesPage = React.memo(_GuidesPage);
export default GuidesPage;
