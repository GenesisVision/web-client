import { ConversationImages } from "components/conversation/conversation-image/conversation-images";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import Deposit1 from "media/guides/guides-1/Deposit1.png";
import Deposit2 from "media/guides/guides-1/Deposit2.png";
import Deposit3 from "media/guides/guides-1/Deposit3.png";
import Withdrawal1 from "media/guides/guides-1/Withdrawal1.png";
import Withdrawal2 from "media/guides/guides-1/Withdrawal2.png";
import CopyTrades1 from "media/guides/guides-3/CopyTrades1.png";
import CopyTrades2 from "media/guides/guides-3/CopyTrades2.png";
import CopyTrades3 from "media/guides/guides-3/CopyTrades3.png";
import Funds1 from "media/guides/guides-3/Funds1.png";
import { WALLET_TOTAL_PAGE_ROUTE } from "pages/wallet/wallet.paths";
import React from "react";
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
                <b>
                  <a
                    href="https://www.moonpay.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Moonpay payment processor.
                  </a>
                </b>
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
                            height: 400,
                            width: 380,
                            logoUrl: CopyTrades2,
                            quality: "Original"
                          },
                          {
                            height: 400,
                            width: 0,
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
  }
];
