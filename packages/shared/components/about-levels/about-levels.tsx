import "./about-level.scss";

import * as React from "react";
import {
  InjectedTranslateProps,
  translate,
  TranslationFunction
} from "react-i18next";
import NumberFormat from "react-number-format";
import Dialog from "shared/components/dialog/dialog";

import { formatValue } from "shared/utils/formatter";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { LevelInfo } from "gv-api-web";

const RenderLimits = (
  t: TranslationFunction,
  investmentsLimits: LevelInfo[],
  currency: string
): JSX.Element => (
  <React.Fragment>
    {investmentsLimits.map((levelInfo: LevelInfo) => (
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
    ))}
  </React.Fragment>
);

interface IAboutLevelsComponentProps {
  open: boolean;
  onClose(param?: any): void;
  investmentsLimits: LevelInfo[];
  currency: string;
}

class AboutLevelsComponent extends React.Component<
  IAboutLevelsComponentProps & InjectedTranslateProps
> {
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
                {t("about-levels-page.section.text-1")}
              </p>
              <p className="about-levels__paragraph">
                {t("about-levels-page.section.text-2")}
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
                  RenderLimits(t, investmentsLimits, currency)}
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    );
  }
}
export default translate()(AboutLevelsComponent);
