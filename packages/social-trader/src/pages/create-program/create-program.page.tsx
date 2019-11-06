import "components/create-asset/create-asset.scss";

import * as React from "react";
import { useTranslation } from "react-i18next";
import Page from "shared/components/page/page";

import CreateProgramContainer from "./components/create-program.container";

const _CreateProgramPage: React.FC<Props> = () => {
  const [t] = useTranslation();
  return (
    <Page title={t("create-program-page.title")}>
      <CreateProgramContainer />
    </Page>
  );
};

interface Props {}

const CreateProgramPage = React.memo(_CreateProgramPage);
export default CreateProgramPage;
