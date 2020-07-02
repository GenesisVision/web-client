import clsx from "clsx";
import { useTranslation } from "i18n";
import { Done } from "pages/landing-page/components/common-icons/done";
import React from "react";

import styles from "./fees-info.module.scss";

const _FeesGeneral: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={styles["fees-info"]}>
      <div className={styles["fees-info__section"]}>
        <div className={styles["fees-info__container"]}>
          <div className={styles["fees-info__wrapper"]}>
            <h2 className={styles["fees-info__title"]}>
              {t("fees:platform-fee")}
            </h2>
          </div>
          <div className={styles["fees-info__table-wrapper"]}>
            <table className={styles["fees-table"]}>
              <thead className={styles["fees-table__head"]}>
                <tr className={styles["fees-table__row"]}>
                  {t("fees:platform-table-head")
                    .split("\t")
                    .map((line, index) => (
                      <th key={index} className={styles["fees-table__cell"]}>
                        {line}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                <tr className={styles["fees-table__row"]}>
                  <td className={styles["fees-table__cell"]}>
                    {t("fees:entry-fee")}
                  </td>
                  <td className={styles["fees-table__cell"]}>
                    {t("fees:entry-fee-number")}
                  </td>
                  <td
                    className={clsx(
                      styles["fees-table__cell"],
                      styles["fees-table__cell--color-primary"]
                    )}
                  >
                    <span>{<Done />}</span>
                  </td>
                  <td
                    className={clsx(
                      styles["fees-table__cell"],
                      styles["fees-table__cell--color-primary"]
                    )}
                  >
                    <b>&mdash;</b>
                  </td>
                  <td
                    className={clsx(
                      styles["fees-table__cell"],
                      styles["fees-table__cell--color-primary"]
                    )}
                  >
                    {<Done />}
                  </td>
                </tr>
                <tr className={styles["fees-table__row"]}>
                  <td className={styles["fees-table__cell"]}>
                    {t("fees:success-fee")}
                  </td>
                  <td className={styles["fees-table__cell"]}>
                    {t("fees:success-fee-number")}
                  </td>
                  <td
                    className={clsx(
                      styles["fees-table__cell"],
                      styles["fees-table__cell--color-primary"]
                    )}
                  >
                    {<Done />}
                  </td>
                  <td
                    className={clsx(
                      styles["fees-table__cell"],
                      styles["fees-table__cell--color-primary"]
                    )}
                  >
                    {<Done />}
                  </td>
                  <td
                    className={clsx(
                      styles["fees-table__cell"],
                      styles["fees-table__cell--color-primary"]
                    )}
                  >
                    <b>&mdash;</b>
                  </td>
                </tr>
                <tr className={styles["fees-table__row"]}>
                  <td className={styles["fees-table__cell"]}>
                    {t("fees:gv-commission")}
                  </td>
                  <td className={styles["fees-table__cell"]}>
                    {t("fees:gv-commission-number")}
                  </td>
                  <td
                    className={clsx(
                      styles["fees-table__cell"],
                      styles["fees-table__cell--color-primary"]
                    )}
                  >
                    <b>&mdash;</b>
                  </td>
                  <td
                    className={clsx(
                      styles["fees-table__cell"],
                      styles["fees-table__cell--color-primary"]
                    )}
                  >
                    {<Done />}
                  </td>
                  <td
                    className={clsx(
                      styles["fees-table__cell"],
                      styles["fees-table__cell--color-primary"]
                    )}
                  >
                    <b>&mdash;</b>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles["fees-info__notes"]}>
            <ul className={styles["fees-info__list-notes"]}>
              {t("fees:list-1")
                .split("\n")
                .map((line, index) => (
                  <li key={index} className={styles["fees-info__note-item"]}>
                    {line}
                  </li>
                ))}
              <li
                className={clsx(
                  styles["fees-info__note-item"],
                  styles["fees-info__note-item--star"]
                )}
              >
                {t("fees:list-last-item")}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        className={clsx(
          styles["fees-info__section--bg-gray"],
          styles["fees-info__section"]
        )}
      >
        <div className={styles["fees-info__container"]}>
          <div className={styles["fees-info__wrapper"]}>
            <h2 className={styles["fees-info__title"]}>
              {t("fees:withdrawal-fee")}
            </h2>
            <p className={styles["fees-info__text"]}>{t("fees:text-2")}</p>
          </div>
          <div className={styles["fees-info__table-wrapper"]}>
            <table
              className={clsx(
                styles["fees-table"],
                styles["fees-table--white-head"]
              )}
            >
              <thead className={styles["fees-table__head"]}>
                <tr className={styles["fees-table__row"]}>
                  {t("fees:withdrawal-table-head")
                    .split("\t")
                    .map((line, index) => (
                      <th key={index} className={styles["fees-table__cell"]}>
                        {line}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                <tr className={styles["fees-table__row"]}>
                  {t("fees:withdrawal-table-row")
                    .split("\t")
                    .map((line, index) => (
                      <td key={index} className={styles["fees-table__cell"]}>
                        {line}
                      </td>
                    ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeesGeneral = React.memo(_FeesGeneral);
export default FeesGeneral;
