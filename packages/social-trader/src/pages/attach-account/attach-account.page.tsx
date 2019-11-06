import "components/create-asset/create-asset.scss";

import * as React from "react";
import { useTranslation } from "react-i18next";
import Page from "shared/components/page/page";

import AttachAccountContainer from "./components/attach-account.container";

const _AttachAccountPage: React.FC = ({}) => {
  const [t] = useTranslation();
  return (
    <Page title={t("attach-account-page.title")}>
      <AttachAccountContainer />
    </Page>
  );
};

const AttachAccountPage = React.memo(_AttachAccountPage);

export default AttachAccountPage;
