import GuidesContainer from "components/guides/guides.container";
import {
  fetchGuides,
  passGuide
} from "components/guides/services/guides.services";
import Page from "components/page/page";
import useApiRequest from "hooks/api-request.hook";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

const _GuidesPage: React.FC = () => {
  const [t] = useTranslation();
  const title = t("guides:title");
  const { data: navGuides, sendRequest: getGuides } = useApiRequest({
    fetchOnMount: true,
    request: fetchGuides
  });

  const { sendRequest: setPassingGuide } = useApiRequest({
    middleware: [getGuides],
    request: passGuide
  });

  const handlePass = useCallback(id => {
    setPassingGuide(id);
  }, []);

  if (!navGuides) return null;

  return (
    <Page title={title}>
      <GuidesContainer navGuides={navGuides} onClickPass={handlePass} />
    </Page>
  );
};

const GuidesPage = React.memo(_GuidesPage);
export default GuidesPage;
