import "components/create-asset/create-asset.scss";

import { Broker } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import Page from "shared/components/page/page";

import CreateAccountContainer from "./components/create-account.container";

const _CreateAccountPage: React.FC<Props> = ({ brokers }) => {
  const [t] = useTranslation();
  return (
    <Page title={t("create-account-page.title")}>
      <CreateAccountContainer brokers={brokers} />
    </Page>
  );
};

interface Props {
  brokers: Broker[];
}
const CreateAccountPage = React.memo(_CreateAccountPage);
export default CreateAccountPage;
