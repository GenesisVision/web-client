import React from "react";
import moment from "moment";
import NumberFormat from "react-number-format";
import { translate } from "react-i18next";
import { UncontrolledTooltip } from "reactstrap";

import "./trader-deal-detail.css";

const TraderDealDetailMT4 = ({ deal, t }) => {
  return (
    <div className="trader-deal-detail">
      <div className="trader-deal__cell">
        <div className="metric">
          <div className="metric__value">{deal.ticket}</div>
          <div className="metric__description">
            <span id={`ticket_${deal.ticket}`}>
              {t("program-deal-list.ticket.text")}
            </span>
            <UncontrolledTooltip
              placement="bottom"
              target={`ticket_${deal.ticket}`}
            >
              {t("program-deal-list.ticket.tooltip")}
            </UncontrolledTooltip>
          </div>
        </div>
      </div>
      <div className="trader-deal__cell">
        <div className="metric">
          <div className="metric__value">
            <NumberFormat
              value={deal.priceOpen}
              // decimalScale={2}
              displayType="text"
            />
          </div>
          <div className="metric__description">
            <span id={`price-open_${deal.ticket}`}>
              {t("program-deal-list.price-open.text")}
            </span>
            <UncontrolledTooltip
              placement="bottom"
              target={`price-open_${deal.ticket}`}
            >
              {t("program-deal-list.price-open.tooltip")}
            </UncontrolledTooltip>
          </div>
        </div>
      </div>
      {deal.priceClose && (
        <div className="trader-deal__cell">
          <div className="metric">
            <div className="metric__value">
              <NumberFormat
                value={deal.priceClose}
                // decimalScale={2}
                displayType="text"
              />
            </div>
            <div className="metric__description">
              <span id={`price-close_${deal.ticket}`}>
                {t("program-deal-list.price-close.text")}
              </span>
              <UncontrolledTooltip
                placement="bottom"
                target={`price-close_${deal.ticket}`}
              >
                {t("program-deal-list.price-close.tooltip")}
              </UncontrolledTooltip>
            </div>
          </div>
        </div>
      )}
      <div className="trader-deal__cell">
        <div className="metric">
          <div className="metric__value">
            {moment(deal.dateOpen).format("L")}
          </div>
          <div className="metric__description">
            <span id={`date-open_${deal.ticket}`}>
              {t("program-deal-list.date-open.text")}
            </span>
            <UncontrolledTooltip
              placement="bottom"
              target={`date-open_${deal.ticket}`}
            >
              {t("program-deal-list.date-open.tooltip")}
            </UncontrolledTooltip>
          </div>
        </div>
      </div>
      {deal.dateClose && (
        <div className="trader-deal__cell">
          <div className="metric">
            <div className="metric__value">
              {moment(deal.dateClose).format("L")}
            </div>
            <div className="metric__description">
              <span id={`date-close_${deal.ticket}`}>
                {t("program-deal-list.date-close.text")}
              </span>
              <UncontrolledTooltip
                placement="bottom"
                target={`date-close_${deal.ticket}`}
              >
                {t("program-deal-list.date-close.tooltip")}
              </UncontrolledTooltip>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TraderDealDetailMT5 = ({ deal, t }) => {
  return (
    <div className="trader-deal-detail">
      <div className="trader-deal__cell">
        <div className="metric">
          <div className="metric__value">{deal.ticket}</div>
          <div className="metric__description">
            <span id={`ticket_${deal.ticket}`}>
              {t("program-deal-list.ticket.text")}
            </span>
            <UncontrolledTooltip
              placement="bottom"
              target={`ticket_${deal.ticket}`}
            >
              {t("program-deal-list.ticket.tooltip")}
            </UncontrolledTooltip>
          </div>
        </div>
      </div>
      <div className="trader-deal__cell">
        <div className="metric">
          <div className="metric__value">
            <NumberFormat
              value={deal.price}
              //decimalScale={2}
              displayType="text"
            />
          </div>
          <div className="metric__description">
            <span id={`price_${deal.ticket}`}>
              {t("program-deal-list.price.text")}
            </span>
            <UncontrolledTooltip
              placement="bottom"
              target={`price_${deal.ticket}`}
            >
              {t("program-deal-list.price.tooltip")}
            </UncontrolledTooltip>
          </div>
        </div>
      </div>
      <div className="trader-deal__cell">
        <div className="metric">
          <div className="metric__value">{moment(deal.date).format("L")}</div>
          <div className="metric__description">
            <span id={`date_${deal.ticket}`}>
              {t("program-deal-list.date.text")}
            </span>
            <UncontrolledTooltip
              placement="bottom"
              target={`date_${deal.ticket}`}
            >
              {t("program-deal-list.date.tooltip")}
            </UncontrolledTooltip>
          </div>
        </div>
      </div>
      <div className="trader-deal__cell">
        <div className="metric">
          <div className="metric__value">{deal.entry}</div>
          <div className="metric__description">
            <span id={`entry_${deal.ticket}`}>
              {t("program-deal-list.entry.text")}
            </span>
            <UncontrolledTooltip
              placement="bottom"
              target={`entry_${deal.ticket}`}
            >
              {t("program-deal-list.entry.tooltip")}
            </UncontrolledTooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

const TraderDealDetail = ({ t, deal, serverType }) => {
  if (serverType === "MetaTrader4")
    return <TraderDealDetailMT4 deal={deal} t={t} />;
  return <TraderDealDetailMT5 deal={deal} t={t} />;
};

export default translate()(TraderDealDetail);
