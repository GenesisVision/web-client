import classNames from "classnames";
import React from "react";

const _FeesTradingDiscount: React.FC<{
  dark?: boolean;
  white?: boolean;
}> = ({ dark, white }) => {
  return (
    <>
      <div className="fees-info__notes">
        <p>
          Genesis Vision Token holders who select Genesis Markets as their
          broker will receive discounted transaction fees.
        </p>
        <h3>To be eligible for a trading discount</h3>
        <ul
          className={classNames("fees-info__list-notes", {
            "fees-info__list-notes--dark": dark
          })}
        >
          <li className="fees-info__note-item">
            There must be more than 1 GVT stored in the wallet
          </li>
          <li className="fees-info__note-item">
            The "Using GVT to pay for fees" function must be enabled. The fee
            will be charged at a discount depending on the amount of GVT stored
            in the wallet.
          </li>
          <li className="fees-info__note-item">
            The discounted fee will be charged from the GVT wallet, not from the
            trading account.
          </li>
        </ul>
      </div>
      <div className="fees-info__notes">
        <h4>Conditions for obtaining discounts</h4>
        <div className="fees-info__table-wrapper">
          <table
            className={classNames("fees-table", {
              "fees-table--dark": dark,
              "fees-table--white-head": white
            })}
          >
            <thead className="fees-table__head">
              <tr className="fees-table__row">
                <th className="fees-table__cell fees-table__cell--width-bg">
                  Wallet
                </th>
                <th className="fees-table__cell">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="fees-table__row">
                <td className="fees-table__cell">From 1 GVT up to 10</td>
                <td className="fees-table__cell">30%</td>
              </tr>
              <tr className="fees-table__row">
                <td className="fees-table__cell">Up to 25 GVT</td>
                <td className="fees-table__cell">35%</td>
              </tr>
              <tr className="fees-table__row">
                <td className="fees-table__cell">Up to 50 GVT</td>
                <td className="fees-table__cell">40%</td>
              </tr>
              <tr className="fees-table__row">
                <td className="fees-table__cell">Up to 100 GVT</td>
                <td className="fees-table__cell">45%</td>
              </tr>
              <tr className="fees-table__row">
                <td className="fees-table__cell">Up to 500 GVT</td>
                <td className="fees-table__cell">50%</td>
              </tr>
              <tr className="fees-table__row">
                <td className="fees-table__cell">500 GVT+</td>
                <td className="fees-table__cell">55%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="fees-info__notes">
        <h3>Note</h3>
        <ul
          className={classNames("fees-info__list-notes", {
            "fees-info__list-notes--dark": dark
          })}
        >
          <li className="fees-info__note-item">
            If you switch this function off, the fee will become "Regular" and
            charge 100%.
          </li>
          <li className="fees-info__note-item">
            If you have enabled the "Using GVT to pay for fees" function but
            have an insufficient amount of GVT stored in the wallet, this
            function will no longer work and the fee will become Regular.
          </li>
          <li className="fees-info__note-item">
            For managers the commission for trading will be debited from the
            manager’s GVT wallet. At the end of the reporting period, the
            manager will receive a refund of the commission at the expense of
            increasing the share of own funds in management.
          </li>
        </ul>
      </div>
    </>
  );
};

const FeesTradingDiscount = React.memo(_FeesTradingDiscount);
export default FeesTradingDiscount;
