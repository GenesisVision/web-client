import "./active.scss";

import Page from "components/page/page";
import { AssetInfo } from "gv-api-web";
import React from "react";
import filesService from "services/file-service";

import Active from "./active";
import { getActiveLoaderData } from "./service/active.service";

const _ActivePage: React.FC<Props> = ({ data }) => {
  return (
    <Page
      description={data.description}
      previewImage={filesService.getFileUrl(data.logo)}
      title={data.name}
    >
      <div className="active-page">
        <Active loaderData={getActiveLoaderData} data={data} />
      </div>
    </Page>
  );
};

interface Props {
  data: AssetInfo;
}

const ActivePage = React.memo(_ActivePage);
export default ActivePage;
