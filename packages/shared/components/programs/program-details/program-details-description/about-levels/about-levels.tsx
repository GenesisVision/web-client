import "./about-level.scss";

import { LevelInfo } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import Dialog from "shared/components/dialog/dialog";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { CURRENCIES } from "shared/modules/currency-select/currency-select.constants";
import { formatCurrencyValue } from "shared/utils/formatter";

import LevelIcon from "./level-icon";

const _Limits: React.FC<ILimitsProps> = ({
  t,
  investmentsLimits,
  currency
}) => (
  <>
    {investmentsLimits.map(levelInfo => (
      <div key={levelInfo.level} className="about-levels__limit">
        <LevelIcon levelInfo={levelInfo} />
        <StatisticItem
          className="about-levels__info"
          accent
          label={t("about-levels-page.titles.limit")}
        >
          <NumberFormat
            value={formatCurrencyValue(levelInfo.investmentLimit, currency)}
            thousandSeparator={" "}
            displayType="text"
            suffix={` ${currency}`}
          />
        </StatisticItem>
      </div>
    ))}
  </>
);
const Limits = translate()(React.memo(_Limits));

interface ILimitsProps extends InjectedTranslateProps {
  investmentsLimits: LevelInfo[];
  currency: CURRENCIES;
}

const _AboutLevelsComponent: React.FC<Props> = ({
  t,
  open,
  onClose,
  investmentsLimits,
  currency
}) => (
  <Dialog open={open} onClose={onClose} className="about-levels">
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
          <p className="about-levels__paragraph">
            {t("about-levels-page.section.text-3")}
          </p>
          <p className="about-levels__paragraph">
            {t("about-levels-page.section.text-4")}
          </p>
          <h4 className="about-levels__subtitle">
            {t("about-levels-page.section.formula")}
          </h4>
          <p className="about-levels__paragraph">
            {t("about-levels-page.list.subtitle")}
          </p>
          <div className="about-levels__list">
            <h4 className="about-levels__list-item">
              {t("about-levels-page.list.list-item-1")}
            </h4>
            <h4 className="about-levels__list-item">
              {t("about-levels-page.list.list-item-2")}
            </h4>
            <p className="about-levels__paragraph">
              {t("about-levels-page.section.text-5")}
            </p>
            <h4 className="about-levels__list-item">
              {t("about-levels-page.list.list-item-3")}
            </h4>
          </div>
          <p className="about-levels__paragraph">
            {t("about-levels-page.section.text-6")}
          </p>
          <p className="about-levels__paragraph">
            {t("about-levels-page.section.text-7")}
          </p>
          <p className="about-levels__paragraph">
            {t("about-levels-page.section.text-8")}
          </p>
          <h4 className="about-levels__notes">
            {t("about-levels-page.notes.title")}
          </h4>
          <ul className="about-levels__ul">
            <li>
              <p>{t("about-levels-page.notes.note-1")}</p>
            </li>
            <li>
              <p>{t("about-levels-page.notes.note-2")}</p>
            </li>
          </ul>
          {/* TODO add link <p className="about-levels__paragraph">*/}
          {/*  {t("about-levels-page.section.link")}*/}
          {/*  <a href="https://genesis.vision">link</a>*/}
          {/*</p>*/}
        </div>
        <div className="about-levels__right-block">
          <h4 className="about-levels__subtitle">
            {t("about-levels-page.titles.limits")}
          </h4>
          <div className="about-levels__limits">
            {investmentsLimits.length && (
              <Limits
                investmentsLimits={investmentsLimits}
                currency={currency}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  </Dialog>
);

interface OwnProps {
  open: boolean;
  onClose(): void;
  investmentsLimits: LevelInfo[];
  currency: CURRENCIES;
}

interface Props extends OwnProps, InjectedTranslateProps {}

const AboutLevelsComponent = translate()(React.memo(_AboutLevelsComponent));
export default AboutLevelsComponent;
