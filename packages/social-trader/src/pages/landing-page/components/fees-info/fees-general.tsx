import { useTranslation } from "i18n";
import { Done } from "pages/landing-page/components/common-icons/done";
import React from "react";

const _FeesGeneral: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="fees-info">
      <div className="fees-info__section">
        <div className="internal__container">
          <div className="fees-info__wrapper">
            <h2 className="fees-info__title">{t("fees.platform-fee")}</h2>
          </div>
          <div className="fees-info__table-wrapper">
            <div className="fees-info__table-wrapper">
              <table className="fees-table ">
                <thead className="fees-table__head">
                  <tr className="fees-table__row">
                    {t("fees.platform-table-head")
                      .split("\t")
                      .map((line, index) => (
                        <th key={index} className="fees-table__cell">
                          {line}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="fees-table__row">
                    <td className="fees-table__cell">{t("fees.entry-fee")}</td>
                    <td className="fees-table__cell">
                      {t("fees.entry-fee-number")}
                    </td>
                    <td className="fees-table__cell fees-table__cell--color-primary">
                      <span>{<Done />}</span>
                    </td>
                    <td className="fees-table__cell fees-table__cell--color-primary">
                      <b>&mdash;</b>
                    </td>
                    <td className="fees-table__cell fees-table__cell--color-primary">
                      {<Done />}
                    </td>
                  </tr>
                  <tr className="fees-table__row">
                    <td className="fees-table__cell">
                      {t("fees.success-fee")}
                    </td>
                    <td className="fees-table__cell">
                      {t("fees.success-fee-number")}
                    </td>
                    <td className="fees-table__cell fees-table__cell--color-primary">
                      {<Done />}
                    </td>
                    <td className="fees-table__cell fees-table__cell--color-primary">
                      {<Done />}
                    </td>
                    <td className="fees-table__cell fees-table__cell--color-primary">
                      <b>&mdash;</b>
                    </td>
                  </tr>
                  <tr className="fees-table__row">
                    <td className="fees-table__cell">
                      {t("fees.gv-commission")}
                    </td>
                    <td className="fees-table__cell">
                      {t("fees.gv-commission-number")}
                    </td>
                    <td className="fees-table__cell fees-table__cell--color-primary">
                      <b>&mdash;</b>
                    </td>
                    <td className="fees-table__cell fees-table__cell--color-primary">
                      {<Done />}
                    </td>
                    <td className="fees-table__cell fees-table__cell--color-primary">
                      <b>&mdash;</b>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="fees-info__notes">
            <ul className="fees-info__list-notes">
              {t("fees.list-1")
                .split("\n")
                .map((line, index) => (
                  <li key={index} className="fees-info__note-item">
                    {line}
                  </li>
                ))}
              <li className="fees-info__note-item fees-info__note-item--star">
                {t("fees.list-last-item")}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="fees-info__section--bg-gray fees-info__section">
        <div className="internal__container">
          <div className="fees-info__wrapper">
            <h2 className="fees-info__title">{t("fees.withdrawal-fee")}</h2>
            <p className="fees-info__text">{t("fees.text-2")}</p>
          </div>
          <div className="fees-info__table-wrapper">
            <table className="fees-table fees-table--white-head">
              <thead className="fees-table__head">
                <tr className="fees-table__row">
                  {t("fees.withdrawal-table-head")
                    .split("\t")
                    .map((line, index) => (
                      <th key={index} className="fees-table__cell">
                        {line}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                <tr className="fees-table__row">
                  {t("fees.withdrawal-table-row")
                    .split("\t")
                    .map((line, index) => (
                      <td key={index} className="fees-table__cell">
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
