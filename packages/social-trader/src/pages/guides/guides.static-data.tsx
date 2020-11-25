import { ConversationImages } from "components/conversation/conversation-image/conversation-images";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import Deposit1 from "media/guides/guides-1/Deposit1.png";
import Deposit2 from "media/guides/guides-1/Deposit2.png";
import Deposit3 from "media/guides/guides-1/Deposit3.png";
import Withdrawal1 from "media/guides/guides-1/Withdrawal1.png";
import Withdrawal2 from "media/guides/guides-1/Withdrawal2.png";
import CopyTrades1 from "media/guides/guides-2/CopyTrades1.png";
import CopyTrades2 from "media/guides/guides-2/CopyTrades2.png";
import CopyTrades3 from "media/guides/guides-2/CopyTrades3.png";
import Funds1 from "media/guides/guides-2/Funds1.png";
import BaseTA1 from "media/guides/guides-3/BaseTA1.png";
import ExternalAccount1 from "media/guides/guides-3/ExternalAccount1.png";
import ExternalAccount2 from "media/guides/guides-3/ExternalAccount2.png";
import IndicatorsBB5 from "media/guides/guides-3/IndicatorsBB5.png";
import IndicatorsMA1 from "media/guides/guides-3/IndicatorsMA1.png";
import IndicatorsMA2 from "media/guides/guides-3/IndicatorsMA2.png";
import IndicatorsMACD4 from "media/guides/guides-3/IndicatorsMACD4.png";
import IndicatorsRSI6 from "media/guides/guides-3/IndicatorsRSI6.png";
import IndicatorsSO3 from "media/guides/guides-3/IndicatorsSO3.png";
import PlacingAnOrder1 from "media/guides/guides-3/PlacingAnOrder1.png";
import PlacingAnOrder2 from "media/guides/guides-3/PlacingAnOrder2.png";
import SelfManagedFund2 from "media/guides/guides-3/SelfManagedFund2.png";
import SelfmanagedFunds1 from "media/guides/guides-3/SelfmanagedFunds1.png";
import SLTP1 from "media/guides/guides-3/SLTP1.png";
import TradingAccount1 from "media/guides/guides-3/TradingAccount1.png";
import TradingAccount2 from "media/guides/guides-3/TradingAccount2.png";
import { ATTACH_ACCOUNT_PAGE_ROUTE } from "pages/attach-account/attach-account.constants";
import { CREATE_ACCOUNT_PAGE_ROUTE } from "pages/create-account/create-account.constants";
import { CREATE_SELF_MANAGED_FUND_PAGE_ROUTE } from "pages/create-fund/create-fund.constants";
import { WALLET_TOTAL_PAGE_ROUTE } from "pages/wallet/wallet.paths";
import React from "react";
import { DASHBOARD_ROUTE } from "routes/dashboard.routes";
import { FUNDS_ROUTE } from "routes/funds.routes";
import { GV_FOLLOW_ROUTE } from "routes/invest.routes";
import { PROGRAMS_ROUTE } from "routes/programs.routes";

export interface IGuide {
  id: string;
  canonicalName: string;
  name: string;
  content: JSX.Element;
  linkInfo?: {
    link: string;
    label: string;
  };
}

export interface INavGuide {
  id: string;
  name: string;
  guides: IGuide[];
}

const getLinkInfoDeposit = (label: string) => ({
  link: WALLET_TOTAL_PAGE_ROUTE,
  label
});

export interface IGuideLink {
  link: string;
  children: string | React.ReactNode;
}

const GuideLink: React.FC<IGuideLink> = ({ link, children }) => {
  const { linkCreator } = useToLink();
  return <Link to={linkCreator(link)}>{children}</Link>;
};

const tableCellDone = () => {
  return <td style={{ textAlign: "center" }}>✓</td>;
};

const tableCellNone = () => {
  return <td style={{ textAlign: "center" }}>-</td>;
};

export const navGuides: INavGuide[] = [
  {
    id: "guides-1",
    name: "Deposit & Withdrawal",
    guides: [
      {
        id: "deposit-1",
        canonicalName: "deposit-via-crypto-wallet",
        name: "Deposit via crypto wallet",
        content: (
          <>
            <h3>
              In order to deposit via crypto wallet simply follow the steps
              below:
            </h3>
            <ol>
              <li>Log in to your account.</li>
              <li>
                Open your{" "}
                <GuideLink link={WALLET_TOTAL_PAGE_ROUTE}>
                  <b>wallet</b>
                </GuideLink>
                .
                <ConversationImages
                  size={"large"}
                  images={[
                    {
                      id: Deposit1,
                      resizes: [
                        {
                          height: 0,
                          width: 0,
                          logoUrl: Deposit1,
                          quality: "Original"
                        },
                        {
                          height: 0,
                          width: 0,
                          logoUrl: Deposit1,
                          quality: "Low"
                        }
                      ]
                    }
                  ]}
                />
              </li>
              <li>
                Press <b>“+”</b> for the deposit through the crypto wallet
                <ConversationImages
                  size={"large"}
                  images={[
                    {
                      id: Deposit2,
                      resizes: [
                        {
                          height: 0,
                          width: 0,
                          logoUrl: Deposit2,
                          quality: "Original"
                        },
                        {
                          height: 0,
                          width: 0,
                          logoUrl: Deposit2,
                          quality: "Low"
                        }
                      ]
                    }
                  ]}
                />
              </li>

              <li>
                Copy your wallet address and head over to your external crypto
                wallet to use it for the transfer.
              </li>
              <li>
                The transaction could be found in the Deposit/Withdrawal
                section.
              </li>
            </ol>
          </>
        ),
        linkInfo: getLinkInfoDeposit("Deposit")
      },
      {
        id: "deposit-2",
        canonicalName: "deposit-via-bank-card",
        name: "Deposit via bank card",
        content: (
          <>
            <h3>To deposit using a fiat bank card follow the steps:</h3>
            <ol>
              <li>Log in to your account.</li>
              <li>
                Open your{" "}
                <GuideLink link={WALLET_TOTAL_PAGE_ROUTE}>
                  <b>wallet</b>
                </GuideLink>
                .
              </li>
              <li>
                Click <b>“Buy with card“</b>. You will be redirected to the{" "}
                <a
                  href="https://www.moonpay.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <b>Moonpay payment processor</b>.
                </a>
                <ConversationImages
                  size={"large"}
                  images={[
                    {
                      id: Deposit3,
                      resizes: [
                        {
                          height: 0,
                          width: 0,
                          logoUrl: Deposit3,
                          quality: "Original"
                        },
                        {
                          height: 0,
                          width: 0,
                          logoUrl: Deposit3,
                          quality: "Low"
                        }
                      ]
                    }
                  ]}
                />
              </li>
              <li>
                Fill in all the required details. The system will remember this
                information for future deposits.
              </li>
              <li>
                The transaction could be found in the Deposit/Withdrawal
                section.
              </li>
            </ol>
            <p>
              The minimum deposit via bank card is <b>20 EUR</b>. The payment
              processor fee for the transaction is <b>4,5%</b>.
            </p>
          </>
        ),
        linkInfo: getLinkInfoDeposit("Deposit")
      },
      {
        id: "deposit-3",
        canonicalName: "withdrawal",
        name: "Withdrawal",
        content: (
          <>
            <h3>To withdraw from your GV account follow the simple steps:</h3>
            <ol>
              <li>Log in to your account.</li>
              <li>
                Open your{" "}
                <GuideLink link={WALLET_TOTAL_PAGE_ROUTE}>
                  <b>wallet</b>
                </GuideLink>
                .
              </li>
              <li>
                Press the <b>“↑“</b> sign and fill in the data in the window
                opened: your crypto wallet address and the amount to withdraw.
                <ConversationImages
                  size={"large"}
                  images={[
                    {
                      id: Withdrawal1,
                      resizes: [
                        {
                          height: 0,
                          width: 0,
                          logoUrl: Withdrawal1,
                          quality: "Original"
                        },
                        {
                          height: 0,
                          width: 0,
                          logoUrl: Withdrawal1,
                          quality: "Low"
                        }
                      ]
                    }
                  ]}
                />
              </li>
              <li>
                <b>Confirm</b> your withdrawal in the confirmation email sent to
                your e-mail address.
              </li>
              <li>
                The transaction could be found in the Deposit/Withdrawal
                section. Before the transaction is confirmed you have an option
                to cancel your withdrawal request or resend email confirmation
                link in case the previous one has expired. After the transaction
                is confirmed in the blockchain the status of the transaction
                will be changed to “Done”.
                <ConversationImages
                  size={"large"}
                  images={[
                    {
                      id: Withdrawal2,
                      resizes: [
                        {
                          height: 0,
                          width: 0,
                          logoUrl: Withdrawal2,
                          quality: "Original"
                        },
                        {
                          height: 0,
                          width: 0,
                          logoUrl: Withdrawal2,
                          quality: "Low"
                        }
                      ]
                    }
                  ]}
                />
              </li>
            </ol>
          </>
        ),
        linkInfo: getLinkInfoDeposit("Withdrawal")
      }
    ]
  },
  {
    id: "guides-2",
    name: "Investing",
    guides: [
      {
        id: "investing-1",
        canonicalName: "funds",
        name: "Funds",
        content: (
          <>
            <section>
              <p>
                <b>Genesis Vision Funds</b> are portfolios of multiple assets,
                gathered and chosen by the manager. In contrast to investment
                Programs, Funds don’t require active participation from a
                manager necessarily. The profit in GV Funds is achieved from the
                organic price growth of assets included in the Fund, and not by
                trading activities of the manager.
              </p>
            </section>

            <section>
              <h3>How do I invest in a Fund?</h3>
              <p>
                Investing in a GV Fund is very simple. Once you have chosen a
                Fund that suits your strategy, click the “Invest” button. You
                can invest in a GV Fund with any currency in your wallet. When
                you invest in a GV Fund, your investment is accepted
                instantaneously. The same goes for withdrawals.
              </p>
            </section>

            <section>
              <h3>
                A few important notes to consider before investing in a Fund:
              </h3>
              <ul>
                <li>Check the fees before investing.</li>
                <li>
                  Check the history tab. You will see the whole story of the
                  Fund, all the rebalancing story, the investing, and the
                  withdrawals.
                </li>
                <li>
                  Check the chart to see the performance of the Fund. You can
                  choose different time frames to see the profitability of the
                  Fund.
                </li>
                <li>
                  You can withdraw at any time. The exit fee will be applying
                  when you withdraw.
                </li>
              </ul>
              <p>
                Every <b>Thursday</b> we announce a winner of our{" "}
                <b>GV Funds Weekly Challenge</b>. The Fund that shows the best
                performance during the week becomes the winner. We have also
                prepared a section with the most profitable Funds in the
                investing section to make it easier to choose a suitable Fund to
                invest in.
              </p>
              <ConversationImages
                size={"large"}
                images={[
                  {
                    id: Funds1,
                    resizes: [
                      {
                        height: 0,
                        width: 0,
                        logoUrl: Funds1,
                        quality: "Original"
                      },
                      {
                        height: 0,
                        width: 0,
                        logoUrl: Funds1,
                        quality: "Low"
                      }
                    ]
                  }
                ]}
              />
            </section>

            <section>
              <h3>How is the profit of a Fund calculated?</h3>
              <p>
                When you invest in a Fund, you{" "}
                <b>purchase all the underlying assets included within it</b>.
                The profit is received from the <b>organic price growth</b> of
                the assets in the Fund. Once the price of the assets goes up, so
                does the price of your share (or unit). When an investor
                withdraws their investment, all their funds held within the Fund
                are <b>sold</b>, and the resulting balance is withdrawn to their
                Genesis Vision wallet.
              </p>
            </section>

            <section>
              <h3>Fees</h3>
              <p>
                There are <b>two fees</b> the investor pays to the manager when
                investing in a Fund - <b>entry fee</b> and <b>exit fee</b>.
              </p>
              <p>
                <b>Entry fee</b> is the commission the investor pays to the
                manager for investing in the Fund. Set by the manager and
                calculated as a percentage of the amount invested. Fee range is
                0-10%.{" "}
              </p>
              <p>
                <b>Exit fee</b> is the commission that the investor pays the
                manager for withdrawing funds from the Fund. Set by the manager
                and calculated as a percentage of the amount invested. Fee range
                is 0-10%. Note: if the manager closes the Fund, the investment
                stays there till the investor decides to withdraw it, no exit
                fee applies in this case.
              </p>
              <p>
                Besides the trader’s entry and exit fee, there is a{" "}
                <b>Genesis Vision commission</b> of 0.5% charged from every
                investment in Funds.
              </p>
            </section>

            <section>
              <h3>Withdrawal from Funds</h3>
              <p>
                Withdrawal from Funds is made as a percentage because it is
                almost impossible to calculate the exact investors’ share upon
                the time of withdrawal. This is due to all the underlying
                commissions and conversions that take place upon submission of
                the trades to the selected withdrawal currency.
              </p>
            </section>
          </>
        ),
        linkInfo: {
          link: FUNDS_ROUTE,
          label: "Funds"
        }
      },
      {
        id: "investing-2",
        canonicalName: "programs",
        name: "Programs",
        content: (
          <>
            <section>
              <p>
                <b>Programs</b> are similar to PAMM accounts. A trader has the
                opportunity to create an investment program, where he sets the
                fees and the duration of the reporting period (up to a maximum
                of 90 days) along with other parameters. He will have the
                opportunity to trade cryptocurrency or Forex markets with a view
                to earn profits for himself and investors that may wish to join
                him on this trading journey.
              </p>
              <p>
                This Program is publicly available for investors to join. Each
                request will be processed at the beginning of each period. The
                manager trades with his own and investors’ cumulative balance.
                Profits or losses are equally distributed among the investors
                based on their share of the program.
              </p>
            </section>

            <section>
              <h3>How to choose a Program to invest in?</h3>
              <p>
                Each Program has a variety of <b>key performance indicators</b>{" "}
                - age of the Program, equity, drawdown, leverage, fees, stop out
                level, Sharpe ratio, Calmar ratio, Sortino ratio.
                <br />
                You can choose the Programs that fit your investment profile by
                using the various filters (currency type, risk level, trading
                history, etc.).
              </p>
              <p>
                Investment requests in Programs are automatically processed at
                the <b>beginning of the reporting period</b>. Simply click the{" "}
                <b>"Invest"</b> button on the page of the desired investment{" "}
                <b>Program</b> that you want to use. A trader may opt to end
                their reporting period manually for many reasons. This is at the
                complete discretion of the trader.
                <br />
                You can cancel your <b>investment request</b> unless it’s
                already processed. This can be done from the dashboard section,
                or directly on the program page their requests for investing in
                a selected <b>Program</b>.
              </p>
            </section>

            <section>
              <h3>Where can I see my investment?</h3>
              <p>
                Your investment could be found both on your Dashboard in the{" "}
                <b>Investing section</b> and on the page of the Program you
                invested in.
              </p>
            </section>

            <section>
              <h3>Fees</h3>
              <p>
                The table below shows all the commissions paid by investors and
                managers in a Program.
              </p>
              <table>
                <thead>
                  <tr>
                    <th>
                      <b>Type</b>
                    </th>
                    <th>
                      <b>Fee</b>
                    </th>
                    <th>
                      <b>For investors</b>
                    </th>
                    <th>
                      <b>For manager</b>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={4}>
                      <b>Platform fee</b>
                    </td>
                  </tr>
                  <tr>
                    <td>GV commission</td>
                    <td>0.5%</td>
                    {tableCellDone()}
                    {tableCellNone()}
                  </tr>
                  <tr>
                    <td>Success fee</td>
                    <td>0 – 10%*</td>
                    {tableCellDone()}
                    {tableCellNone()}
                  </tr>
                  <tr>
                    <td colSpan={4}>
                      <b>Manager fee</b>
                    </td>
                  </tr>
                  <tr>
                    <td>Management fee</td>
                    <td>0 – 20% (annual)</td>
                    {tableCellDone()}
                    {tableCellNone()}
                  </tr>
                  <tr>
                    <td>Success fee</td>
                    <td>0 – 50%</td>
                    {tableCellDone()}
                    {tableCellNone()}
                  </tr>
                  <tr>
                    <td>
                      <b>Trading fee</b>
                    </td>
                    <td>Depends on broker</td>
                    {tableCellDone()}
                    {tableCellDone()}
                  </tr>
                </tbody>
              </table>
              <ol>
                <li>
                  <b>GV commission</b>: is the fee charged by the platform that
                  is a percentage of the initial amount invested in a Program.
                </li>
                <li>
                  <b>Platform Success fee</b>: is the fee charged on any profits
                  generated by Programs. It is calculated according to the{" "}
                  <a
                    href="https://www.investopedia.com/terms/h/highwatermark.asp"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <b>HWM system</b>
                  </a>{" "}
                  as a percentage of the profit received from a Program during
                  the reporting period or from a trade transaction when copy
                  trading. We do not charge a Success Fee if there were no
                  profits made.
                </li>
                <li>
                  <b>Management fee</b>: The commission that is paid to the
                  manager by an investor for the actual asset management period.
                  Management fee is defined in annual percentage and is charged
                  at the end of each reporting period.
                </li>
                <li>
                  <b>Success fee</b>: is the fee charged on profits generated by
                  Programs. It is calculated according to the{" "}
                  <a
                    href="https://www.investopedia.com/terms/h/highwatermark.asp"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <b>HWM system</b>
                  </a>{" "}
                  as a percentage of the profit received from a Program during
                  the reporting period. No profit means no Success fee is
                  charged.
                </li>
                <li>
                  <b>Trading fee</b>: is divided among all Program participants.
                </li>
              </ol>
              <p>
                *This percentage depends on the amount of GVT stored in the
                wallet. The maximum Success fee without any discounts applied is
                10%. For every 1 000 GVT stored in the wallet reduces the
                success fee by 1% (i.e. an investor holding 1 000 GVT will only
                pay a 9% Success Fee, an investor holding 10 000 GVT and more
                will pay no Success Fees).
              </p>
            </section>

            <section>
              <h3>Stop Out</h3>
              <p>
                The manager sets Stop out level when creating a program. It can
                be from <b>10 - 100%</b> and can only be changed downward. A
                stop out is a compulsory closing of positions at current market
                prices when a loss reaches the stop out level to{" "}
                <b>protect investors</b>.
              </p>
              <p>
                For investors, there is a checkbox <b>"Ignore Stop Out"</b>{" "}
                available.
              </p>
              <p>If the Stop-Out level reaches its limit:</p>
              <ul>
                <li>
                  “Ignore SO” is turned <b>ON</b> your investment (minus losses)
                  is reinvested in the Program keeping all configured
                  conditions.
                </li>
                <li>
                  “Ignore SO” is turned <b>OFF </b> your investment (minus
                  losses) is returned to your wallet.
                </li>
              </ul>
            </section>

            <section>
              <h3>Reinvest profit</h3>
              <p>
                You can enable or disable reinvestment on the page of each
                Program. For this, you have a <b>reinvestment</b> trigger (
                <b>Reinvest profit</b>) switched on or off. If you have,
                reinvesting <b>turned on</b>, then all the profits at the end of
                the reporting period will be reinvested into the same Program.
                If you have, reinvesting <b>turned off</b>, all profits are{" "}
                <b>paid in GVT</b> at the end of the reporting period and
                transferred to your wallet. The initial investment stays in the
                Program in both cases <b>until you withdraw</b> your investment
                from the Program.
              </p>
            </section>

            <section>
              <h3>Withdrawal from Programs</h3>
              <p>
                To withdraw funds, you need to send a request. It could be done
                on the Program page, button <b>“Withdraw”</b>. Your withdrawal
                request will be processed at the end of the reporting period of
                the Program.
              </p>
            </section>

            <section>
              <h3>
                A few important tips to remember when investing in the Program:
              </h3>
              <ul>
                <li>You can invest several times in the same Program.</li>
                <li>
                  Your investment gets accepted at the beginning of each
                  reporting period.
                </li>
                <li>
                  You need to pass KYC to be able to invest more than 1000 USD
                  in total.
                </li>
                <li>
                  If the “available to invest” amount in the Program is 0, you
                  can hit the “Notify me” button and get a notification when it
                  is possible to invest in this Program again.
                </li>
              </ul>
            </section>
          </>
        ),
        linkInfo: {
          link: PROGRAMS_ROUTE,
          label: "Programs"
        }
      },
      {
        id: "investing-3",
        canonicalName: "copy-trades",
        name: "Copy trades",
        content: (
          <>
            <section>
              <p>
                Genesis Vision now offers a unique opportunity to follow
                external trades from <b>Binance</b>.
              </p>
            </section>

            <section>
              <h3>How do I subscribe to a trader?</h3>
              <ol>
                <li>
                  Open an account on{" "}
                  <a
                    href="https://www.binance.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <b>Binance</b>
                  </a>
                  . You can find the instructions on how to do that{" "}
                  <a
                    href="https://www.binance.com/en/support/faq/115003764911"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <b>here</b>
                  </a>
                  .
                </li>
                <li>
                  Attach your Binance trading account to your GV account{" "}
                  <b>through API</b>. It could be done in the overview section
                  on your GV Dashboard. The instructions on how to create an API
                  are{" "}
                  <a
                    href="https://binance.zendesk.com/hc/en-us/articles/360002502072"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <b>here</b>
                  </a>
                  . Important: to follow a trader with your Binance account
                  create an API key <b>with the trading rights</b>.
                  <ConversationImages
                    size={"large"}
                    images={[
                      {
                        id: CopyTrades1,
                        resizes: [
                          {
                            height: 0,
                            width: 0,
                            logoUrl: CopyTrades1,
                            quality: "Original"
                          },
                          {
                            height: 0,
                            width: 0,
                            logoUrl: CopyTrades1,
                            quality: "Low"
                          }
                        ]
                      }
                    ]}
                  />
                </li>
                <li>
                  Choose a Binance trader{" "}
                  <GuideLink link={GV_FOLLOW_ROUTE}>
                    <b>here</b>
                  </GuideLink>
                  . Use the tag “Binance” to filter the trading accounts.
                </li>
                <li>
                  Press the <b>“Follow trades” button</b> on the trader’s page.
                  It will offer you to choose an existing External account of
                  yours or to attach a new External account.
                </li>
                <li>
                  Choose the type of subscription (read about the types of
                  subscription below) and a tolerance percentage (maximum
                  possible deviation of the trade price from 0% to 20%).
                  <ConversationImages
                    size={"large"}
                    images={[
                      {
                        id: CopyTrades2,
                        resizes: [
                          {
                            height: 275,
                            width: 100,
                            logoUrl: CopyTrades2,
                            quality: "Original"
                          },
                          {
                            height: 275,
                            width: 100,
                            logoUrl: CopyTrades2,
                            quality: "Low"
                          }
                        ]
                      }
                    ]}
                  />
                </li>
              </ol>
            </section>

            <section>
              <h3>What Subscription types are available?</h3>
              <p>There are three available subscription types:</p>
              <ul>
                <li>
                  <b>By balance</b>. When choosing this subscription, the volume
                  of the position opened is proportional{" "}
                  <b>to the coin balance</b> of the leader and the follower.
                  <br />
                  For example, Provider has 100 USDT and 20 GVT on the External
                  account (in this example 1 GVT = 2 USDT).
                  <br />
                  Provider balance = 140 USDT (100 + 20 * 2)
                  <br />
                  The subscriber has 30 USDT and 20 GVT.
                  <br />
                  Subscriber balance = 70 USDT (30 + 20 * 2)
                  <br />
                  Provider opens a trade to buy ADAUSDT, volume = 100.
                  <br />
                  The subscriber will copy the position for the same asset
                  (ADAUSDT) but with a volume of 30.
                </li>
                <li>
                  <b>Percentage</b>. When you choose this subscription, you{" "}
                  <b>set the volume percentage</b> of the Provider’s opened
                  position that the subscription will copy. Meaning if the
                  Provider has opened a trade for 100 GVTBTC while the
                  percentage the Subscriber has set is 30%, it will open the
                  trade on the Subscriber trade account for 30 GVTBTC.
                </li>
                <li>
                  <b>Fixed</b>. By choosing this subscription type, the
                  positions will open only for the fixed amount that the
                  Subscriber has set in the USD equivalent field when
                  subscribing to the signal program/trading account. It does not
                  depend on the size of the trade of the provider.
                </li>
              </ul>
            </section>

            <section>
              <h3>Fees</h3>
              <p>The table shows all the commissions paid by Subscribers.</p>
              <table>
                <thead>
                  <tr>
                    <th>
                      <b>Type</b>
                    </th>
                    <th>
                      <b>Fee</b>
                    </th>
                    <th>
                      <b>For opening the transaction</b>
                    </th>
                    <th>
                      <b>For closing the transaction</b>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Trading fee</td>
                    <td>
                      All info is{" "}
                      <a
                        href="https://www.binance.com/en/fee/schedule"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <b>here</b>
                      </a>
                    </td>
                    {tableCellDone()}
                    {tableCellDone()}
                  </tr>
                  <tr>
                    <td>Success fee</td>
                    <td>0 – 50%</td>
                    {tableCellNone()}
                    {tableCellDone()}
                  </tr>
                  <tr>
                    <td>Platform Success fee</td>
                    <td>0 – 10%*</td>
                    {tableCellNone()}
                    {tableCellDone()}
                  </tr>
                  <tr>
                    <td>Volume fee</td>
                    <td>0 – 30%</td>
                    {tableCellDone()}
                    {tableCellDone()}
                  </tr>
                  <tr>
                    <td>GV Commission</td>
                    <td>15%</td>
                    {tableCellDone()}
                    {tableCellDone()}
                  </tr>
                </tbody>
              </table>
              <ol>
                <li>
                  <b>Trading fee</b> is the commission paid for opening and
                  closing the transaction.
                </li>
                <li>
                  <b>Success fee</b> is the fee charged on profits from a trade
                  transaction when Copy Trading. It is calculated according to
                  the{" "}
                  <a
                    href="https://www.investopedia.com/terms/h/highwatermark.asp"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <b>HWM system</b>
                  </a>{" "}
                  as a percentage of the profit received from a trade
                  transaction when copy trading. No profit means no Success fee
                  is charged.
                </li>
                <li>
                  <b>Platform Success fee</b> is the fee charged on any profits
                  generated from a trade transaction when Copy Trading. It is
                  calculated according to the{" "}
                  <a
                    href="https://www.investopedia.com/terms/h/highwatermark.asp"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <b>HWM system</b>
                  </a>{" "}
                  as a percentage of the profit from a trade transaction when
                  copy trading.
                </li>
                <li>
                  The <b>volume fee</b> is a volume commission charged for each
                  transaction. It varies from 0 to 30% of the amount of paid
                  trading fee by the trader.
                </li>
                <li>
                  <b>GV commission</b> is 15% of the amount of the Trading
                  Commission on Binance.
                </li>
              </ol>
              <p>
                For example: Binance trading fee = 0.1%.
                <br />
                GV Commission = 15% from the Binance commission.
                <br />
                Total trading fee = 0.115%
              </p>
              <p>
                * This percentage depends on the amount of GVT stored in the
                wallet. The maximum Success fee without any discounts applied is
                10%. For every 1 000 GVT stored in the wallet reduces the
                success fee by 1% (i.e. an investor holding 1 000 GVT will only
                pay a 9% Success Fee, an investor holding 10 000 GVT will pay no
                Success Fees).
              </p>
            </section>

            <section>
              <h3>How do I cancel the subscription?</h3>
              <ol>
                <li>
                  Open your trading account page which you have used for the
                  subscription.
                </li>
                <li>
                  Scroll down to the Subscription section and press the{" "}
                  <b>“Unfollow” button</b>.
                  <ConversationImages
                    size={"large"}
                    images={[
                      {
                        id: CopyTrades3,
                        resizes: [
                          {
                            height: 0,
                            width: 0,
                            logoUrl: CopyTrades3,
                            quality: "Original"
                          },
                          {
                            height: 0,
                            width: 0,
                            logoUrl: CopyTrades3,
                            quality: "Low"
                          }
                        ]
                      }
                    ]}
                  />
                </li>
              </ol>
              <p>
                The only available type of closing for the Binance trades is{" "}
                <b>manual closing</b>. You unsubscribe from the signal provider,
                but all the opened trades stay open. The Subscriber can close
                the open trades manually at any time. This means when the
                Provider closes their trades they will not be closed on the
                Subscribers trading account.
              </p>
            </section>

            <section>
              <h3>Please note:</h3>
              <ul>
                <li>
                  You can always close a trade by yourself regardless of the
                  type of subscription. To do that you need login to your
                  Binance account and sell this coin.
                </li>
                <li>
                  If the provider opens a position, and the subscriber does not
                  have enough funds to open precisely the same amount, then the
                  Subscriber transaction will not open.
                </li>
                <li>
                  If the calculated lot volume is less than the minimum lot
                  volume for this symbol on Binance, then the Subscriber deal
                  will not open either.
                </li>
                <li>
                  You can unsubscribe anytime, no exit fees apply. The opened
                  trades will be closed according to the way you choose.
                </li>
                <li>
                  You can only use the copy trading functionality if you are a
                  GVT holder. To subscribe to the trading signals of a manager,
                  an investor needs to have GVT. Signal fees are withdrawn from
                  the GVT wallet.
                </li>
                <li>
                  You can view the entire history of copying transactions in the
                  Trading log on your trading account page.
                </li>
              </ul>
            </section>
          </>
        ),
        linkInfo: {
          link: GV_FOLLOW_ROUTE,
          label: "Follow"
        }
      }
    ]
  },
  {
    id: "guides-3",
    name: "Trading",
    guides: [
      {
        id: "trading-1",
        canonicalName: "trading-account",
        name: "Trading account",
        content: (
          <>
            <section>
              <p>
                Create a trading account and get access to a variety of
                instruments (depending on your desired broker.) Trade Forex,
                Crypto, CFD, Stocks, Metals, Indices and Commodities.
              </p>
            </section>

            <section>
              <h3>How do I open a trading account?</h3>

              <p>Follow these steps to open a trading account:</p>
              <ol>
                <li>
                  Login and open your{" "}
                  <GuideLink link={DASHBOARD_ROUTE}>
                    <b>Dashboard</b>
                  </GuideLink>
                  .
                </li>

                <li>
                  In the trading section find the button{" "}
                  <b>“Open trading account”</b> or press <b>“Select product”</b>{" "}
                  in the overview section and choose the Trading account.
                  <ConversationImages
                    size={"large"}
                    images={[
                      {
                        id: TradingAccount1,
                        resizes: [
                          {
                            height: 0,
                            width: 0,
                            logoUrl: TradingAccount1,
                            quality: "Original"
                          },
                          {
                            height: 0,
                            width: 0,
                            logoUrl: TradingAccount1,
                            quality: "Low"
                          }
                        ]
                      }
                    ]}
                  />
                </li>
                <li>
                  Select the broker and fill in all the required information.
                </li>

                <li>Deposit at least a minimum investment amount.</li>

                <li>
                  Press the button <b>“Create account”</b>.
                  <ConversationImages
                    size={"large"}
                    images={[
                      {
                        id: TradingAccount2,
                        resizes: [
                          {
                            height: 0,
                            width: 0,
                            logoUrl: TradingAccount2,
                            quality: "Original"
                          },
                          {
                            height: 0,
                            width: 0,
                            logoUrl: TradingAccount2,
                            quality: "Low"
                          }
                        ]
                      }
                    ]}
                  />
                </li>
              </ol>
              <p></p>
              <p>
                The credentials to your trading account will be sent to your
                email address. You will find your login, password, and server
                address there as well as the link to download the trading
                terminal.
              </p>
            </section>

            <section>
              <h3>A few tips regarding account creation:</h3>

              <ul>
                <li>
                  For trading on Roboforex and Exante, you will need to pass the
                  KYC.
                </li>

                <li>
                  The minimum deposit for Binance is <b>20 USD</b>, for
                  Roboforex, Exante, and Huobi - <b>50 USD</b>.
                </li>
              </ul>
            </section>
          </>
        ),
        linkInfo: {
          link: CREATE_ACCOUNT_PAGE_ROUTE,
          label: "Create trading account"
        }
      },
      {
        id: "trading-2",
        canonicalName: "external-account",
        name: "External account",
        content: (
          <>
            <h3>How do I attach my Binance account?</h3>
            <p>
              Genesis Vision now offers an opportunity to attach your external
              Binance account to your GV account. It will allow you to become a
              signal provider while trading on Binance and also you will be able
              to subscribe to another Binance signal provider.
            </p>
            <p>To attach an external account follow the steps below:</p>
            <ol>
              <li>
                Login and open your{" "}
                <GuideLink link={DASHBOARD_ROUTE}>
                  <b>Dashboard</b>
                </GuideLink>
                .
              </li>

              <li>
                Press <b>“Select product”</b> in the Overview section and choose
                Attach external account.
                <ConversationImages
                  size={"large"}
                  images={[
                    {
                      id: ExternalAccount1,
                      resizes: [
                        {
                          height: 0,
                          width: 0,
                          logoUrl: ExternalAccount1,
                          quality: "Original"
                        },
                        {
                          height: 0,
                          width: 0,
                          logoUrl: ExternalAccount1,
                          quality: "Low"
                        }
                      ]
                    }
                  ]}
                />
              </li>
              <li>
                After you press the button fill in the API key and API secret.
                The instructions on how to do that could be found{" "}
                <GuideLink link={GV_FOLLOW_ROUTE}>
                  <b>here</b>
                </GuideLink>
                . Important: if you are attaching the account for signal
                providing purposes create an API key without the trading rights,
                if you are planning to use the account to follow other traders
                you should create the API key with the trading rights.
              </li>
              <li>
                When the API key and API secret are filled in press{" "}
                <b>“Attach external account”</b>.
              </li>
            </ol>
            <p>Your Binance account will appear in your trading section.</p>
            <ConversationImages
              size={"large"}
              images={[
                {
                  id: ExternalAccount2,
                  resizes: [
                    {
                      height: 0,
                      width: 0,
                      logoUrl: ExternalAccount2,
                      quality: "Original"
                    },
                    {
                      height: 0,
                      width: 0,
                      logoUrl: ExternalAccount2,
                      quality: "Low"
                    }
                  ]
                }
              ]}
            />
          </>
        ),
        linkInfo: {
          link: ATTACH_ACCOUNT_PAGE_ROUTE,
          label: "Attach Binance account"
        }
      },
      {
        id: "trading-3",
        canonicalName: "self-managed-fund",
        name: "Self-managed Fund",
        content: (
          <>
            <section>
              <p>
                Anyone can create a private Self-Managed Fund and diversify
                across hundreds of crypto assets in seconds from one interface
                as we have integrated the leading exchanges — Binance and Huobi.
                Experience the ease of managing your own capital with our
                powerful tool and add, remove or adjust the percentage
                weightings of your portfolio assets without the hurdles of going
                to the exchanges directly. Track and manage your entire Fund
                from our sleek web interface or your smartphone.
              </p>
            </section>
            <section>
              <h3>How do I create a self-managed Fund?</h3>
              <p>
                In case you want to have a Fund all by yourself, you can create
                a <b>self-managed Fund</b>. It works exactly the same as the
                regular Fund, but it doesn’t have investors in it.
              </p>
              <p>To create a self-managed Fund follow these easy steps:</p>
              <ol>
                <li>
                  Login and open your{" "}
                  <GuideLink link={DASHBOARD_ROUTE}>
                    <b>Dashboard</b>
                  </GuideLink>
                  .
                </li>

                <li>
                  Press <b>“Select product”</b> in the Overview section and
                  choose the Self-managed Fund.
                  <ConversationImages
                    size={"large"}
                    images={[
                      {
                        id: SelfmanagedFunds1,
                        resizes: [
                          {
                            height: 0,
                            width: 0,
                            logoUrl: SelfmanagedFunds1,
                            quality: "Original"
                          },
                          {
                            height: 0,
                            width: 0,
                            logoUrl: SelfmanagedFunds1,
                            quality: "Low"
                          }
                        ]
                      }
                    ]}
                  />
                </li>
                <li>
                  Fill in all the required information and deposit at least{" "}
                  <b>50 GVT</b> to your Fund.
                </li>

                <li>
                  Press the <b>“Create Fund”</b> button.
                  <ConversationImages
                    size={"large"}
                    images={[
                      {
                        id: SelfManagedFund2,
                        resizes: [
                          {
                            height: 0,
                            width: 0,
                            logoUrl: SelfManagedFund2,
                            quality: "Original"
                          },
                          {
                            height: 0,
                            width: 0,
                            logoUrl: SelfManagedFund2,
                            quality: "Low"
                          }
                        ]
                      }
                    ]}
                  />
                </li>
              </ol>
              <h3>Tips:</h3>
              <ul>
                <li>
                  You have to have at least <b>1% of GVT</b> in your Fund.
                </li>
                <li>
                  You can reallocate 100% of your self-managed Fund anytime
                  while for the public Fund only 3% per day is available.
                </li>
                <li>
                  Self-managed Fund can be upgraded to the public Fund anytime.
                  More information you can find in this{" "}
                  <a
                    href="https://blog.genesis.vision/introducing-self-managed-funds-dcac1df57bbe"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <b>article</b>
                  </a>
                  .
                </li>
              </ul>
            </section>
          </>
        ),
        linkInfo: {
          link: CREATE_SELF_MANAGED_FUND_PAGE_ROUTE,
          label: "Create self-managed Fund"
        }
      },
      {
        id: "trading-4",
        canonicalName: "placing-an-order",
        name: "Placing an order",
        content: (
          <>
            <section>
              <p>In general, there are just two order types: sell and buy.</p>
              <ConversationImages
                size={"large"}
                images={[
                  {
                    id: PlacingAnOrder1,
                    resizes: [
                      {
                        height: 0,
                        width: 0,
                        logoUrl: PlacingAnOrder1,
                        quality: "Original"
                      },
                      {
                        height: 0,
                        width: 0,
                        logoUrl: PlacingAnOrder1,
                        quality: "Low"
                      }
                    ]
                  }
                ]}
              />
            </section>

            <section>
              <h3>Market order</h3>
              <p>
                Market order is a request to buy or sell a financial instrument
                at the current market price. The order is executed instantly at
                a price shown in the market order window.
              </p>
              <p>
                In the market order window, the trader can set the maximum
                allowed price deviation of order execution from the requested
                price. In case of a drastic price change and network delay the
                position opening is performed in the following ways:
              </p>
              <ul>
                <li>
                  If the current market price is beyond the specified deviation,
                  the trader will be provided with a new market price. In this
                  case, the client may accept the new price for the order to be
                  executed.
                </li>

                <li>
                  If the current market price remains within the set deviation,
                  the position will be opened at this market price.
                </li>
              </ul>
            </section>

            <section>
              <h3>Pending Order</h3>
              <p>
                <b>Pending Order</b> is used by traders to open a trading
                position when the price reaches a certain level. It is used when
                the trader is not satisfied with the current market price and is
                willing to wait until the price changes.
              </p>
              <p>
                Pending orders fall into two categories, <b>Limit</b> orders and{" "}
                <b>Stop</b> orders.
              </p>
              <ul>
                <li>
                  Sell Limit – a sell order at a price higher than the current
                  market price.
                </li>

                <li>
                  Buy Limit – a buy order at a price lower than the current
                  market price.
                </li>

                <li>
                  Sell Stop – a sell order at a price lower than the current
                  market price.
                </li>

                <li>
                  Buy Stop – a buy order at a price higher than the current
                  market price.
                </li>
              </ul>
              <p>
                The order of buying or selling is triggered when the market
                price reaches the price the trader has set in order. In the case
                of Sell Limit and Buy Limit orders, they are executed at the
                price which the trader has set or at a better price. In the case
                of Sell Stop and Buy Stop orders, they are executed at the price
                which has been set by the trader, excluding the cases of price
                gaps, when the order may be executed at the first price
                available in the market.
              </p>
            </section>

            <section>
              <h3>Here are the most common order types:</h3>
              <table>
                <thead>
                  <tr>
                    <th>
                      <b>Order type</b>
                    </th>
                    <th>
                      <b>Description</b>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <b>Market order</b>
                    </td>
                    <td>
                      The simplest of all order types. It allows you to buy or
                      sell securities at the best available price given in the
                      market at the moment your order is sent for execution.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Limit order</b>
                    </td>
                    <td>
                      Allow you to specify the maximum price you’ll pay when
                      buying securities, or the minimum you’ll accept when
                      selling them.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Stop-limit order</b>
                    </td>
                    <td>
                      Combines a stop order with a limit order. With this order
                      type, you enter two price points: a stop price and a limit
                      price. If the market value of the security reaches your
                      stop price (first price point), it automatically creates a
                      limit order (second price point), as long as it happens
                      within the specified duration time.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Trailing stop order</b>
                    </td>
                    <td>
                      Combines a stop order with a limit order. With this order
                      type, you enter two price points: a stop price and a limit
                      price. If the market value of the security reaches your
                      stop price (first price point), it automatically creates a
                      limit order (second price point), as long as it happens
                      within the specified duration time.
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section>
              <h3>How to place an order?</h3>
              <p>To open an order follow these steps:</p>
              <ol>
                <li>Open MT4/MT5 and login into your trading account.</li>

                <li>
                  Open an order window by clicking twice on the symbol or on the
                  special icon on the left upper corner.
                </li>

                <li>
                  Fill in the details: the symbol, type of order, volume, etc.
                </li>

                <li>
                  Press the <b>“Place”</b> button.
                  <ConversationImages
                    size={"large"}
                    images={[
                      {
                        id: PlacingAnOrder2,
                        resizes: [
                          {
                            height: 0,
                            width: 0,
                            logoUrl: PlacingAnOrder2,
                            quality: "Original"
                          },
                          {
                            height: 0,
                            width: 0,
                            logoUrl: PlacingAnOrder2,
                            quality: "Low"
                          }
                        ]
                      }
                    ]}
                  />
                </li>
              </ol>
            </section>
          </>
        ),
        linkInfo: {
          link: CREATE_SELF_MANAGED_FUND_PAGE_ROUTE,
          label: "Create self-managed Fund"
        }
      },
      {
        id: "trading-5",
        canonicalName: "stop-loss-and-take-profit",
        name: "Stop Loss and Take Profit",
        content: (
          <>
            <section>
              <p>
                Firstly, let’s figure out what stop loss and take profit are:
              </p>
              <p>
                <b>Stop Loss</b> is used by traders to secure themselves from
                losing more than they are ready to. This order is used to
                minimize losses, in case the price of a financial instrument
                moves in an unprofitable direction. Stop Loss is always
                connected to an open position or a pending order. To check
                whether conditions of this order are met for long positions the
                Bid price is used, and for short positions, the Ask price is
                used.
              </p>
              <p>
                <b>Take Profit</b> is used by traders to be able to collect
                profit when the price reaches the level after which they think
                the price will move in an unprofitable direction. In other
                words, this order intended to make a profit when the price of a
                financial instrument reaches the desired level. Execution of
                this order closes the position. A Take Profit order is always
                connected with an open position or a pending order. To check
                whether conditions of this order are met for long positions the
                Bid price is used, and for short positions, the Ask price is
                used.
              </p>
            </section>

            <section>
              <h3>How to use stop loss and take profit?</h3>
              <p>
                To set stop loss and/or take profit put the desired value in the
                order window when creating an order:
              </p>
              <ConversationImages
                size={"large"}
                images={[
                  {
                    id: SLTP1,
                    resizes: [
                      {
                        height: 0,
                        width: 0,
                        logoUrl: SLTP1,
                        quality: "Original"
                      },
                      {
                        height: 0,
                        width: 0,
                        logoUrl: SLTP1,
                        quality: "Low"
                      }
                    ]
                  }
                ]}
              />
            </section>
          </>
        )
      },
      {
        id: "trading-6",
        canonicalName: "base-ta",
        name: "Base TA",
        content: (
          <>
            <h3>What is base TA and how to use it?</h3>
            <p>
              Technical analysis is the study of past market data to forecast
              the direction of future price movements. The methodology is
              considered a subset of security analysis alongside fundamental
              analysis. Let’s see how to use TA in day trading.
            </p>
            <p>
              Most traders prefer to use both fundamental and technical analysis
              because the more quality information you collect the better
              trading results you get.
            </p>
            <p>
              Technical analysis is built on two main beliefs – the cyclicality
              of the market and the fact that prices, volume, and volatility
              tend to run in distinct trends.
            </p>
            <p>
              Due to human nature, history tends to repeat itself. This can also
              be applied to market history. The sequence of events doesn’t
              repeat itself in exactly the same way, but you have to admit that
              the patterns are generally similar. Due to this, you can predict
              long-term or short-term price behavior.
            </p>
            <p>
              When speaking about the long-term, business cycles inherently have
              a tendency to repeat themselves. It is driven by credit booms when
              debt keeps rising above income for a period and eventually leads
              to financial pain when there is not enough cash to cover these
              debts. The result is slow progressive gains in stocks and other
              “risk-on” trades (e.g., carry trading) during an expansion and a
              sharp fall upon a recession.
            </p>
            <p>
              There is a belief that due to the collective, patterned nature of
              the market participants they are doomed to repeat the behavior of
              the past. In case we accept that the behavior is indeed
              repeatable, the output is that it is possible to recognize it by
              looking at past price and volume data and we can use this
              information to make predictions about future price patterns. The
              ability of the trader to locate opportunities where behavior is
              likely to be repeated allows them to identify trades where the
              risk/reward runs in their favor.
            </p>
            <p>
              Thus, technical analysis assumes that a market’s price discounts
              all information influencing a particular market. We can say that
              the difference between the fundamental and technical analysis is
              focusing on identifying price trends and the extent to which
              market participants value certain information, while fundamental
              events impact financial markets, such as news and economic data if
              this information already reflects asset prices upon release.
            </p>
            <p>
              The simplest method to approach technical analysis is through a
              basic candlestick price chart. The chart shows price history and
              can demonstrate the buying and selling dynamics of price within a
              particular period of time.
            </p>
            <ConversationImages
              size={"large"}
              images={[
                {
                  id: BaseTA1,
                  resizes: [
                    {
                      height: 0,
                      width: 0,
                      logoUrl: BaseTA1,
                      quality: "Original"
                    },
                    {
                      height: 0,
                      width: 0,
                      logoUrl: BaseTA1,
                      quality: "Low"
                    }
                  ]
                }
              ]}
            />
            <p>
              Some traders often use technical indicators along with the price
              charts. Specialized forms of technical analysis also take place
              when speaking about price trend prediction. Some use parts of
              several different methods.
            </p>
          </>
        )
      },
      {
        id: "trading-7",
        canonicalName: "base-indicators",
        name: "Base indicators",
        content: (
          <>
            <section>
              <p>
                Technical analysis could be helpful for traders whether they are
                interested in forex trading, commodities trading, or share
                trading. It is highly recommended for a trader to include
                technical analysis in their strategy, and this includes studying
                various trading indicators. Trading indicators are mathematical
                calculations, which are plotted as lines on a price chart and
                can help traders identify certain signals and trends within the
                market.
              </p>
              <p>
                Trading indicators could be divided into leading indicators and
                lagging indicators. The difference between these two types of
                indicators is in an operation algorithm. A leading indicator is
                a forecast signal that predicts future price movements, while a
                lagging indicator looks at past trends and indicates momentum.
              </p>
              <p>Here are the top most popular indicators:</p>
            </section>

            <section>
              <h3>1. Moving average (MA)</h3>
              <p>
                The MA – or ‘simple moving average’ (SMA) – is an indicator
                traders use for the identification of the direction of a current
                price trend, without the interference of shorter-term price
                spikes. The moving average indicator combines price points of a
                financial instrument over a specified time frame and divides it
                by the number of data points to present a single trend line.
              </p>
              <p>
                The length of MA defines which data is being used. For example,
                a 200-day MA requires 200 days of data. By using the MA
                indicator, you can study levels of support and resistance and
                see previous price action (the history of the market). This
                means you can also determine possible future patterns.
              </p>
              <ConversationImages
                size={"large"}
                images={[
                  {
                    id: IndicatorsMA1,
                    resizes: [
                      {
                        height: 0,
                        width: 0,
                        logoUrl: IndicatorsMA1,
                        quality: "Original"
                      },
                      {
                        height: 0,
                        width: 0,
                        logoUrl: IndicatorsMA1,
                        quality: "Low"
                      }
                    ]
                  }
                ]}
              />
            </section>

            <section>
              <h3>2. Exponential moving average (EMA)</h3>
              <p>
                EMA is another form of moving average. Unlike the SMA, it places
                a greater weight on recent data points, which makes data more
                responsive to new information. When traders use EMA with other
                indicators it can be quite helpful to confirm significant market
                moves and gauge their legitimacy.
              </p>
              <p>
                The most popular EMAs are 12- and 26-day EMAs for short-term
                averages, whereas the 50- and 200-day EMAs are used as long-term
                trend indicators.
              </p>
              <ConversationImages
                size={"large"}
                images={[
                  {
                    id: IndicatorsMA2,
                    resizes: [
                      {
                        height: 0,
                        width: 0,
                        logoUrl: IndicatorsMA2,
                        quality: "Original"
                      },
                      {
                        height: 0,
                        width: 0,
                        logoUrl: IndicatorsMA2,
                        quality: "Low"
                      }
                    ]
                  }
                ]}
              />
            </section>

            <section>
              <h3>3. Stochastic oscillator</h3>
              <p>
                A stochastic oscillator is an indicator that compares a specific
                closing price of an asset to a range of its prices over time –
                showing momentum and trend strength. It uses a scale of 0 to
                100. A reading below 20 generally represents an oversold market
                and a reading above 80 an overbought market. However, if a
                strong trend is present, a correction or rally will not
                necessarily ensue.
              </p>
              <ConversationImages
                size={"large"}
                images={[
                  {
                    id: IndicatorsSO3,
                    resizes: [
                      {
                        height: 0,
                        width: 0,
                        logoUrl: IndicatorsSO3,
                        quality: "Original"
                      },
                      {
                        height: 0,
                        width: 0,
                        logoUrl: IndicatorsSO3,
                        quality: "Low"
                      }
                    ]
                  }
                ]}
              />
            </section>

            <section>
              <h3>4. Moving average convergence divergence (MACD)</h3>
              <p>
                MACD is an indicator that detects changes in momentum by
                comparing two moving averages. Traders use it to identify
                possible buy and sell opportunities around support and
                resistance levels.
              </p>
              <p>
                ‘Convergence’ means that two moving averages are coming
                together, while ‘divergence’ means that they’re moving away from
                each other. In case moving averages are converging, it means
                momentum is decreasing, whereas if the moving averages are
                diverging, momentum is increasing.
              </p>
              <ConversationImages
                size={"large"}
                images={[
                  {
                    id: IndicatorsMACD4,
                    resizes: [
                      {
                        height: 0,
                        width: 0,
                        logoUrl: IndicatorsMACD4,
                        quality: "Original"
                      },
                      {
                        height: 0,
                        width: 0,
                        logoUrl: IndicatorsMACD4,
                        quality: "Low"
                      }
                    ]
                  }
                ]}
              />
            </section>

            <section>
              <h3>5. Bollinger bands</h3>
              <p>
                A Bollinger band is an indicator that provides a range within
                which the price of an asset typically trades. The width of the
                band increases and decreases to reflect recent volatility. The
                closer the bands are to each other – or the ‘narrower’ they are
                – the lower the perceived volatility of the financial
                instrument. The wider the bands, the higher the perceived
                volatility.
              </p>
              <p>
                Bollinger bands could be useful for recognizing in cases an
                asset is trading outside of its usual levels, and are used
                mostly as a method to predict long-term price movements. When a
                price continually moves outside the upper parameters of the
                band, it could be overbought, and when it moves below the lower
                band, it could be oversold.
              </p>
              <ConversationImages
                size={"large"}
                images={[
                  {
                    id: IndicatorsBB5,
                    resizes: [
                      {
                        height: 0,
                        width: 0,
                        logoUrl: IndicatorsBB5,
                        quality: "Original"
                      },
                      {
                        height: 0,
                        width: 0,
                        logoUrl: IndicatorsBB5,
                        quality: "Low"
                      }
                    ]
                  }
                ]}
              />
              <p>
                This is the example of a Bollinger Band indicating the
                volatility levels
              </p>
            </section>

            <section>
              <h3>Relative strength index (RSI)</h3>
              <p>
                Traders mostly use RSI to identify momentum, market conditions,
                and warning signals for dangerous price movements. RSI is
                expressed as a figure between 0 and 100. If the asset is around
                70 level it is usually considered overbought, if it is at or
                near 30 the asset is usually considered oversold.
              </p>
              <p>
                An overbought signal suggests that short-term gains may be
                reaching a point of maturity and assets may be in for a price
                correction. On the other hand, an oversold signal could mean
                that short-term declines are reaching maturity and assets may be
                in for a rally.
              </p>
              <ConversationImages
                size={"large"}
                images={[
                  {
                    id: IndicatorsRSI6,
                    resizes: [
                      {
                        height: 0,
                        width: 0,
                        logoUrl: IndicatorsRSI6,
                        quality: "Original"
                      },
                      {
                        height: 0,
                        width: 0,
                        logoUrl: IndicatorsRSI6,
                        quality: "Low"
                      }
                    ]
                  }
                ]}
              />
            </section>
          </>
        )
      }
    ]
  }
];
