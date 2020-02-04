import GuidesContent from "components/guides";
import Page from "components/page/page";
import withDefaultLayout from "decorators/with-default-layout";
import React from "react";
import { useTranslation } from "react-i18next";
import { compose } from "redux";

const GuidesPage: React.FC = () => {
  const [t] = useTranslation();
  const title = t("global-search-page.title");
  return (
    <Page title={title}>
      <GuidesContent />
    </Page>
  );
};

export const Guides = compose(withDefaultLayout)(GuidesPage);
