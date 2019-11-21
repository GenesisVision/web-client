import "./gvt-fees.scss";

import Dialog from "components/dialog/dialog";
import useRole from "hooks/use-role.hook";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { ROLE } from "shared/constants/constants";

const _GVTFees: React.FC<Props> = ({ open, onClose }) => {
  const [t] = useTranslation();
  const role = useRole();
  return (
    <Dialog open={open} onClose={onClose} className="gvt-fees">
      <div className="gvt-fees__container">
        <h1>{t("gvt-fees.titles.main")}</h1>
        <p className="gvt-fees__paragraph">{t("gvt-fees.section.text-1")}</p>
        {role === ROLE.INVESTOR ? (
          <p className="gvt-fees__paragraph">{t("gvt-fees.section.text-2")}</p>
        ) : null}
        {role === ROLE.MANAGER ? (
          <p className="gvt-fees__paragraph">{t("gvt-fees.section.text-3")}</p>
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
        </div>
      </div>
    </Dialog>
  );
};

interface Props {
  open: boolean;
  onClose(): void;
}
const GVTFees = React.memo(_GVTFees);
export default GVTFees;
