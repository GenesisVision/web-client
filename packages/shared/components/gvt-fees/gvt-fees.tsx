import "./gvt-fees.scss";

import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import Dialog from "shared/components/dialog/dialog";
import { ROLE } from "shared/constants/constants";
import withRole, { WithRoleProps } from "shared/decorators/with-role";

const _GVTFees: React.FC<Props> = ({ role, t, open, onClose }) => (
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

interface Props extends OwnProps, WithTranslation, WithRoleProps {}

interface OwnProps {
  open: boolean;
  onClose(): void;
}
const GVTFees = withRole(translate()(_GVTFees));
export default GVTFees;
