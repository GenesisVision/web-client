import GuidesContainer from "components/guides/guides.container";
import Page from "components/page/page";
import { GuidesCategory } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";

const _GuidesPage: React.FC<Props> = ({ guides }) => {
  const [t] = useTranslation();
  const title = t("guides:title");
  return (
    <Page title={title}>
      <GuidesContainer navGuides={guides} />
    </Page>
  );
};

interface Props {
  guides: GuidesCategory[];
}

const GuidesPage = React.memo(_GuidesPage);
export default GuidesPage;
