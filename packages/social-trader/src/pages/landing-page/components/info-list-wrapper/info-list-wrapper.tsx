import InfoList from "pages/landing-page/components/info-list/info-list";
import { TInfoList } from "pages/landing-page/static-data/info";
import React from "react";

import styles from "./info-list-wrapper.module.scss";

interface Props {
  currentInfoList: TInfoList;
}

const _InfoListWrapper: React.FC<Props> = ({ currentInfoList }) => (
  <div className={styles["info-list-wrapper"]}>
    <InfoList id={currentInfoList.id} listItems={currentInfoList.listItems} />
  </div>
);

const InfoListWrapper = React.memo(_InfoListWrapper);
export default InfoListWrapper;
