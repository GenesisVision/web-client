import "./gvt-fees.scss";

import React, { Component } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import Dialog from "shared/components/dialog/dialog";

import { formatValue } from "../../utils/formatter";
import StatisticItem from "../statistic-item/statistic-item";

// const renderLimits = (t, investmentsLimits, currency) => {
//   return investmentsLimits.map(levelInfo => {
//     return (
//       <div key={levelInfo.level} className="gvt-fees__limit">
//         <div
//           className={`gvt-fees__icon gvt-fees__icon--${
//             levelInfo.level
//           }`}
//         >
//           {levelInfo.level}
//         </div>
//         <StatisticItem accent label={t("gvt-fees.titles.limit")}>
//           <NumberFormat
//             value={formatValue(levelInfo.investmentLimit)}
//             thousandSeparator={" "}
//             displayType="text"
//             suffix={` ${currency}`}
//           />
//         </StatisticItem>
//       </div>
//     );
//   });
// };

class GVTFees extends Component {
  render() {
    const { t, open, onClose } = this.props;
    return (
      <Dialog wider open={open} onClose={onClose} className="gvt-fees">
        <div className="gvt-fees__container">
          <div className="gvt-fees__header">
            <h1>{t("gvt-fees.titles.main")}</h1>
          </div>
          <div className="gvt-fees__row">
            <div className="gvt-fees__left-block">
              <p className="gvt-fees__paragraph">
                {t("gvt-fees.section.text-1")}
              </p>
              <p className="gvt-fees__paragraph">
                {t("gvt-fees.section.text-2")}
              </p>
              <h4 className="gvt-fees__subtitle">
                {t("gvt-fees.list.subtitle")}
              </h4>
              <ol className="gvt-fees__list">
                <li className="gvt-fees__list-item">
                  {t("gvt-fees.list.list-item-1")}
                </li>
                <li className="gvt-fees__list-item">
                  {t("gvt-fees.list.list-item-2")}
                </li>
                <li className="gvt-fees__list-item">
                  {t("gvt-fees.list.list-item-3")}
                </li>
                <li className="gvt-fees__list-item">
                  {t("gvt-fees.list.list-item-4")}
                </li>
                <li className="gvt-fees__list-item">
                  {t("gvt-fees.list.list-item-5")}
                </li>
                <li className="gvt-fees__list-item">
                  {t("gvt-fees.list.list-item-6")}
                </li>
                <li className="gvt-fees__list-item">
                  {t("gvt-fees.list.list-item-7")}
                </li>
              </ol>
            </div>
            <div className="gvt-fees__right-block">
              <h4 className="gvt-fees__subtitle">
                {t("gvt-fees.titles.limits")}
              </h4>
              <div className="gvt-fees__limits">
                {/*{investmentsLimits.length &&*/}
                {/*renderLimits(t, investmentsLimits, currency)}*/}
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    );
  }
}
export default translate()(GVTFees);
