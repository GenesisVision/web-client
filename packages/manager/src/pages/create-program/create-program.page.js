import "./create-program.page.scss";

import React from "react";
import { translate } from "react-i18next";

import CreateProgramContainer from "./components/create-program.container";

export const CREATE_PROGRAM_PAGE_ROUTE = "/create-program";

const CreateProgramPage = ({ t }) => (
  <div className="create-program-page">
    <div className="create-program-page__header">
      <h1>{t("manager.create-program-page.title")}</h1>
    </div>
    <CreateProgramContainer />
  </div>
);

export default translate()(CreateProgramPage);
