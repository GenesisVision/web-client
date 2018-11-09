import { translate } from "react-i18next";
import { UncontrolledTooltip } from "reactstrap";
import React from "react";
import "./program-deal-detail.css";
import moment from "moment";
import NumberFormat from "react-number-format";

const ProgramDealDetailMT4 = translate()(({ t, deal }) => {
  return (
    <div className="program-deal-detail">
      <div className="program-deal__cell">
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
      <div className="program-deal__cell">
        <div className="metric">
          <div className="metric__value">
            <NumberFormat value={deal.priceOpen} displayType="text" />
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
        <div className="program-deal__cell">
          <div className="metric">
            <div className="metric__value">
              <NumberFormat value={deal.priceClose} displayType="text" />
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
      <div className="program-deal__cell">
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
        <div className="program-deal__cell">
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
});

const ProgramDealDetailMT5 = translate()(({ t, deal }) => {
  return (
    <div className="program-deal-detail">
      <div className="program-deal__cell">
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
      <div className="program-deal__cell">
        <div className="metric">
          <div className="metric__value">
            <NumberFormat value={deal.price} displayType="text" />
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
      <div className="program-deal__cell">
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
      <div className="program-deal__cell">
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
});

const ProgramDealDetail = ({ deal, serverType }) => {
  if (serverType === "MetaTrader4") return <ProgramDealDetailMT4 deal={deal} />;
  return <ProgramDealDetailMT5 deal={deal} />;
};

export default ProgramDealDetail;
