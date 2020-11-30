import Page from "components/page/page";
import ProgramNotificationsContainer from "modules/program-notifications/program-notifications-container";
import * as React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  id: string;
}

const _ProgramNotificationPage: React.FC<Props> = ({ id }) => {
  const [t] = useTranslation();
  return (
    <Page showTitle title={t("notifications-page:program.title")}>
      <ProgramNotificationsContainer id={id} />
    </Page>
  );
};

const ProgramNotificationPage = React.memo(_ProgramNotificationPage);
export default ProgramNotificationPage;
