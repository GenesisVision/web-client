import LevelIcon from "components/details/details-description-section/about-levels/level-icon";
import { LabeledValue } from "components/labeled-value/labeled-value";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import { LevelInfo } from "gv-api-web";
import { CURRENCIES } from "modules/currency-select/currency-select.constants";
import React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { formatCurrencyValue } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

import styles from "./about-level.module.scss";

interface ILimitsProps {
  investmentsLimits: LevelInfo[];
  currency: CURRENCIES;
}

interface Props {
  investmentsLimits: LevelInfo[];
  currency: CurrencyEnum;
}

const _Limits: React.FC<ILimitsProps> = ({ investmentsLimits, currency }) => {
  const [t] = useTranslation();
  return (
    <>
      {investmentsLimits.map(levelInfo => (
        <Row key={levelInfo.level}>
          <RowItem>
            <LevelIcon level={levelInfo.level} />
          </RowItem>
          <LabeledValue label={t("about-levels-page:titles.limit")}>
            <Text weight={"bold"}>
              <NumberFormat
                value={formatCurrencyValue(levelInfo.investmentLimit, currency)}
                thousandSeparator={" "}
                displayType="text"
                suffix={` ${currency}`}
              />
            </Text>
          </LabeledValue>
        </Row>
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
    <div className={styles["about-levels__container"]}>
      <Row>
        <h1>{t("about-levels-page:titles.main")}</h1>
      </Row>
      <Row className={styles["about-levels__content"]}>
        <RowItem className={styles["about-levels__left-block"]}>
          <Row size={"small"}>{t("about-levels-page:section.text-1")}</Row>
          <Row size={"small"}>{t("about-levels-page:section.text-2")}</Row>
          <Row size={"small"}>{t("about-levels-page:section.text-3")}</Row>
          <Row size={"small"}>{t("about-levels-page:section.text-4")}</Row>
          <Row>
            <h4>{t("about-levels-page:section.formula")}</h4>
          </Row>
          <Row size={"small"}>{t("about-levels-page:list.subtitle")}</Row>
          <div className={styles["about-levels__list"]}>
            <h4 className={styles["about-levels__list-item"]}>
              {t("about-levels-page:list.list-item-1")}
            </h4>
            <h4 className={styles["about-levels__list-item"]}>
              {t("about-levels-page:list.list-item-2")}
            </h4>
            <p>{t("about-levels-page:section.text-5")}</p>
            <h4 className={styles["about-levels__list-item"]}>
              {t("about-levels-page:list.list-item-3")}
            </h4>
            <p>{t("about-levels-page:section.text-6")}</p>
            <p>{t("about-levels-page:section.text-7")}</p>
            <p>{t("about-levels-page:section.text-8")}</p>
            <h4 className={styles["about-levels__notes"]}>
              {t("about-levels-page:notes.title")}
            </h4>
            <ul className={styles["about-levels__ul"]}>
              <li>
                <p>{t("about-levels-page:notes.note-1")}</p>
              </li>
              <li>
                <p>{t("about-levels-page:notes.note-2")}</p>
              </li>
            </ul>
            <p>
              {t("about-levels-page:section.text-9")}{" "}
              <a
                title={t("about-levels-page:section.link")}
                target="_blank"
                rel="noopener noreferrer"
                href="https://blog.genesis.vision/genesis-vision-update-a-level-up-d01ef51c42a"
              >
                {t("about-levels-page:section.link")}
              </a>
            </p>
          </div>
        </RowItem>
        <RowItem className={styles["about-levels__right-block"]}>
          <Row>
            <h4>{t("about-levels-page:titles.limits")}</h4>
          </Row>
          <Row onlyOffset>
            {investmentsLimits.length && (
              <Limits
                investmentsLimits={investmentsLimits}
                currency={currency}
              />
            )}
          </Row>
        </RowItem>
      </Row>
    </div>
  );
};

const AboutLevelsContent = React.memo(_AboutLevelsContent);
export default AboutLevelsContent;
