import "./about-level.scss";

import React, { Component } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import Dialog from "shared/components/dialog/dialog";
import { convertToCurrency } from "shared/utils/currency-converter";

class AboutLevelsComponent extends Component {
  numberFormat = (val, rate, currency) => {
    return (
      <NumberFormat
        value={convertToCurrency(val, rate)}
        prefix=""
        suffix={` ${currency}`}
        thousandSeparator={" "}
        decimalScale={2}
        displayType="text"
      />
    );
  };
  render() {
    const { t, open, onClose, rate } = this.props;
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
                <div className="about-levels__limit">
                  <div className="div about-levels__icon one">1</div>
                  <div className="about-levels__values">
                    <div className="about-levels__mute-title">
                      {t("about-levels-page.titles.limit")}
                    </div>
                    <div className="about-levels__value">
                      {this.numberFormat(
                        t("about-levels-page.limits.1"),
                        rate,
                        "GVT"
                      )}
                    </div>
                  </div>
                </div>
                <div className="about-levels__limit">
                  <div className="div about-levels__icon two">2</div>
                  <div className="about-levels__values">
                    <div className="about-levels__mute-title">
                      {t("about-levels-page.titles.limit")}
                    </div>
                    <div className="about-levels__value">
                      {this.numberFormat(
                        t("about-levels-page.limits.2"),
                        rate,
                        "GVT"
                      )}
                    </div>
                  </div>
                </div>
                <div className="about-levels__limit">
                  <div className="div about-levels__icon three">3</div>
                  <div className="about-levels__values">
                    <div className="about-levels__mute-title">
                      {t("about-levels-page.titles.limit")}
                    </div>
                    <div className="about-levels__value">
                      {this.numberFormat(
                        t("about-levels-page.limits.3"),
                        rate,
                        "GVT"
                      )}
                    </div>
                  </div>
                </div>
                <div className="about-levels__limit">
                  <div className="div about-levels__icon four">4</div>
                  <div className="about-levels__values">
                    <div className="about-levels__mute-title">
                      {t("about-levels-page.titles.limit")}
                    </div>
                    <div className="about-levels__value">
                      {this.numberFormat(
                        t("about-levels-page.limits.4"),
                        rate,
                        "GVT"
                      )}
                    </div>
                  </div>
                </div>
                <div className="about-levels__limit">
                  <div className="div about-levels__icon five">5</div>
                  <div className="about-levels__values">
                    <div className="about-levels__mute-title">
                      {t("about-levels-page.titles.limit")}
                    </div>
                    <div className="about-levels__value">
                      {this.numberFormat(
                        t("about-levels-page.limits.5"),
                        rate,
                        "GVT"
                      )}
                    </div>
                  </div>
                </div>
                <div className="about-levels__limit">
                  <div className="div about-levels__icon six">6</div>
                  <div className="about-levels__values">
                    <div className="about-levels__mute-title">
                      {t("about-levels-page.titles.limit")}
                    </div>
                    <div className="about-levels__value">
                      {this.numberFormat(
                        t("about-levels-page.limits.6"),
                        rate,
                        "GVT"
                      )}
                    </div>
                  </div>
                </div>
                <div className="about-levels__limit">
                  <div className="div about-levels__icon seven">7</div>
                  <div className="about-levels__values">
                    <div className="about-levels__mute-title">
                      {t("about-levels-page.titles.limit")}
                    </div>
                    <div className="about-levels__value">
                      {this.numberFormat(
                        t("about-levels-page.limits.7"),
                        rate,
                        "GVT"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    );
  }
}
export default translate()(AboutLevelsComponent);
