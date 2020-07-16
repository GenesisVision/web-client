import clsx from "clsx";
import { TInfoList } from "pages/landing-page/static-data/info";
import React from "react";

import InfoItem from "./info-item";
import styles from "./info-list.module.scss";

interface Props extends TInfoList {
  className?: string;
}

const _InfoList: React.FC<Props> = ({ className, listItems }) => (
  <ul className={clsx(styles["info-list"], className)}>
    {listItems.map((item, index) => (
      <InfoItem
        key={index}
        texts={item.texts}
        image={item.image}
        button={item.button}
      />
    ))}
  </ul>
);

const InfoList = React.memo(_InfoList);
export default InfoList;
