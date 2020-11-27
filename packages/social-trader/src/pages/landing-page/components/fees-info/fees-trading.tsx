import clsx from "clsx";
import ImageBaseElement from "components/avatar/image-base.element";
import { useTranslation } from "i18n";
import {
  FeesTradingDiscountInfo,
  FeesTradingDiscountTable
} from "pages/landing-page/components/fees-info/fees-trading-discount";
import React from "react";

import styles from "./fees-info.module.scss";

interface Props {
  className?: string;
}

const _FeesTrading: React.FC<Props> = () => {
  const { t } = useTranslation();
  return (
    <div className={styles["fees-info"]}>
      <div className={styles["fees-info__section"]}>
        <div className={styles["fees-info__container"]}>
          <div
            className={clsx(
              styles["fees-info__notes"],
              styles["fees-info__notes--withoutOffset"]
            )}
          >
            <h3>{t("fees:commission")}</h3>
            <ul className={styles["fees-info__list-notes"]}>
              <li className={styles["fees-info__note-item"]}>
                {t("fees:list-3-item-1")}{" "}
                <a
                  href="https://www.binance.com/en/fee/schedule"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("fees:list-3-link")}
                </a>
              </li>
              <li className={styles["fees-info__note-item"]}>
                {t("fees:list-3-item-2")}
              </li>
            </ul>
          </div>
          <FeesTradingDiscountInfo />
          <FeesTradingDiscountTable />
        </div>
      </div>
    </div>
  );
};

const FeesTrading = React.memo(_FeesTrading);
export default FeesTrading;
