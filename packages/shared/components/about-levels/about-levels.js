import "./about-level.scss";

import React, { Component } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import Dialog from "shared/components/dialog/dialog";
import { formatValue } from "../../utils/formatter";
import StatisticItem from "../statistic-item/statistic-item";

const renderLimits = (t, investmentsLimits, currency) => {
  return investmentsLimits.map(levelInfo => {
    return (
      <div key={levelInfo.level} className="about-levels__limit">
        <div
          className={`about-levels__icon about-levels__icon--${
            levelInfo.level
          }`}
        >
          {levelInfo.level}
        </div>
        <StatisticItem accent label={t("about-levels-page.titles.limit")}>
          <NumberFormat
            value={formatValue(levelInfo.investmentLimit)}
            thousandSeparator={" "}
            displayType="text"
            suffix={` ${currency}`}
          />
        </StatisticItem>
      </div>
    );
  });
};

class AboutLevelsComponent extends Component {
  render() {
    const { t, open, onClose, investmentsLimits, currency } = this.props;
    return (
      <Dialog wider open={open} onClose={onClose} className="about-levels">
        <div className="about-levels__container">
          <div className="about-levels__header">
            <h1>{t("about-levels-page.titles.main")}</h1>
          </div>
          <div className="about-levels__row">
            <div className="about-levels__left-block">
              <p className="about-levels__paragraph">
                {t("about-levels-page.list.subtitle")}
              </p>
              <p className="about-levels__paragraph">
                {t("about-levels-page.section.text-1")}
              </p>
              <p className="about-levels__paragraph">
                {t("about-levels-page.section.text-2")}
              </p>
              <p className="about-levels__paragraph">
                {t("about-levels-page.section.text-3")}
              </p>
              <h4 className="about-levels__subtitle">
                {t("about-levels-page.list.subtitle")}
              </h4>
              <ol className="about-levels__list">
                <li className="about-levels__list-item">
                  {t("about-levels-page.list.list-item-1")}
                </li>
                <li className="about-levels__list-item">
                  {t("about-levels-page.list.list-item-2")}
                </li>
                <li className="about-levels__list-item">
                  {t("about-levels-page.list.list-item-3")}
                </li>
                <li className="about-levels__list-item">
                  {t("about-levels-page.list.list-item-4")}
                </li>
                <li className="about-levels__list-item">
                  {t("about-levels-page.list.list-item-5")}
                </li>
                <li className="about-levels__list-item">
                  {t("about-levels-page.list.list-item-6")}
                </li>
                <li className="about-levels__list-item">
                  {t("about-levels-page.list.list-item-7")}
                </li>
              </ol>
            </div>
            <div className="about-levels__right-block">
              <h4 className="about-levels__subtitle">
                {t("about-levels-page.titles.limits")}
              </h4>
              <div className="about-levels__limits">
                {investmentsLimits.length &&
                  renderLimits(t, investmentsLimits, currency)}
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    );
  }
}
export default translate()(AboutLevelsComponent);
