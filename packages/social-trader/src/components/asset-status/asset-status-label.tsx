import classNames from "classnames";
import { STATUS } from "constants/constants";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

import styles from "./asset-status.module.scss";

const getStatusClassName = (status: STATUS, className?: string) =>
  classNames(styles["asset-status"], className, {
    [styles["asset-status__active"]]: status === STATUS.ACTIVE,
    [styles["asset-status__investing"]]: status === STATUS.INVESTING,
    [styles["asset-status__withdrawing"]]: status === STATUS.WITHDRAWING,
    [styles["asset-status__ended"]]: status === STATUS.ENDED,
    [styles["asset-status__pending"]]: status === STATUS.PENDING
  });

const _AssetStatusLabel: React.FC<Props> = ({
  className,
  status,
  t,
  onClick
}) => (
  <span className={getStatusClassName(status, className)} onClick={onClick}>
    {t(`program-statuses.${status}`)}
  </span>
);

interface Props extends WithTranslation {
  status: STATUS;
  onClick?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  className?: string;
}

const AssetStatusLabel = translate()(React.memo(_AssetStatusLabel));
export default AssetStatusLabel;
