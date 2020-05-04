import classNames from "classnames";
import { useTranslation } from "i18n";
import React from "react";

import styles from "./fees-info.module.scss";

const _FeesTradingDiscount: React.FC<{
  dark?: boolean;
  white?: boolean;
}> = ({ dark, white }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className={styles["fees-info__notes"]}>
        <p>{t("fees.text-3")}</p>
        <h3>{t("fees.trading-discount")}</h3>
        <ul
          className={classNames(styles["fees-info__list-notes"], {
            [styles["fees-info__list-notes--dark"]]: dark
          })}
        >
          {t("fees.list-4")
            .split("\n")
            .map((line, index) => (
              <li key={index} className={styles["fees-info__note-item"]}>
                {line}
              </li>
            ))}
        </ul>
      </div>
      <div className={styles["fees-info__notes"]}>
        <h4>{t("fees.conditions")}</h4>
        <div className={styles["fees-info__table-wrapper"]}>
          <table
            className={classNames(styles["fees-table"], {
              [styles["fees-table--dark"]]: dark,
              [styles["fees-table--white-head"]]: white
            })}
          >
            <thead className={styles["fees-table__head"]}>
              <tr className={styles["fees-table__row"]}>
                <th
                  className={classNames(
                    styles["fees-table__cell"],
                    styles["fees-table__cell--width-bg"]
                  )}
                >
                  {t("fees.wallet")}
                </th>
                <th className={styles["fees-table__cell"]}>
                  {t("fees.amount")}
                </th>
              </tr>
            </thead>
            <tbody>
              {t("fees.discounts-table")
                .split("\n")
                .map((row, index) => (
                  <tr key={index} className={styles["fees-table__row"]}>
                    {row.split("\t").map((line, index) => (
                      <td key={index} className={styles["fees-table__cell"]}>
                        {line}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const FeesTradingDiscount = React.memo(_FeesTradingDiscount);
export default FeesTradingDiscount;
