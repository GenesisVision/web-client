import LevelIcon from "components/details/details-description-section/about-levels/level-icon";
import StatisticItem from "components/statistic-item/statistic-item";
import { LevelInfo } from "gv-api-web";
import { CURRENCIES } from "modules/currency-select/currency-select.constants";
import React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { formatCurrencyValue } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

interface ILimitsProps {
  investmentsLimits: LevelInfo[];
  currency: CURRENCIES;
}

const _Limits: React.FC<ILimitsProps> = ({ investmentsLimits, currency }) => {
  const [t] = useTranslation();
  return (
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
};
const Limits = React.memo<ILimitsProps>(_Limits);

const _AboutLevelsContent: React.FC<Props> = ({
  investmentsLimits,
  currency
}) => {
  const [t] = useTranslation();
  return (
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
            <p className="about-levels__paragraph">
              {t("about-levels-page.section.text-9")}{" "}
              <a
                title={t("about-levels-page.section.link")}
                target="_blank"
                rel="noopener noreferrer"
                href="https://blog.genesis.vision/genesis-vision-update-a-level-up-d01ef51c42a"
              >
                {t("about-levels-page.section.link")}
              </a>
            </p>
          </div>
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
  );
};

interface Props {
  investmentsLimits: LevelInfo[];
  currency: CurrencyEnum;
}

const AboutLevelsContent = React.memo(_AboutLevelsContent);
export default AboutLevelsContent;
