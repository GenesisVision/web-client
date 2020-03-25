import { ManagerData } from "components/manager/components/manager-data";
import { ManagerInfo } from "components/manager/components/manager-info";
import { getManagerSchema } from "components/manager/manager.schema";
import Page from "components/page/page";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import Crashable from "decorators/crashable";
import { PublicProfile } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import filesService from "services/file-service";

import "./manager.page.scss";

const _ManagerPage: React.FC<Props> = ({ profile }) => {
  const [t] = useTranslation();
  const title = `${t("manager-page.title")} ${profile.username}`;
  return (
    <Page
      title={title}
      schemas={[getManagerSchema(profile)]}
      description={profile.about || title}
      previewImage={filesService.getFileUrl(profile.avatar)}
    >
      <Row className="manager-page__container" center={false} wide>
        <RowItem className="manager-page__info" bottomOffset>
          <ManagerInfo profile={profile} />
        </RowItem>
        <RowItem className="manager-page__data" bottomOffset>
          <ManagerData id={profile.id} />
        </RowItem>
      </Row>
    </Page>
  );
};

interface Props {
  profile: PublicProfile;
}

const ManagerPage = React.memo(Crashable(_ManagerPage));
export default ManagerPage;
