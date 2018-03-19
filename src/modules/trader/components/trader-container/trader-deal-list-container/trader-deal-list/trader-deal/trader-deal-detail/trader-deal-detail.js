import React from "react";
import "./trader-deal-detail.css";

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
          <div className="metric__value">{deal.priceOpen}</div>
          <div className="metric__description">Price Open</div>
        </div>
      </div>
      {deal.priceClose && (
        <div className="trader-deal__cell">
          <div className="metric">
            <div className="metric__value">{deal.priceClose}</div>
            <div className="metric__description">Price Close</div>
          </div>
        </div>
      )}
      <div className="trader-deal__cell">
        <div className="metric">
          <div className="metric__value">
            {new Date(deal.dateOpen).toDateString()}
          </div>
          <div className="metric__description">Date Open</div>
        </div>
      </div>
      {deal.dateClose && (
        <div className="trader-deal__cell">
          <div className="metric">
            <div className="metric__value">
              {new Date(deal.dateClose).toDateString()}
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
          <div className="metric__value">{deal.price}</div>
          <div className="metric__description">Price</div>
        </div>
      </div>
      <div className="trader-deal__cell">
        <div className="metric">
          <div className="metric__value">
            {new Date(deal.date).toDateString()}
          </div>
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
