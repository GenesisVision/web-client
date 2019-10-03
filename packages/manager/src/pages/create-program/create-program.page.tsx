import "./create-program.page.scss";

import * as React from "react";
import { useTranslation } from "react-i18next";
import Page from "shared/components/page/page";

import CreateProgramContainer from "./components/create-program.container";

const _CreateProgramPage: React.FC = () => {
  const [t] = useTranslation();
  return (
    <Page title={t("manager.create-program-page.title")}>
      <CreateProgramContainer />
    </Page>
  );
};

const CreateProgramPage = React.memo(_CreateProgramPage);
export default CreateProgramPage;
