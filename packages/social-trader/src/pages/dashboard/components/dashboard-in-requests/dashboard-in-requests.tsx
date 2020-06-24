import RequestLine from "components/request-line/request-line";
import { withBlurLoader } from "decorators/with-blur-loader";
import { TDashboardInRequests } from "pages/dashboard/dashboard.types";
import React from "react";

import styles from "./dashboard-in-requests.module.scss";

const _DashboardInRequests: React.FC<Props> = ({ data, updateData }) => {
  return (
    <div className={styles["dashboard-in-requests"]}>
      {data.map(request => (
        <RequestLine request={request} onApplyCancelRequest={updateData} />
      ))}
    </div>
  );
};

interface Props {
  updateData: () => void;
  data: TDashboardInRequests;
}

const DashboardInRequests = withBlurLoader(React.memo(_DashboardInRequests));
export default DashboardInRequests;
