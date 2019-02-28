import "./gvt-fees.scss";

import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import Dialog from "shared/components/dialog/dialog";
import { ROLE } from "shared/constants/constants";

interface IGVTFees {
  open: boolean;
  onClose(): void;
  role: string;
}

const GVTFees: React.FC<IGVTFees & InjectedTranslateProps> = ({
  t,
  open,
  onClose,
  role
}) => {
  return (
    <Dialog wider open={open} onClose={onClose} className="gvt-fees">
      <div className="gvt-fees__container">
        <h1>{t("gvt-fees.titles.main")}</h1>
        <p className="gvt-fees__paragraph">{t("gvt-fees.section.text-1")}</p>
        {role === ROLE.INVESTOR ? (
          <p className="gvt-fees__paragraph">{t("gvt-fees.section.text-2")}</p>
        ) : null}
        <div className="gvt-fees__table-wrapper">
          <table className="gvt-fees__table">
            <thead>
              <tr>
                <th className="gvt-fees__table-head">
                  {t("gvt-fees.table-header.amount")}
                </th>
                <th className="gvt-fees__table-head">
                  {t("gvt-fees.table-header.discount")}
                </th>
                <th className="gvt-fees__table-head">
                  {t("gvt-fees.table-header.fees")}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="gvt-fees__table-value">
                  {t("gvt-fees.table-row-1.amount")}
                </td>
                <td className="gvt-fees__table-value">
                  {t("gvt-fees.table-row-1.discount")}
                </td>
                <td className="gvt-fees__table-value">
                  {t("gvt-fees.table-row-1.fees")}
                </td>
              </tr>
              <tr>
                <td className="gvt-fees__table-value">
                  {t("gvt-fees.table-row-2.amount")}
                </td>
                <td className="gvt-fees__table-value">
                  {t("gvt-fees.table-row-2.discount")}
                </td>
                <td className="gvt-fees__table-value">
                  {t("gvt-fees.table-row-2.fees")}
                </td>
              </tr>
              <tr>
                <td className="gvt-fees__table-value">
                  {t("gvt-fees.table-row-3.amount")}
                </td>
                <td className="gvt-fees__table-value">
                  {t("gvt-fees.table-row-3.discount")}
                </td>
                <td className="gvt-fees__table-value">
                  {t("gvt-fees.table-row-3.fees")}
                </td>
              </tr>
              <tr>
                <td className="gvt-fees__table-value">
                  {t("gvt-fees.table-row-4.amount")}
                </td>
                <td className="gvt-fees__table-value">
                  {t("gvt-fees.table-row-4.discount")}
                </td>
                <td className="gvt-fees__table-value">
                  {t("gvt-fees.table-row-4.fees")}
                </td>
              </tr>
              <tr>
                <td className="gvt-fees__table-value">
                  {t("gvt-fees.table-row-5.amount")}
                </td>
                <td className="gvt-fees__table-value">
                  {t("gvt-fees.table-row-5.discount")}
                </td>
                <td className="gvt-fees__table-value">
                  {t("gvt-fees.table-row-5.fees")}
                </td>
              </tr>
              <tr>
                <td className="gvt-fees__table-value">
                  {t("gvt-fees.table-row-6.amount")}
                </td>
                <td className="gvt-fees__table-value">
                  {t("gvt-fees.table-row-6.discount")}
                </td>
                <td className="gvt-fees__table-value">
                  {t("gvt-fees.table-row-6.fees")}
                </td>
              </tr>
            </tbody>
          </table>
          <p className="gvt-fees__paragraph">{t("gvt-fees.note")}</p>
        </div>
      </div>
    </Dialog>
  );
};
export default translate()(GVTFees);
