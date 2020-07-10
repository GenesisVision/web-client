import { InternalArticle } from "pages/landing-page/components/internal/internal.blocks";
import React from "react";

import styles from "./glossary-section.module.scss";

const GlossarySection: React.FC = () => {
  return (
    <section className={styles["glossary-section"]}>
      <h1>Glossary</h1>
      <InternalArticle>
        <h2>Program</h2>
        <p>
          <b>Investment program</b> - an investment product created by the
          manager, designed to gather investments from investors for their
          further management.
        </p>
        <p>
          <b>Period</b> (Reporting Period) - is a period which is pre-defined by
          the manager; at the end of which all trading positions are closed with
          a subsequent distribution of the profit, investors are then either
          disconnected from the Program or connected to it, additional
          investment amounts are made and the commission is paid to the manager.
        </p>
        <p>
          <b>Balance</b> - the value of funds on ones trading account.
        </p>
        <p>
          <b>Equity</b> - a current manager balance that takes all open
          positions into account.
        </p>
        <p>
          <b>Drawdown</b> (D.down) - the peak-to-trough decline of a program or
          a fund, this is usually quoted as the percentage between the peak and
          the subsequent trough.
        </p>
        <p>
          <b>Trade</b> - the purchasing/selling operation of a financial
          instrument conducted by a manager.
        </p>
        <p>
          <b>Reinvest</b> - an option available to investors that allows them to
          reinvest their profits back into the original program they invested
          in.
        </p>
        <p>
          <b>Available to invest</b> - the amount available for investment up to
          the next period.
        </p>
        <p>
          <b>Open positions</b> - any established or entered trades that have
          yet to close.
        </p>
        <p>
          <b>Level</b> - Genesis level shows the experience and reliability of
          the Manager in the current program.
        </p>
      </InternalArticle>
      <InternalArticle>
        <h2>Fees</h2>
        <p>
          <b>Entry fee</b> - the fee an investor pays to the manager for
          entering the program or fund, this is calculated as a percentage of
          the investing amount.
        </p>
        <p>
          <b>Exit fee</b> - the fee an investor pays to the manager for
          withdrawing from the fund, this is calculated as a percentage of the
          withdrawal amount.
        </p>
        <p>
          <b>Success fee</b> - the fee an investor pays to the program manager
          in the case of the program making a profit, this is calculated as a
          percentage of the profit amount.
        </p>
        <p>
          <b>GV commission</b> - a commission charged by the Genesis Vision
          platform.
        </p>
      </InternalArticle>
      <InternalArticle>
        <h2>Statistics</h2>
        <p>
          <b>Trades</b> - the number of trades the manager has performed during
          the selected date range.
        </p>
        <p>
          <b>Success trades</b> - the percentage of successful trades among the
          number of total trades during the selected date range.
        </p>
        <p>
          <b>Sharpe ratio</b> - the average return earned in excess of the
          risk-free rate per unit of volatility or total risk. The greater the
          value of the Sharpe ratio, the more attractive the risk-adjusted
          return.
        </p>
        <p>
          <b>Sortino ratio</b> - the Sortino ratio is a variation of the Sharpe
          ratio that only factors in the downside risk.
        </p>
        <p>
          <b>Calmar ratio</b> - a comparison of the average annual compounded
          rate of return and the maximum drawdown risk of asset managers and
          hedge funds.
        </p>
        <p>
          <b>Maximum drawdown</b> - the biggest drawdown of a program or a fund
          during the selected date range.
        </p>
        <p>
          <b>Profit factor</b> - an indicator which is defined as the gross
          profit divided by the gross loss for the selected date range.
        </p>
      </InternalArticle>
      <InternalArticle>
        <h2>Trades history</h2>
        <p>
          <b>Direction (Dir)</b> - (Sell or Buy) - an indicator showing a trade
          direction.
        </p>
        <p>
          <b>Symbol</b> - the symbol of the asset (currency pair).
        </p>
        <p>
          <b>Volume</b> - the number of units offered for sale or purchase.
          Usually, the volume’s measured in "lots" - basically the number of
          currency units you will buy or sell.
        </p>
        <p>
          <b>Price</b> - the price the asset was bought or sold for.
        </p>
        <p>
          <b>Profit</b> - the profit a manager received for the trade.
        </p>
        <p>
          <b>Ticket</b> - a unique id number assigned to each opened position or
          pending order in the trading terminal.
        </p>
        <p>
          <b>Entry</b> - (in or out) - this is the current status of the trade.
          If the trade has got a status “in”, it means that the trade is still
          open. If the trade has got a status “out”, it means that the trade has
          been closed.
        </p>
      </InternalArticle>
      <InternalArticle>
        <h2>Funds</h2>
        <p>
          <b>GV Fund</b> - GV Funds are portfolios of multiple assets, gathered
          and chosen by the manager. The profit in GV Funds is achieved from the
          organic price growth of the chosen assets included within the fund,
          and not by “active trading activities” of the manager.
        </p>
        <p>
          <b>Assets</b> - are objects that have an identifiable value and are
          traded on either Forex or crypto markets.
        </p>
        <p>
          <b>Structure</b> - the current allocation of funds selected by the
          Manager.
        </p>
        <p>
          <b>Balance</b> - the current balance of the GV Fund.
        </p>
      </InternalArticle>
      <InternalArticle>
        <h2>Wallet</h2>
        <p>
          <b>Total balance</b> - the total value of funds that belong to the
          user on the platform.
        </p>
        <p>
          <b>Available</b> - funds of the user that are currently available for
          investment.
        </p>
        <p>
          <b>Invested</b> - funds of the user that are currently invested in
          programs and/or GV funds.
        </p>
        <p>
          <b>Pending</b> - funds of the user that are still being processed.
        </p>
        <p>
          <b>Transaction</b> - operation of funds transferring to/from or
          between a users wallets.
        </p>
        <p>
          <b>Deposit</b> - a transaction involving a transfer of funds to
          another party.
        </p>
        <p>
          <b>Withdrawal</b> - a transaction of taking funds out of the account.
        </p>
        <p>
          <b>Transfer</b> - a transaction between accounts.
        </p>
      </InternalArticle>
      <InternalArticle>
        <h2>Additional</h2>
        <p>
          <b>Trading strategy</b> – trading rules, by the guidance of which a
          trader conducts trading operations on financial markets. The strategy
          defines the traders behaviour while they’re active on the market.
        </p>
        <p>
          <b>Manager</b> - an independent trader who is deemed a client of
          Genesis Vision, who provides an asset management service to a wide
          range of potential investors. The individual trading activities by
          using his or her own funds and investors funds in the aim of making
          profit.
        </p>
        <p>
          <b>Trading account</b> - the clients personalized account recording
          all complete and current trading operations, financial transactions,
          as well as current pending orders and applicable bonuses.
        </p>
        <p>
          <b>Leverage</b> - the correlation between the margin amount and trade
          volume. For instance, leverage 1:100 means that in order to conduct
          the trading operation it is necessary to have an amount that is 100
          times smaller than the transaction volume on a trading account.
        </p>
      </InternalArticle>
    </section>
  );
};

export default GlossarySection;
