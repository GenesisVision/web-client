import "components/create-asset/create-asset.scss";

import { Broker } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import Page from "shared/components/page/page";

import CreateProgramContainer from "./components/create-program.container";

const _CreateProgramPage: React.FC<Props> = ({ brokers }) => {
  const [t] = useTranslation();
  return (
    <Page title={t("manager.create-program-page.title")}>
      <CreateProgramContainer brokers={brokers} />
    </Page>
  );
};

interface Props {
  brokers: Broker[];
}

const CreateProgramPage = React.memo(_CreateProgramPage);
export default CreateProgramPage;
