import React from "react";
import "./trader-deal-detail.css";
import moment from "moment";
import NumberFormat from "react-number-format";

const TraderDealDetailMT4 = ({ deal }) => {
  return (
    <div className="trader-deal-detail">
      <div className="trader-deal__cell">
        <div className="metric">
          <div className="metric__value">{deal.ticket}</div>
          <div className="metric__description">Ticket</div>
        </div>
      </div>
      <div className="trader-deal__cell">
        <div className="metric">
          <div className="metric__value">
            <NumberFormat
              value={deal.priceOpen}
              decimalScale={2}
              displayType="text"
            />
          </div>
          <div className="metric__description">Price Open</div>
        </div>
      </div>
      {deal.priceClose && (
        <div className="trader-deal__cell">
          <div className="metric">
            <div className="metric__value">
              <NumberFormat
                value={deal.priceClose}
                decimalScale={2}
                displayType="text"
              />
            </div>
            <div className="metric__description">Price Close</div>
          </div>
        </div>
      )}
      <div className="trader-deal__cell">
        <div className="metric">
          <div className="metric__value">
            {moment(deal.dateOpen).format("L")}
          </div>
          <div className="metric__description">Date Open</div>
        </div>
      </div>
      {deal.dateClose && (
        <div className="trader-deal__cell">
          <div className="metric">
            <div className="metric__value">
              {moment(deal.dateClose).format("L")}
            </div>
            <div className="metric__description">Date Close</div>
          </div>
        </div>
      )}
    </div>
  );
};

const TraderDealDetailMT5 = ({ deal }) => {
  return (
    <div className="trader-deal-detail">
      <div className="trader-deal__cell">
        <div className="metric">
          <div className="metric__value">{deal.ticket}</div>
          <div className="metric__description">Ticket</div>
        </div>
      </div>
      <div className="trader-deal__cell">
        <div className="metric">
          <div className="metric__value">
            <NumberFormat
              value={deal.price}
              decimalScale={2}
              displayType="text"
            />
          </div>
          <div className="metric__description">Price</div>
        </div>
      </div>
      <div className="trader-deal__cell">
        <div className="metric">
          <div className="metric__value">{moment(deal.date).format("L")}</div>
          <div className="metric__description">Date</div>
        </div>
      </div>
      <div className="trader-deal__cell">
        <div className="metric">
          <div className="metric__value">{deal.entry}</div>
          <div className="metric__description">Entry</div>
        </div>
      </div>
    </div>
  );
};

const TraderDealDetail = ({ deal, serverType }) => {
  if (serverType === "MetaTrader4") return <TraderDealDetailMT4 deal={deal} />;
  return <TraderDealDetailMT5 deal={deal} />;
};

export default TraderDealDetail;
