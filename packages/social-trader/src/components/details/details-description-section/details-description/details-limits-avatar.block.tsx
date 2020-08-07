import ProfileAvatar from "components/avatar/profile-avatar/profile-avatar";
import DetailsAssetAvatar from "components/details/details-description-section/details-description/details-asset-avatar";
import { DETAILS_TYPE } from "components/details/details.types";
import * as React from "react";
import { CurrencyEnum } from "utils/types";

import styles from "./details-description.module.scss";

interface Props {
  detailsType: DETAILS_TYPE;
  logo: string;
  title: string;
  color?: string;
  level?: number;
  levelProgress?: number;
  totalAvailableInvestment?: number;
  currency?: CurrencyEnum;
}

const _DetailsLimitsAvatar: React.FC<Props> = props => {
  const { detailsType, logo, title } = props;
  return (
    <div className={styles["details-description__avatar"]}>
      {detailsType === DETAILS_TYPE.ASSET ? (
        <DetailsAssetAvatar {...props} />
      ) : (
        <ProfileAvatar big url={logo} alt={title} />
      )}
    </div>
  );
};

export const DetailsLimitsAvatar = React.memo(_DetailsLimitsAvatar);
