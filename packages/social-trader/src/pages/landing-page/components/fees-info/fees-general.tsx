import clsx from "clsx";
import { FundAssetCurrencyItem } from "components/fund-asset/fund-asset.styles";
import { Text } from "components/text/text";
import { Themes } from "components/trading-view/trading-view";
import { PlatformWithdrawalInfo } from "gv-api-web";
import { useTranslation } from "i18n";
import { Done } from "pages/landing-page/components/common-icons/done";
import React from "react";

import styles from "./fees-info.module.scss";

interface ICommissions {
  blockchain: string;
  value: number;
}

interface Props {
  platformWithdrawalInfo: Array<PlatformWithdrawalInfo>;
}

const _FeesGeneral: React.FC<Props> = ({ platformWithdrawalInfo }) => {
  const { t } = useTranslation();
  return (
    <div className={styles["fees-info"]}>
      <div className={styles["fees-info__section"]}>
        <div className={styles["fees-info__container"]}>
          <div className={styles["fees-info__wrapper"]}>
            <h2 className={styles["fees-info__title"]}>
              {t("fees:investing-fees")}
            </h2>
          </div>
          <div className={styles["fees-info__table-wrapper"]}>
            <table className={styles["fees-table"]}>
              <thead className={styles["fees-table__head"]}>
                <tr className={styles["fees-table__row"]}>
                  {t("fees:platform-table-head")
                    .split("\t")
                    .map((line, index) => (
                      <th
                        key={index}
                        className={clsx(
                          styles["fees-table__cell"],
                          styles["fees-table__cell--width-quarter"]
                        )}
                      >
                        {line}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                <tr className={styles["fees-table__row"]}>
                  <td className={styles["fees-table__cell"]} colSpan={4}>
                    <Text size={"large"} weight={"bold"}>
                      {t("fees:platform-fee")}
                    </Text>
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
                    <b>&mdash;</b>
                  </td>
                </tr>
                <tr className={styles["fees-table__row"]}>
                  <td className={styles["fees-table__cell"]} colSpan={4}>
                    <Text size={"large"} weight={"bold"}>
                      {t("fees:manager-fee")}
                    </Text>
                  </td>
                </tr>
                <tr className={styles["fees-table__row"]}>
                  <td className={styles["fees-table__cell"]}>
                    {t("fees:management-fee")}
                  </td>
                  <td className={styles["fees-table__cell"]}>
                    {t("fees:management-fee-number")}
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
                </tr>
                <tr className={styles["fees-table__row"]}>
                  <td className={styles["fees-table__cell"]}>
                    {t("fees:success-fee")}
                  </td>
                  <td className={styles["fees-table__cell"]}>
                    {t("fees:manager-success-fee-number")}
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
                </tr>
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
                    {t("fees:exit-fee")}
                  </td>
                  <td className={styles["fees-table__cell"]}>
                    {t("fees:exit-fee-number")}
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
              </tbody>
            </table>
          </div>
          <div className={styles["fees-info__notes"]}>
            <h3>{t("fees:platform-fee-2")}</h3>
            <ul className={styles["fees-info__list-notes"]}>
              {t("fees:gv-commission-list-1")
                .split("\n")
                .map((line, index) => (
                  <li key={index} className={styles["fees-info__note-item"]}>
                    {line.split("\t").map((subline, index) =>
                      !index ? (
                        <Text size={"large"} weight={"bold"}>
                          {subline}
                        </Text>
                      ) : (
                        <>{subline}</>
                      )
                    )}
                  </li>
                ))}
              <li
                className={clsx(
                  styles["fees-info__note-item"],
                  styles["fees-info__note-item--star"]
                )}
              >
                {t("fees:list-last-item-1")}{" "}
                <Text wrap={false} size={"large"}>
                  {t("fees:1000-gvt")}
                </Text>
                {t("fees:list-last-item-2")}{" "}
                <Text wrap={false} size={"large"}>
                  {t("fees:1000-gvt")}
                </Text>
                {t("fees:list-last-item-3")}{" "}
                <Text wrap={false} size={"large"}>
                  {t("fees:10000-gvt")}
                </Text>
                {t("fees:list-last-item-4")}
              </li>
            </ul>
          </div>
          <div className={styles["fees-info__notes"]}>
            <h3>{t("fees:manager-fee-2")}</h3>
            <ul className={styles["fees-info__list-notes"]}>
              {t("fees:manager-fee-list-1")
                .split("\n")
                .map((line, index) => (
                  <li key={index} className={styles["fees-info__note-item"]}>
                    {line.split("\t").map((subline, index) =>
                      !index ? (
                        <Text size={"large"} weight={"bold"}>
                          {subline}
                        </Text>
                      ) : (
                        <>{subline}</>
                      )
                    )}
                  </li>
                ))}
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
              {t("fees:trading-fees")}
            </h2>
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
                  {t("fees:trading-table-head")
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
                    {t("fees:trading-fee")}
                  </td>
                  <td className={styles["fees-table__cell"]}>
                    {t("fees:trading-fee-number")}
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
                    {<Done />}
                  </td>
                </tr>
                <tr className={styles["fees-table__row"]}>
                  <td className={styles["fees-table__cell"]}>
                    {t("fees:success-fee")}
                  </td>
                  <td className={styles["fees-table__cell"]}>
                    {t("fees:trading-success-fee-number")}
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
                    {t("fees:volume-fee")}
                  </td>
                  <td className={styles["fees-table__cell"]}>
                    {t("fees:volume-fee-number")}
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
                    {t("fees:gv-commission")}
                  </td>
                  <td className={styles["fees-table__cell"]}>
                    {t("fees:trading-gv-commission-number")}
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
              </tbody>
            </table>
          </div>
          <div className={styles["fees-info__notes"]}>
            <ul className={styles["fees-info__list-notes"]}>
              {t("fees:trading-fees-list")
                .split("\n")
                .map((line, index) => (
                  <li key={index} className={styles["fees-info__note-item"]}>
                    {line.split("\t").map((subline, index) =>
                      !index ? (
                        <Text size={"large"} weight={"bold"}>
                          {subline}
                        </Text>
                      ) : (
                        <>{subline}</>
                      )
                    )}
                  </li>
                ))}
              <li className={styles["fees-info__note-item"]}>
                {t("fees:trading-fees-list-last-item")
                  .split("\n")
                  .map((line, index) => (
                    <div key={index}>
                      {line.split("\t").map(subline =>
                        subline === t("fees:gv-commission") ? (
                          <Text size={"large"} weight={"bold"}>
                            {subline}
                          </Text>
                        ) : (
                          <>{subline}</>
                        )
                      )}
                    </div>
                  ))}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles["fees-info__section"]}>
        <div className={styles["fees-info__container"]}>
          <div className={styles["fees-info__wrapper"]}>
            <h2 className={styles["fees-info__title"]}>
              {t("fees:withdrawal-fee")}
            </h2>
            <p className={styles["fees-info__text"]}>{t("fees:text-2")}</p>
          </div>
          <div className={styles["fees-info__table-wrapper"]}>
            <table className={styles["fees-table"]}>
              <thead className={styles["fees-table__head"]}>
                <tr className={styles["fees-table__row"]}>
                  {t("fees:withdrawal-table-head")
                    .split("\t")
                    .map((line, index) => (
                      <th
                        key={index}
                        className={clsx(
                          styles["fees-table__cell"],
                          styles["fees-table__cell--width-quarter"]
                        )}
                      >
                        {line}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {platformWithdrawalInfo.map((info, key) =>
                  info.commissions.map(
                    (commission: ICommissions, index: number) => (
                      <tr
                        key={`${key}_${index}`}
                        className={styles["fees-table__row"]}
                      >
                        {!index && (
                          <td
                            className={styles["fees-table__cell"]}
                            rowSpan={info.commissions.length}
                          >
                            <FundAssetCurrencyItem
                              logo={info.logoUrl}
                              small
                              name={info.currency}
                              symbol={info.currency}
                              type={"short"}
                              clickable={false}
                              theme={Themes.LIGHT}
                            />
                          </td>
                        )}
                        {!index && (
                          <td
                            className={styles["fees-table__cell"]}
                            rowSpan={info.commissions.length}
                          >
                            {info.title}
                          </td>
                        )}
                        <td
                          className={
                            styles[
                              "fees-table__cell fees-table__cell--normal-weight"
                            ]
                          }
                        >
                          {commission.blockchain}
                        </td>
                        <td className={styles["fees-table__cell"]}>
                          {commission.value}
                        </td>
                      </tr>
                    )
                  )
                )}
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
