import "./create-program.page.scss";

import React from "react";
import { translate } from "react-i18next";

import CreateProgramContainer from "./create-program.container";

const CreateProgramPage = ({ t }) => (
  <div className="create-program-page">
    <div className="create-program-page__header">
      <h1 className="app__title-page">{t("create-program-page.title")}</h1>
    </div>
    <CreateProgramContainer />
  </div>
);

export default translate()(CreateProgramPage);
