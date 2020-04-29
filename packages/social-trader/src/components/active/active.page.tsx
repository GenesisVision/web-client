import Page from "components/page/page";
import { AssetInfo } from "gv-api-web";
import React from "react";

import Active from "./active";
import { getActiveLoaderData } from "./service/active.service";

const _ActivePage: React.FC<Props> = ({ data }) => {
  return (
    <Page
      description={data.description}
      previewImage={data.logoUrl}
      title={data.name}
    >
      <Active loaderData={getActiveLoaderData} data={data} />
    </Page>
  );
};

interface Props {
  data: AssetInfo;
}

const ActivePage = React.memo(_ActivePage);
export default ActivePage;
