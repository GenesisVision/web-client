import "./gvt-fees.scss";

import React, { Component } from "react";
import { translate } from "react-i18next";
import Dialog from "shared/components/dialog/dialog";
import { ROLE } from "shared/constants/constants";

class GVTFees extends Component {
  render() {
    const { t, open, onClose, role } = this.props;
    return (
      <Dialog wider open={true} onClose={onClose} className="gvt-fees">
        <div className="gvt-fees__container">
          <div className="gvt-fees__header">
            <h1>{t("gvt-fees.titles.main")}</h1>
          </div>
          <div className="gvt-fees__row">
            <div className="gvt-fees__text-block">
              <p className="gvt-fees__paragraph">
                {t("gvt-fees.section.text-1")}
              </p>
              {role === ROLE.INVESTOR ? (
                <p className="gvt-fees__paragraph">
                  {t("gvt-fees.section.text-2")}
                </p>
              ) : null}
            </div>
            <table className="gvt-fees__table">
              <thead>
                <tr>
                  <th className="gvt-fees__table-head">
                    Amount held for 7 days*
                  </th>
                  <th className="gvt-fees__table-head">Discount</th>
                  <th className="gvt-fees__table-head">Fees</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="gvt-fees__table-value">Any GVT</td>
                  <td className="gvt-fees__table-value">30%</td>
                  <td className="gvt-fees__table-value">0.210%</td>
                </tr>
                <tr>
                  <td className="gvt-fees__table-value">
                    From 10 GVT up to 25
                  </td>
                  <td className="gvt-fees__table-value">35%</td>
                  <td className="gvt-fees__table-value">0.195%</td>
                </tr>
                <tr>
                  <td className="gvt-fees__table-value">Up to 50 GVT</td>
                  <td className="gvt-fees__table-value">40%</td>
                  <td className="gvt-fees__table-value">0.180%</td>
                </tr>
                <tr>
                  <td className="gvt-fees__table-value">Up to 100 GVT</td>
                  <td className="gvt-fees__table-value">45%</td>
                  <td className="gvt-fees__table-value">0.165%</td>
                </tr>
                <tr>
                  <td className="gvt-fees__table-value">Up to 500 GVT</td>
                  <td className="gvt-fees__table-value">50%</td>
                  <td className="gvt-fees__table-value">0.150%</td>
                </tr>
                <tr>
                  <td className="gvt-fees__table-value">500 GVT+</td>
                  <td className="gvt-fees__table-value">55%</td>
                  <td className="gvt-fees__table-value">0.135%</td>
                </tr>
              </tbody>
            </table>
            <div className="gvt-fees__text-block">
              <p className="gvt-fees__paragraph">
                * Please note that to be eligible for a discount tier you should
                hold GVT on your Genesis Markets wallet for at least 7 days
              </p>
            </div>
          </div>
        </div>
      </Dialog>
    );
  }
}
export default translate()(GVTFees);
