import "components/create-asset/create-asset.scss";

import * as React from "react";
import { useTranslation } from "react-i18next";
import Page from "shared/components/page/page";

import CreateProgramContainer from "./components/create-program.container";
import { Broker } from "gv-api-web";

const _CreateProgramPage: React.FC<Props> = ({brokers}) => {
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
