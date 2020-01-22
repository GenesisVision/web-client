import Page from "components/page/page";
import * as React from "react";
import { useTranslation } from "react-i18next";

import AttachAccountContainer from "./components/attach-account.container";

const _AttachAccountPage: React.FC<Props> = ({ requestBrokerName }) => {
  const [t] = useTranslation();
  return (
    <Page showTitle title={t("attach-account-page.title")}>
      <AttachAccountContainer requestBrokerName={requestBrokerName} />
    </Page>
  );
};

interface Props {
  requestBrokerName?: string;
}

const AttachAccountPage = React.memo(_AttachAccountPage);

export default AttachAccountPage;
