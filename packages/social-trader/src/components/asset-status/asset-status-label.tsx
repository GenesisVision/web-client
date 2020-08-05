import clsx from "clsx";
import { STATUS } from "constants/constants";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { OptionalClickable } from "utils/types";

import styles from "./asset-status.module.scss";

const getStatusClassName = (status: STATUS, className?: string) =>
  clsx(styles["asset-status"], className, {
    [styles["asset-status__active"]]: status === STATUS.ACTIVE,
    [styles["asset-status__investing"]]: status === STATUS.INVESTING,
    [styles["asset-status__withdrawing"]]: status === STATUS.WITHDRAWING,
    [styles["asset-status__ended"]]: status === STATUS.ENDED,
    [styles["asset-status__pending"]]: status === STATUS.PENDING
  });

const _AssetStatusLabel: React.FC<Props> = ({ className, status, onClick }) => {
  const [t] = useTranslation();
  return (
    <span className={getStatusClassName(status, className)} onClick={onClick}>
      {t(`asset-details:program-statuses.${status}`)}
    </span>
  );
};

interface Props extends OptionalClickable {
  status: STATUS;
  className?: string;
}

const AssetStatusLabel = React.memo(_AssetStatusLabel);
export default AssetStatusLabel;
