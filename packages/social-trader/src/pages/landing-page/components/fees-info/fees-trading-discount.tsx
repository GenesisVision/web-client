import classNames from "classnames";
import { useTranslation } from "i18n";
import React from "react";

const _FeesTradingDiscount: React.FC<{
  dark?: boolean;
  white?: boolean;
}> = ({ dark, white }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="fees-info__notes">
        <p>{t("fees.text-3")}</p>
        <h3>{t("fees.trading-discount")}</h3>
        <ul
          className={classNames("fees-info__list-notes", {
            "fees-info__list-notes--dark": dark
          })}
        >
          {t("fees.list-4")
            .split("\n")
            .map((line, index) => (
              <li key={index} className="fees-info__note-item">
                {line}
              </li>
            ))}
        </ul>
      </div>
      <div className="fees-info__notes">
        <h4>{t("fees.conditions")}</h4>
        <div className="fees-info__table-wrapper">
          <table
            className={classNames("fees-table", {
              "fees-table--dark": dark,
              "fees-table--white-head": white
            })}
          >
            <thead className="fees-table__head">
              <tr className="fees-table__row">
                <th className="fees-table__cell fees-table__cell--width-bg">
                  {t("fees.wallet")}
                </th>
                <th className="fees-table__cell">{t("fees.amount")}</th>
              </tr>
            </thead>
            <tbody>
              {t("fees.discounts-table")
                .split("\n")
                .map((row, index) => (
                  <tr key={index} className="fees-table__row">
                    {row.split("\t").map((line, index) => (
                      <td key={index} className="fees-table__cell">
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
