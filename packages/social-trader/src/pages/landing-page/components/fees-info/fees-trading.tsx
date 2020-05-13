import classNames from "classnames";
import ImageBaseElement from "components/avatar/image-base.element";
import { useTranslation } from "i18n";
import FeesTradingDiscount from "pages/landing-page/components/fees-info/fees-trading-discount";
import CHFlag from "pages/landing-page/images/flags/ch.png";
import ESFlag from "pages/landing-page/images/flags/es.png";
import FRFlag from "pages/landing-page/images/flags/fr.png";
import GBFlag from "pages/landing-page/images/flags/gb.png";
import GEFlag from "pages/landing-page/images/flags/ge.png";
import HKFlag from "pages/landing-page/images/flags/hk.png";
import JPFlag from "pages/landing-page/images/flags/jp.png";
import NLFlag from "pages/landing-page/images/flags/nl.png";
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
          <div className={styles["fees-info__wrapper"]}>
            <h2 className={styles["fees-info__title"]}>{t("fees.crypto")}</h2>
          </div>
          <div className={styles["fees-info__table-wrapper"]}>
            <table className={styles["fees-table"]}>
              <thead className={styles["fees-table__head"]}>
                <tr className={styles["fees-table__row"]}>
                  <th
                    className={classNames(
                      styles["fees-table__cell"],
                      styles["fees-table__cell--width-bg"]
                    )}
                  >
                    {t("fees.amount")}
                  </th>
                  <th className={styles["fees-table__cell"]}>
                    {t("fees.discount")}
                  </th>
                  <th className={styles["fees-table__cell"]}>
                    {t("fees.fees")}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className={styles["fees-table__row"]}>
                  {t("fees.crypto-table-row-1")
                    .split("\t")
                    .map((line, index) => (
                      <td key={index} className={styles["fees-table__cell"]}>
                        {line}
                      </td>
                    ))}
                </tr>
                <tr className={styles["fees-table__row"]}>
                  {t("fees.crypto-table-row-2")
                    .split("\t")
                    .map((line, index) => (
                      <td key={index} className={styles["fees-table__cell"]}>
                        {line}
                      </td>
                    ))}
                </tr>
                <tr className={styles["fees-table__row"]}>
                  {t("fees.crypto-table-row-3")
                    .split("\t")
                    .map((line, index) => (
                      <td key={index} className={styles["fees-table__cell"]}>
                        {line}
                      </td>
                    ))}
                </tr>
                <tr className={styles["fees-table__row"]}>
                  {t("fees.crypto-table-row-4")
                    .split("\t")
                    .map((line, index) => (
                      <td key={index} className={styles["fees-table__cell"]}>
                        {line}
                      </td>
                    ))}
                </tr>
                <tr className={styles["fees-table__row"]}>
                  {t("fees.crypto-table-row-5")
                    .split("\t")
                    .map((line, index) => (
                      <td key={index} className={styles["fees-table__cell"]}>
                        {line}
                      </td>
                    ))}
                </tr>
                <tr className={styles["fees-table__row"]}>
                  {t("fees.crypto-table-row-6")
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
          <div className={styles["fees-info__notes"]}>
            <h3>{t("fees.commission")}</h3>
            <ul className={styles["fees-info__list-notes"]}>
              {t("fees.list-2")
                .split("\n")
                .map((line, index) => (
                  <li key={index} className={styles["fees-info__note-item"]}>
                    {line}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
      <div
        className={classNames(
          styles["fees-info__section"],
          styles["fees-info__section--bg-gray"]
        )}
      >
        <div className={styles["fees-info__container"]}>
          <div className={styles["fees-info__wrapper"]}>
            <h2 className={styles["fees-info__title"]}>{t("fees.global")}</h2>
          </div>
          <div
            className={classNames(
              styles["fees-info__table-wrapper"],
              styles["fees-info__table-wrapper--bg-white"]
            )}
          >
            <table className={styles["fees-table"]}>
              <thead className={styles["fees-table__head"]}>
                <tr className={styles["fees-table__row"]}>
                  {t("fees.global-table-head-1")
                    .split("\t")
                    .map((line, index) => (
                      <td key={index} className={styles["fees-table__cell"]}>
                        {line}
                      </td>
                    ))}
                </tr>
                <tr className={styles["fees-table__row"]}>
                  <th
                    className={classNames(
                      styles["fees-table__cell"],
                      styles["fees-table__cell--white"]
                    )}
                  />
                  <th
                    className={classNames(
                      styles["fees-table__cell"],
                      styles["fees-table__cell--white"]
                    )}
                  />
                  <th
                    className={classNames(
                      styles["fees-table__cell"],
                      styles["fees-table__cell--colspan"]
                    )}
                    colSpan={7}
                  >
                    {t("fees.global-table-head-2")}
                  </th>
                </tr>
                <tr className={styles["fees-table__row"]}>
                  <th
                    className={classNames(
                      styles["fees-table__cell"],
                      styles["fees-table__cell--white"]
                    )}
                  />
                  <th
                    className={classNames(
                      styles["fees-table__cell"],
                      styles["fees-table__cell--white"]
                    )}
                  />
                  <th
                    className={classNames(
                      styles["fees-table__cell"],
                      styles["fees-table__cell--white"]
                    )}
                  />
                  <th
                    className={classNames(
                      styles["fees-table__cell"],
                      styles["fees-table__cell--colspan"]
                    )}
                    colSpan={6}
                  >
                    {t("fees.global-table-head-3")}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className={styles["fees-table__row"]}>
                  <td
                    className={classNames(
                      styles["fees-table__cell"],
                      styles["fees-table__cell--without-border"]
                    )}
                  >
                    {t("fees.forex")}
                  </td>
                  {t("fees.global-table-row-1")
                    .split("\t")
                    .map((line, index) => (
                      <td
                        key={index}
                        className={styles["fees-table__cell"]}
                        rowSpan={4}
                      >
                        {line}
                      </td>
                    ))}
                </tr>
                <tr className={styles["fees-table__row"]}>
                  <td
                    className={classNames(
                      styles["fees-table__cell"],
                      styles["fees-table__cell--without-border"]
                    )}
                  >
                    {t("fees.spot-metals")}
                  </td>
                </tr>
                <tr className={styles["fees-table__row"]}>
                  <td
                    className={classNames(
                      styles["fees-table__cell"],
                      styles["fees-table__cell--without-border"]
                    )}
                  >
                    {t("fees.index")}
                  </td>
                </tr>
                <tr className={styles["fees-table__row"]}>
                  <td className={styles["fees-table__cell"]}>
                    {t("fees.spot-commodities")}
                  </td>
                </tr>
                <tr className={styles["fees-table__row"]}>
                  {t("fees.global-table-row-2")
                    .split("\t")
                    .map((line, index) => (
                      <td key={index} className={styles["fees-table__cell"]}>
                        {line}
                      </td>
                    ))}
                </tr>
                <tr className={styles["fees-table__row"]}>
                  {t("fees.global-table-row-3")
                    .split("\t")
                    .map((line, index) => (
                      <td key={index} className={styles["fees-table__cell"]}>
                        {line}
                      </td>
                    ))}
                </tr>
                <tr className={styles["fees-table__row"]}>
                  <td className={styles["fees-table__cell"]}>
                    {t("fees.shares-eu")}
                  </td>
                  <td className={styles["fees-table__cell"]} />
                  <td className={styles["fees-table__cell"]} />
                  <td className={styles["fees-table__cell"]} />
                  <td className={styles["fees-table__cell"]} />
                  <td className={styles["fees-table__cell"]} />
                  <td className={styles["fees-table__cell"]} />
                  <td className={styles["fees-table__cell"]} />
                  <td className={styles["fees-table__cell"]} />
                </tr>
                <tr className={styles["fees-table__row"]}>
                  <td
                    className={classNames(
                      styles["fees-table__cell"],
                      styles["fees-table__cell--without-border"]
                    )}
                  >
                    <ImageBaseElement
                      className={styles["fees-table__flag-img"]}
                      src={GBFlag}
                      alt={t("fees.uk")}
                    />{" "}
                    {t("fees.uk")}
                  </td>
                  <td className={styles["fees-table__cell"]} rowSpan={6}>
                    {t("fees.order-volume")}
                  </td>
                  {t("fees.global-table-row-4")
                    .split("\t")
                    .map((line, index) => (
                      <td key={index} className={styles["fees-table__cell"]}>
                        {line}
                      </td>
                    ))}
                </tr>
                <tr className={styles["fees-table__row"]}>
                  <td
                    className={classNames(
                      styles["fees-table__cell"],
                      styles["fees-table__cell--without-border"]
                    )}
                  >
                    <ImageBaseElement
                      className={styles["fees-table__flag-img"]}
                      src={GEFlag}
                      alt={t("fees.germane")}
                    />{" "}
                    {t("fees.germane")}
                  </td>
                  {t("fees.global-table-row-5")
                    .split("\t")
                    .map((line, index) => (
                      <td key={index} className={styles["fees-table__cell"]}>
                        {line}
                      </td>
                    ))}
                </tr>
                <tr className={styles["fees-table__row"]}>
                  <td
                    className={classNames(
                      styles["fees-table__cell"],
                      styles["fees-table__cell--without-border"]
                    )}
                  >
                    <ImageBaseElement
                      className={styles["fees-table__flag-img"]}
                      src={CHFlag}
                      alt={t("fees.switzerland")}
                    />{" "}
                    {t("fees.switzerland")}
                  </td>
                  {t("fees.global-table-row-6")
                    .split("\t")
                    .map((line, index) => (
                      <td key={index} className={styles["fees-table__cell"]}>
                        {line}
                      </td>
                    ))}
                </tr>
                <tr className={styles["fees-table__row"]}>
                  <td
                    className={classNames(
                      styles["fees-table__cell"],
                      styles["fees-table__cell--without-border"]
                    )}
                  >
                    <ImageBaseElement
                      className={styles["fees-table__flag-img"]}
                      src={FRFlag}
                      alt={t("fees.france")}
                    />{" "}
                    {t("fees.france")}
                  </td>
                  {t("fees.global-table-row-7")
                    .split("\t")
                    .map((line, index) => (
                      <td key={index} className={styles["fees-table__cell"]}>
                        {line}
                      </td>
                    ))}
                </tr>
                <tr className={styles["fees-table__row"]}>
                  <td
                    className={classNames(
                      styles["fees-table__cell"],
                      styles["fees-table__cell--without-border"]
                    )}
                  >
                    <ImageBaseElement
                      className={styles["fees-table__flag-img"]}
                      src={ESFlag}
                      alt={t("fees.spain")}
                    />{" "}
                    {t("fees.spain")}
                  </td>
                  {t("fees.global-table-row-8")
                    .split("\t")
                    .map((line, index) => (
                      <td key={index} className={styles["fees-table__cell"]}>
                        {line}
                      </td>
                    ))}
                </tr>
                <tr className={styles["fees-table__row"]}>
                  <td className={styles["fees-table__cell"]}>
                    {" "}
                    <ImageBaseElement
                      className={styles["fees-table__flag-img"]}
                      src={NLFlag}
                      alt={t("fees.netherlands")}
                    />{" "}
                    {t("fees.netherlands")}
                  </td>
                  {t("fees.global-table-row-9")
                    .split("\t")
                    .map((line, index) => (
                      <td key={index} className={styles["fees-table__cell"]}>
                        {line}
                      </td>
                    ))}
                </tr>
                <tr className={styles["fees-table__row"]}>
                  {t("fees.global-table-row-10")
                    .split("\t")
                    .map((line, index) => (
                      <td key={index} className={styles["fees-table__cell"]}>
                        {line}
                      </td>
                    ))}
                </tr>
                <tr className={styles["fees-table__row"]}>
                  <td className={styles["fees-table__cell"]}>
                    {t("fees.shares-asia")}
                  </td>
                  <td className={styles["fees-table__cell"]} />
                  <td className={styles["fees-table__cell"]} />
                  <td className={styles["fees-table__cell"]} />
                  <td className={styles["fees-table__cell"]} />
                  <td className={styles["fees-table__cell"]} />
                  <td className={styles["fees-table__cell"]} />
                  <td className={styles["fees-table__cell"]} />
                  <td className={styles["fees-table__cell"]} />
                </tr>
                <tr className={styles["fees-table__row"]}>
                  <td
                    className={classNames(
                      styles["fees-table__cell"],
                      styles["fees-table__cell--without-border"]
                    )}
                  >
                    <ImageBaseElement
                      className={styles["fees-table__flag-img"]}
                      src={HKFlag}
                      alt={t("fees.hong-kong")}
                    />{" "}
                    {t("fees.hong-kong")}
                  </td>
                  <td className={styles["fees-table__cell"]} rowSpan={6}>
                    {t("fees.order-volume")}
                  </td>
                  {t("fees.global-table-row-11")
                    .split("\t")
                    .map((line, index) => (
                      <td key={index} className={styles["fees-table__cell"]}>
                        {line}
                      </td>
                    ))}
                </tr>
                <tr className={styles["fees-table__row"]}>
                  <td className={styles["fees-table__cell"]}>
                    <ImageBaseElement
                      className={styles["fees-table__flag-img"]}
                      src={JPFlag}
                      alt={t("fees.japan")}
                    />{" "}
                    {t("fees.japan")}
                  </td>
                  {t("fees.global-table-row-12")
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
          <div className={styles["fees-info__notes"]}>
            <h3>{t("fees.commission")}</h3>
            <ul className={styles["fees-info__list-notes"]}>
              {t("fees.list-3")
                .split("\n")
                .map((line, index) => (
                  <li key={index} className={styles["fees-info__note-item"]}>
                    {line}
                  </li>
                ))}
            </ul>
          </div>
          <FeesTradingDiscount white />
        </div>
      </div>
    </div>
  );
};

const FeesTrading = React.memo(_FeesTrading);
export default FeesTrading;
