import "./create-program.page.scss";

import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import Page from "shared/components/page/page";

import CreateProgramContainer from "./components/create-program.container";

export const CREATE_PROGRAM_PAGE_ROUTE = "/create-program";

const _CreateProgramPage: React.FC<InjectedTranslateProps> = ({ t }) => (
  <Page title={t("manager.create-program-page.title")}>
    <div className="create-program-page">
      <div className="create-program-page__header">
        <h1>{t("manager.create-program-page.title")}</h1>
      </div>
      <CreateProgramContainer />
    </div>
  </Page>
);

const CreateProgramPage = translate()(_CreateProgramPage);
export default CreateProgramPage;
