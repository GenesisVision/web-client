import { Center } from "components/center/center";
import { ConversationImages } from "components/conversation/conversation-image/conversation-images";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { RowItem } from "components/row-item/row-item";
import Deposit1 from "media/guides/guides-1/Deposit1.png";
import Deposit2 from "media/guides/guides-1/Deposit2.png";
import Deposit3 from "media/guides/guides-1/Deposit3.png";
import Withdrawal1 from "media/guides/guides-1/Withdrawal1.png";
import Withdrawal2 from "media/guides/guides-1/Withdrawal2.png";
import Assets1 from "media/guides/guides-2/Assets1.png";
import Assets2 from "media/guides/guides-2/Assets2.png";
import Assets3 from "media/guides/guides-2/Assets3.png";
import Assets4 from "media/guides/guides-2/Assets4.png";
import Assets5 from "media/guides/guides-2/Assets5.png";
import Assets6 from "media/guides/guides-2/Assets6.png";
import CopyTrades1 from "media/guides/guides-2/CopyTrades1.png";
import CopyTrades2 from "media/guides/guides-2/CopyTrades2.png";
import CopyTrades3 from "media/guides/guides-2/CopyTrades3.png";
import Funds1 from "media/guides/guides-2/Funds1.png";
import ProgramsWP1 from "media/guides/guides-2/ProgramsWP1.png";
import ProgramsWP2 from "media/guides/guides-2/ProgramsWP2.png";
import ProgramsWP3 from "media/guides/guides-2/ProgramsWP3.png";
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
import Terminal1 from "media/guides/guides-3/Terminal1.jpg";
import Terminal2 from "media/guides/guides-3/Terminal2.png";
import Terminal3 from "media/guides/guides-3/Terminal3.png";
import Terminal4 from "media/guides/guides-3/Terminal4.png";
import Terminal5 from "media/guides/guides-3/Terminal5.png";
import Terminal6 from "media/guides/guides-3/Terminal6.png";
import Terminal7 from "media/guides/guides-3/Terminal7.png";
import Terminal8 from "media/guides/guides-3/Terminal8.png";
import Terminal9 from "media/guides/guides-3/Terminal9.png";
import TradingAccount1 from "media/guides/guides-3/TradingAccount1.png";
import TradingAccount2 from "media/guides/guides-3/TradingAccount2.png";
import ManFunds1 from "media/guides/guides-4/Funds1.png";
import ManFunds2 from "media/guides/guides-4/Funds2.png";
import ManFunds3 from "media/guides/guides-4/Funds3.png";
import ManProgramsWP1 from "media/guides/guides-4/ManProgramsWP1.png";
import ManProgramsWP2 from "media/guides/guides-4/ManProgramsWP2.png";
import ManProgramsWP3 from "media/guides/guides-4/ManProgramsWP3.png";
import Programs1 from "media/guides/guides-4/Programs1.png";
import Programs2 from "media/guides/guides-4/Programs2.png";
import Programs3 from "media/guides/guides-4/Programs3.png";
import Signalproviding1 from "media/guides/guides-4/Signalproviding1.png";
import Social1 from "media/guides/guides-5/Social1.png";
import Social2 from "media/guides/guides-5/Social2.png";
import Social3 from "media/guides/guides-5/Social3.png";
import Social4 from "media/guides/guides-5/Social4.png";
import Social5 from "media/guides/guides-5/Social5.png";
import Social6 from "media/guides/guides-5/Social6.png";
import { ATTACH_ACCOUNT_PAGE_ROUTE } from "pages/attach-account/attach-account.constants";
import { CREATE_ACCOUNT_PAGE_ROUTE } from "pages/create-account/create-account.constants";
import {
  CREATE_FUND_PAGE_ROUTE,
  CREATE_SELF_MANAGED_FUND_PAGE_ROUTE
} from "pages/create-fund/create-fund.constants";
import { CREATE_PROGRAM_PAGE_ROUTE } from "pages/create-program/create-program.constants";
import { WALLET_TOTAL_PAGE_ROUTE } from "pages/wallet/wallet.paths";
import React from "react";
import { DASHBOARD_ROUTE, TRADING_ROUTE } from "routes/dashboard.routes";
import { FUNDS_ROUTE } from "routes/funds.routes";
import { GV_ASSETS_ROUTE, GV_FOLLOW_ROUTE } from "routes/invest.routes";
import { PROGRAMS_ROUTE } from "routes/programs.routes";
import { SOCIAL_ROUTE } from "routes/social.routes";
import { TERMINAL_SPOT_ROUTE } from "routes/trade.routes";
import styled from "styled-components";

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

const JustifyContentCenter = styled(Center)`
  justify-content: center;
`;

const JustifyContentSpaceAround = styled(Center)`
  justify-content: space-around;
`;

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
                  bottomOffset={false}
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
                  bottomOffset={false}
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
                  bottomOffset={false}
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
                  bottomOffset={false}
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
                  bottomOffset={false}
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
        id: "investing-0",
        canonicalName: "investing-assets",
        name: "Assets",
        content: (
          <>
            <section>
              <p>
                Expand your trading and investment opportunities with our tool -{" "}
                <strong>Genesis Vision Assets</strong>.
              </p>
              <p>
                Assets can be used both additionally and alternatively to
                existing GV Programs and GV Fund.
              </p>
              <p>
                Diversify your capital across hundreds of cryptocurrencies in
                one click and create your unique portfolio. Experience the ease
                of managing your own capital with our powerful tool and buy/sell
                assets without the hurdles of going to the exchanges directly.
              </p>
              <p>Start using Assets by switching to a tab “Invest”.</p>
              <ConversationImages
                bottomOffset={false}
                size={"large"}
                images={[
                  {
                    id: Assets1,
                    resizes: [
                      {
                        height: 0,
                        width: 0,
                        logoUrl: Assets1,
                        quality: "Original"
                      },
                      {
                        height: 0,
                        width: 0,
                        logoUrl: Assets1,
                        quality: "Low"
                      }
                    ]
                  }
                ]}
              />
              <p>
                Get access to detailed information about more than 200 tokens,
                available in the crypto market:
              </p>
              <ul>
                <li>ticket code and asset name,</li>

                <li>current price,</li>

                <li>price change over last 24 hours,</li>

                <li>
                  the total market value of cryptocurrency’s circulating supply,
                </li>

                <li>
                  cryptocurrency trading volume across all tracked platforms in
                  the last 24 hours.
                </li>
              </ul>
              <ConversationImages
                bottomOffset={false}
                size={"large"}
                images={[
                  {
                    id: Assets2,
                    resizes: [
                      {
                        height: 0,
                        width: 0,
                        logoUrl: Assets2,
                        quality: "Original"
                      },
                      {
                        height: 0,
                        width: 0,
                        logoUrl: Assets2,
                        quality: "Low"
                      }
                    ]
                  }
                ]}
              />
              <p>
                Log In to buy and sell coins, add tokens to favourites and check
                portfolio.
              </p>
              <p>
                Use the “Buy” button to make a purchase, select wallet currency
                and confirm the deal.
              </p>
              <ConversationImages
                bottomOffset={false}
                size={"large"}
                images={[
                  {
                    id: Assets3,
                    resizes: [
                      {
                        height: 0,
                        width: 0,
                        logoUrl: Assets3,
                        quality: "Original"
                      },
                      {
                        height: 0,
                        width: 0,
                        logoUrl: Assets3,
                        quality: "Low"
                      }
                    ]
                  }
                ]}
              />
              <p>
                Get a clear overview of your total portfolio balance, profit &
                loss during various time periods. Keep on top of your current
                positions, market value, percentage change, (un)realized gains.
              </p>
              <ConversationImages
                bottomOffset={false}
                size={"large"}
                images={[
                  {
                    id: Assets4,
                    resizes: [
                      {
                        height: 0,
                        width: 0,
                        logoUrl: Assets4,
                        quality: "Original"
                      },
                      {
                        height: 0,
                        width: 0,
                        logoUrl: Assets4,
                        quality: "Low"
                      }
                    ]
                  }
                ]}
              />
              <p>
                Put a bookmark to your favourite coins, saving them to the
                appropriate tab and make it easier to manage your crypto
                positions and track their performance.
              </p>
              <ConversationImages
                bottomOffset={false}
                size={"large"}
                images={[
                  {
                    id: Assets5,
                    resizes: [
                      {
                        height: 0,
                        width: 0,
                        logoUrl: Assets5,
                        quality: "Original"
                      },
                      {
                        height: 0,
                        width: 0,
                        logoUrl: Assets5,
                        quality: "Low"
                      }
                    ]
                  }
                ]}
              />
              <p>
                You can check transaction history either in Assets-History or
                switching to Wallet-Transactions.
              </p>
              <ConversationImages
                bottomOffset={false}
                size={"large"}
                images={[
                  {
                    id: Assets6,
                    resizes: [
                      {
                        height: 0,
                        width: 0,
                        logoUrl: Assets6,
                        quality: "Original"
                      },
                      {
                        height: 0,
                        width: 0,
                        logoUrl: Assets6,
                        quality: "Low"
                      }
                    ]
                  }
                ]}
              />
            </section>
          </>
        ),
        linkInfo: {
          link: GV_ASSETS_ROUTE,
          label: "Assets"
        }
      },
      {
        id: "investing-1",
        canonicalName: "investing-funds",
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

            <h3>
              A few important notes to consider before investing in a Fund:
            </h3>
            <ul>
              <li>Check the fees before investing.</li>
              <li>
                Check the history tab. You will see the whole story of the Fund,
                all the rebalancing story, the investing, and the withdrawals.
              </li>
              <li>
                Check the chart to see the performance of the Fund. You can
                choose different time frames to see the profitability of the
                Fund.
              </li>
              <li>
                You can withdraw at any time. The exit fee will be applying when
                you withdraw.
              </li>
            </ul>
            <p>
              Every <b>Thursday</b> we announce a winner of our{" "}
              <b>GV Funds Weekly Challenge</b>. The Fund that shows the best
              performance during the week becomes the winner. We have also
              prepared a section with the most profitable Funds in the investing
              section to make it easier to choose a suitable Fund to invest in.
            </p>
            <ConversationImages
              bottomOffset={false}
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
        canonicalName: "investing-programs",
        name: "Programs with periods",
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
        canonicalName: "investing-programs-without-periods",
        name: "Programs without periods",
        content: (
          <>
            <section>
              <p>
                <b>Genesis Markets</b> Programs now don’t have periods, which
                means that the investor does not have to wait till the beginning
                of the Program period to invest or withdraw.
              </p>
              <p>The main feature of these Programs:</p>
              <ul>
                <li>
                  Programs <b>don’t have</b> <b>periods</b>.
                </li>

                <li>
                  Investor and manager requests will be processed in{" "}
                  <b>real time</b> or once a day at the chosen time by the
                  manager.
                </li>

                <li>
                  Investors will have <b>maximum control of their capital.</b>
                </li>

                <li>
                  <b>Orders will not be closed</b> at the time of requests
                  processing.
                </li>
              </ul>
              <p>The rest stays the same:</p>
              <ul>
                <li>
                  Programs are similar to PAMM accounts. A trader creates an
                  investment program, where he sets the fees and other
                  parameters.
                </li>
                <li>
                  The manager trades with his own and investors’ cumulative
                  balance. Profits or losses are equally distributed among the
                  investors based on their share of the Program.
                </li>
              </ul>
            </section>

            <section>
              <h3>How to invest in a Program?</h3>
              <p>
                Click the <b>"Invest"</b> button on the page of the desired{" "}
                <b>Genesis Markets</b> <b>Program</b> that you want to use. You
                can invest in a Program with any currency available in your
                wallet.
              </p>
              <p>
                Managers have the opportunity to choose when investment requests
                in the Program will be processed. They can be processed in real
                time or every day at a scheduled time (for example 5 pm each
                day).
              </p>
              <p>
                All invested funds are entered into the Program in the currency
                of the trading account (USDT or BTC). Investors are given shares
                in current assets according to their invested amount.
              </p>
            </section>

            <section>
              <h3>How to withdraw from a Program?</h3>
              <p>To withdraw from a Program follow the steps:</p>
              <ol>
                <li>
                  Click the “Withdraw” button near your investment on the
                  Program page.
                  <ConversationImages
                    bottomOffset={false}
                    size={"large"}
                    images={[
                      {
                        id: ProgramsWP1,
                        resizes: [
                          {
                            height: 0,
                            width: 0,
                            logoUrl: ProgramsWP1,
                            quality: "Original"
                          },
                          {
                            height: 0,
                            width: 0,
                            logoUrl: ProgramsWP1,
                            quality: "Low"
                          }
                        ]
                      }
                    ]}
                  />
                </li>

                <li>
                  Choose the amount to withdraw. You can put a tick near
                  “Withdraw all” if you want to withdraw all of your funds from
                  the Program.
                  <ConversationImages
                    bottomOffset={false}
                    size={"large"}
                    images={[
                      {
                        id: ProgramsWP2,
                        resizes: [
                          {
                            height: 0,
                            width: 0,
                            logoUrl: ProgramsWP2,
                            quality: "Original"
                          },
                          {
                            height: 0,
                            width: 0,
                            logoUrl: ProgramsWP2,
                            quality: "Low"
                          }
                        ]
                      }
                    ]}
                  />
                </li>

                <li>
                  Press the “Next” button. You can see when your request will be
                  processed under this button.
                </li>

                <li>
                  Check all the information about the withdrawal request and
                  click “Submit”.
                  <ConversationImages
                    bottomOffset={false}
                    size={"large"}
                    images={[
                      {
                        id: ProgramsWP3,
                        resizes: [
                          {
                            height: 0,
                            width: 0,
                            logoUrl: ProgramsWP3,
                            quality: "Original"
                          },
                          {
                            height: 0,
                            width: 0,
                            logoUrl: ProgramsWP3,
                            quality: "Low"
                          }
                        ]
                      }
                    ]}
                  />
                </li>
              </ol>

              <p>
                The withdrawal requests processing time can also be set by the
                manager in real time or at a scheduled time.
              </p>
              <p>
                <em>Note: Withdrawal from Programs is made as a percentage.</em>
              </p>
            </section>

            <section>
              <h3>Fees</h3>
              <p>
                The table shows all the commissions paid by investors and a
                manager in the program.
              </p>

              <table>
                <tr>
                  <td>
                    <b>Type</b>
                  </td>
                  <td>
                    <b>Fee</b>
                  </td>
                  <td>
                    <b>For investors</b>
                  </td>
                  <td>
                    <b>For manager</b>
                  </td>
                </tr>
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
              </table>

              <ul>
                <li>
                  <b>GV commission</b> is the fee charged by the platform that
                  is a percentage of the initial amount invested in a Program.
                </li>

                <li>
                  <b>Platform Success fee</b> is the fee charged on any profits
                  generated by Programs. It is calculated according to the{" "}
                  <a
                    href="https://www.investopedia.com/terms/h/highwatermark.asp"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <b>HWM system</b>
                  </a>{" "}
                  as a percentage of the profit received from a program during
                  the reporting period or from a trade transaction when copy
                  trading. We do not charge a Success Fee if there were no
                  profits made.
                </li>

                <li>
                  <b>Management fee.</b> The commission that is paid to the
                  manager by an investor for the actual asset management period.
                  Management fee is defined in annual percentage and is charged
                  at the end of each reporting period.
                </li>

                <li>
                  <b>Success fee</b> is the fee charged on profits generated by
                  Programs. It is calculated according to the{" "}
                  <a
                    href="https://www.investopedia.com/terms/h/highwatermark.asp"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <b>HWM system</b>
                  </a>{" "}
                  as a percentage of the profit received from a program during
                  the reporting period. No profit means no Success fee is
                  charged.
                </li>

                <li>
                  <b>Trading fee</b> is divided among all program participants.
                </li>
              </ul>
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
              <h3>
                What is the difference between Programs with and without
                periods?
              </h3>
              <table>
                <tr>
                  <td></td>
                  <td>
                    <b>Genesis Markets Program (without periods)</b>
                  </td>
                  <td>
                    <b>Program with periods</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Investments</b>
                  </td>
                  <td>
                    Investments are accepted in <b>Real time</b> or{" "}
                    <b>Every day</b> at a scheduled time (for example, you can
                    set an investment/withdrawal at 5 pm)
                  </td>
                  <td>
                    Investments are accepted at the end of the reporting period
                    (maximum of 90 days)
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Investment limit</b>
                  </td>
                  <td>
                    <b>Without KYC</b> the limit is <b>1000 USD</b> Otherwise
                    the available limit is set in the range from <b>5000 USD</b>{" "}
                    to <b>300 000 USD</b>
                  </td>
                  <td>
                    <b>Without KYC</b> the limit is <b>1000 USD</b> Otherwise
                    the available limit is set in the range from <b>5000 USD</b>{" "}
                    to <b>300 000 USD</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Withdrawals </b>
                  </td>
                  <td>
                    All withdrawals are accepted in <b>Real time</b> or{" "}
                    <b>Every day</b> at a scheduled time.
                    <br />
                    Manager needs to leave min Deposit
                  </td>
                  <td>
                    All withdrawals are accepted at the end of the reporting
                    period
                    <br />
                    Manager needs to leave min Deposit
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Stop out (income protection)</b>
                  </td>
                  <td>Stop out doesn’t apply</td>
                  <td>
                    Manager sets Stop out level
                    <br />
                    It can vary from 10 to 100% and can only be changed downward
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Reinvest profit</b>
                  </td>
                  <td>Profit is reinvested automatically</td>
                  <td>
                    It depends on whether you have the{" "}
                    <b>reinvestment trigger (Reinvest profit) </b>switched to
                    “on” or “off”
                    <br />
                    <b>“on” -</b> all the profits at the end of the reporting
                    period will be reinvested into the same Program
                    <br />
                    <b>“off”</b> - all profits are paid in GVT at the end of the
                    reporting period and transferred to your wallet
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Commissions</b>
                  </td>
                  <td>
                    <b>Management fee</b> 0-20%
                    <br />
                    <b>Success fee</b> 0-50% (HWM system)
                    <br />
                    <b>Platform Success fee</b> 0-10% *
                    <br />
                    (HWM system)
                    <br />
                    <b>GV commission</b> - 0.5% charged from every investment in
                    the program.
                  </td>
                  <td>
                    <b>Management fee</b> 0-20%
                    <br />
                    <b>Success fee</b> 0-50% (HWM system)
                    <br />
                    <b>Platform Success fee</b> 0-10% *
                    <br />
                    (HWM system)
                    <br />
                    <b>GV commission</b> - 0.5% charged from every investment in
                    the program.
                  </td>
                </tr>
              </table>
            </section>
          </>
        ),
        linkInfo: {
          link: PROGRAMS_ROUTE,
          label: "Programs"
        }
      },
      {
        id: "investing-4",
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
                    bottomOffset={false}
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
                    bottomOffset={false}
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
                    bottomOffset={false}
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
        canonicalName: "gv-trading-terminal",
        name: "GV Trading terminal",
        content: (
          <>
            <p>GV Terminal has 6 sections:</p>
            <ConversationImages
              bottomOffset={false}
              size={"large"}
              images={[
                {
                  id: Terminal1,
                  resizes: [
                    {
                      height: 0,
                      width: 0,
                      logoUrl: Terminal1,
                      quality: "Original"
                    },
                    {
                      height: 0,
                      width: 0,
                      logoUrl: Terminal1,
                      quality: "Low"
                    }
                  ]
                }
              ]}
            />
            <ol>
              <li>
                Here you choose the asset you are interested in. You can use the
                search bar or choose one of four sections (BTC, BNB, ALTS and
                FIATS) and scroll down to find the desired asset.
              </li>

              <li>
                The heading of the terminal. Here you can see the main
                statistics of the chosen asset as well as your trading account
                number and it’s current balance. You can switch to another
                trading account by pressing the small arrow near the balance and
                choosing the trading account from the opened list of available
                ones.
                <ConversationImages
                  bottomOffset={false}
                  size={"large"}
                  images={[
                    {
                      id: Terminal2,
                      resizes: [
                        {
                          height: 0,
                          width: 0,
                          logoUrl: Terminal2,
                          quality: "Original"
                        },
                        {
                          height: 0,
                          width: 0,
                          logoUrl: Terminal2,
                          quality: "Low"
                        }
                      ]
                    }
                  ]}
                />
                <JustifyContentCenter>
                  <RowItem bottomOffset>Account switch</RowItem>
                </JustifyContentCenter>
              </li>
              <li>
                The chart of the chosen asset. Here you can see the price
                movement of the asset through the period of time. You can set
                the type of chart, the time frames and the indicators here.
                <JustifyContentCenter>
                  <ConversationImages
                    bottomOffset={false}
                    size={"large"}
                    images={[
                      {
                        id: Terminal3,
                        resizes: [
                          {
                            height: 0,
                            width: 0,
                            logoUrl: Terminal3,
                            quality: "Original"
                          },
                          {
                            height: 0,
                            width: 0,
                            logoUrl: Terminal3,
                            quality: "Low"
                          }
                        ]
                      },
                      {
                        id: Terminal4,
                        resizes: [
                          {
                            height: 0,
                            width: 0,
                            logoUrl: Terminal4,
                            quality: "Original"
                          },
                          {
                            height: 0,
                            width: 0,
                            logoUrl: Terminal4,
                            quality: "Low"
                          }
                        ]
                      }
                    ]}
                  />
                </JustifyContentCenter>
                <JustifyContentSpaceAround>
                  <RowItem bottomOffset>Time frames</RowItem>
                  <RowItem bottomOffset>Chart type</RowItem>
                </JustifyContentSpaceAround>
                <ConversationImages
                  bottomOffset={false}
                  size={"large"}
                  images={[
                    {
                      id: Terminal5,
                      resizes: [
                        {
                          height: 0,
                          width: 0,
                          logoUrl: Terminal5,
                          quality: "Original"
                        },
                        {
                          height: 0,
                          width: 0,
                          logoUrl: Terminal5,
                          quality: "Low"
                        }
                      ]
                    }
                  ]}
                />
                <JustifyContentCenter>
                  <RowItem bottomOffset>Indicators</RowItem>
                </JustifyContentCenter>
                <p>
                  On the right you can find the settings where you can set the
                  chart properties according to your needs.
                </p>
                <ConversationImages
                  bottomOffset={false}
                  size={"large"}
                  images={[
                    {
                      id: Terminal6,
                      resizes: [
                        {
                          height: 0,
                          width: 0,
                          logoUrl: Terminal6,
                          quality: "Original"
                        },
                        {
                          height: 0,
                          width: 0,
                          logoUrl: Terminal6,
                          quality: "Low"
                        }
                      ]
                    }
                  ]}
                />
                <JustifyContentCenter>
                  <RowItem bottomOffset>Chart Properties</RowItem>
                </JustifyContentCenter>
              </li>
              <li>
                Order book. The order book is a list of the open buy and sell
                orders for an asset at the time, they are organized by price.
                <ConversationImages
                  bottomOffset={false}
                  size={"large"}
                  images={[
                    {
                      id: Terminal7,
                      resizes: [
                        {
                          height: 0,
                          width: 0,
                          logoUrl: Terminal7,
                          quality: "Original"
                        },
                        {
                          height: 0,
                          width: 0,
                          logoUrl: Terminal7,
                          quality: "Low"
                        }
                      ]
                    }
                  ]}
                />
                <p>
                  The orders which are colored in green show buy orders at
                  particular price levels, and the orders in red show sell
                  orders.
                </p>
                <p>
                  The market price of the asset is shown here. You can set the
                  number of digits after the comma in the left upper corner.
                </p>
                <ConversationImages
                  bottomOffset={false}
                  size={"large"}
                  images={[
                    {
                      id: Terminal8,
                      resizes: [
                        {
                          height: 0,
                          width: 0,
                          logoUrl: Terminal8,
                          quality: "Original"
                        },
                        {
                          height: 0,
                          width: 0,
                          logoUrl: Terminal8,
                          quality: "Low"
                        }
                      ]
                    }
                  ]}
                />
                <JustifyContentCenter>
                  <RowItem bottomOffset>Numbers after comma</RowItem>
                </JustifyContentCenter>
              </li>
              <li>
                This is the section where you place your order. You choose Buy
                or Sell, the type of the order (limit, market or stop limit) and
                the amount. For the amount, you can type the number or simply
                choose it as a percentage of the current balance of your trading
                account (25%, 50%, 75%, 100%).
                <p>
                  And finally you set the TIF (time in force), it is set as GTC
                  by default.
                </p>
                <p>
                  Good till cancelled (GTC): The order will remain valid until
                  it is fully executed or manually cancelled by the trader. GTC
                  is suitable for traders who are willing to wait for all
                  contracts to be completed at a specified price and can
                  flexibly cancel unconcluded contracts at any time.
                </p>
                <p>
                  Immediate or Cancel (IOC): The order must be filled
                  immediately at the order limit price or better. If the order
                  cannot be filled immediately, the unfilled contracts will be
                  cancelled. IOC is usually used to avoid large orders being
                  executed at a price that deviates from the ideal price. With
                  this set, the contracts that fail to trade at the specified
                  price will be cancelled.
                </p>
                <p>
                  Fill or Kill (FOK): The order must be immediately executed at
                  the order price or better, otherwise, it will be completely
                  cancelled and partially filled contracts will not be allowed.
                  This execution strategy is more commonly used by scalping
                  traders or day traders looking for short-term market
                  opportunities.
                </p>
                <ConversationImages
                  bottomOffset={false}
                  size={"large"}
                  images={[
                    {
                      id: Terminal9,
                      resizes: [
                        {
                          height: 0,
                          width: 0,
                          logoUrl: Terminal9,
                          quality: "Original"
                        },
                        {
                          height: 0,
                          width: 0,
                          logoUrl: Terminal9,
                          quality: "Low"
                        }
                      ]
                    }
                  ]}
                />
                <JustifyContentCenter>
                  <RowItem bottomOffset>Time in frame</RowItem>
                </JustifyContentCenter>
                <p>To place an order press Buy/Sell button.</p>
              </li>
              <li>
                This is your journal. Here you can see the information about
                your open orders, order history, trade history and the status of
                the funds of your trading account.
              </li>
            </ol>
          </>
        ),
        linkInfo: {
          link: TERMINAL_SPOT_ROUTE,
          label: "Trading Terminal "
        }
      },
      {
        id: "trading-2",
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
                    bottomOffset={false}
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
                    bottomOffset={false}
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
        id: "trading-3",
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
                  bottomOffset={false}
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
                <a
                  href="https://binance.zendesk.com/hc/en-us/articles/360002502072"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <b>here</b>
                </a>
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
              bottomOffset={false}
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
        id: "trading-4",
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
                    bottomOffset={false}
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
                    bottomOffset={false}
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
        id: "trading-5",
        canonicalName: "placing-an-order",
        name: "Placing an order",
        content: (
          <>
            <p>In general, there are just two order types: sell and buy.</p>
            <ConversationImages
              bottomOffset={false}
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
                    bottomOffset={false}
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
        )
      },
      {
        id: "trading-6",
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
                bottomOffset={false}
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
        id: "trading-7",
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
              bottomOffset={false}
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
        id: "trading-8",
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

            <h3>1. Moving average (MA)</h3>
            <p>
              The MA – or ‘simple moving average’ (SMA) – is an indicator
              traders use for the identification of the direction of a current
              price trend, without the interference of shorter-term price
              spikes. The moving average indicator combines price points of a
              financial instrument over a specified time frame and divides it by
              the number of data points to present a single trend line.
            </p>
            <p>
              The length of MA defines which data is being used. For example, a
              200-day MA requires 200 days of data. By using the MA indicator,
              you can study levels of support and resistance and see previous
              price action (the history of the market). This means you can also
              determine possible future patterns.
            </p>
            <ConversationImages
              bottomOffset={false}
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

            <h3>2. Exponential moving average (EMA)</h3>
            <p>
              EMA is another form of moving average. Unlike the SMA, it places a
              greater weight on recent data points, which makes data more
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
              bottomOffset={false}
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

            <h3>3. Stochastic oscillator</h3>
            <p>
              A stochastic oscillator is an indicator that compares a specific
              closing price of an asset to a range of its prices over time –
              showing momentum and trend strength. It uses a scale of 0 to 100.
              A reading below 20 generally represents an oversold market and a
              reading above 80 an overbought market. However, if a strong trend
              is present, a correction or rally will not necessarily ensue.
            </p>
            <ConversationImages
              bottomOffset={false}
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

            <h3>4. Moving average convergence divergence (MACD)</h3>
            <p>
              MACD is an indicator that detects changes in momentum by comparing
              two moving averages. Traders use it to identify possible buy and
              sell opportunities around support and resistance levels.
            </p>
            <p>
              ‘Convergence’ means that two moving averages are coming together,
              while ‘divergence’ means that they’re moving away from each other.
              In case moving averages are converging, it means momentum is
              decreasing, whereas if the moving averages are diverging, momentum
              is increasing.
            </p>
            <ConversationImages
              bottomOffset={false}
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
                bottomOffset={false}
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

            <h3>6. Relative strength index (RSI)</h3>
            <p>
              Traders mostly use RSI to identify momentum, market conditions,
              and warning signals for dangerous price movements. RSI is
              expressed as a figure between 0 and 100. If the asset is around 70
              level it is usually considered overbought, if it is at or near 30
              the asset is usually considered oversold.
            </p>
            <p>
              An overbought signal suggests that short-term gains may be
              reaching a point of maturity and assets may be in for a price
              correction. On the other hand, an oversold signal could mean that
              short-term declines are reaching maturity and assets may be in for
              a rally.
            </p>
            <ConversationImages
              bottomOffset={false}
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
          </>
        )
      }
    ]
  },
  {
    id: "guides-4",
    name: "Managing",
    guides: [
      {
        id: "managing-1",
        canonicalName: "managing-funds",
        name: "Funds",
        content: (
          <>
            <section>
              <h3>
                Diversify your capital across hundreds of cryptocurrencies.
              </h3>
              <ol>
                <li>
                  Create a Fund by percentage allocating capital to crypto
                  assets that meet your strategy.
                </li>
                <li>Attract investors to your Fund and earn commissions</li>
                <li>Track and manage your Fund by reallocating assets.</li>
              </ol>
            </section>

            <section>
              <h3>How to create a Fund?</h3>
              <ol>
                <li>
                  Login to your account and follow to the{" "}
                  <GuideLink link={DASHBOARD_ROUTE}>
                    <b>Dashboard</b>
                  </GuideLink>
                  .
                </li>

                <li>
                  Find the button <b>“Select product”</b> on the right.
                </li>

                <li>
                  Choose “Fund”. The description could be seen there as well.
                  <ConversationImages
                    bottomOffset={false}
                    size={"large"}
                    images={[
                      {
                        id: ManFunds1,
                        resizes: [
                          {
                            height: 0,
                            width: 0,
                            logoUrl: ManFunds1,
                            quality: "Original"
                          },
                          {
                            height: 0,
                            width: 0,
                            logoUrl: ManFunds1,
                            quality: "Low"
                          }
                        ]
                      }
                    ]}
                  />
                </li>
                <li>
                  Fill in all the required details: name of the Fund,
                  description, the assets, etc.
                  <br />
                  Access assets from Binance and Huobi (summary 319 coins).
                </li>
                <li>
                  Set the assets allocation. Please note that there is a
                  mandatory<b> minimum of 1% GVT allocation per Fund.</b>
                </li>

                <li>Set up Entry and Exit fees for investors.</li>

                <li>
                  Choose the currency and amount for the initial deposit. The
                  minimal initial deposit is an equivalent of 50 GVT.
                </li>

                <li>
                  Click <b>“Create Fund”</b>.
                  <ConversationImages
                    bottomOffset={false}
                    size={"large"}
                    images={[
                      {
                        id: ManFunds2,
                        resizes: [
                          {
                            height: 0,
                            width: 0,
                            logoUrl: ManFunds2,
                            quality: "Original"
                          },
                          {
                            height: 0,
                            width: 0,
                            logoUrl: ManFunds2,
                            quality: "Low"
                          }
                        ]
                      }
                    ]}
                  />
                  To help you build your crypto portfolio, you can access a full
                  description of the asset, social media links and its price
                  history.
                  <ConversationImages
                    bottomOffset={false}
                    size={"large"}
                    images={[
                      {
                        id: ManFunds3,
                        resizes: [
                          {
                            height: 0,
                            width: 0,
                            logoUrl: ManFunds3,
                            quality: "Original"
                          },
                          {
                            height: 0,
                            width: 0,
                            logoUrl: ManFunds3,
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
              <h3>Few important moments to remember:</h3>
              <ul>
                <li>
                  You have to have at least <b>1% of GVT</b> in your Fund.
                </li>

                <li>You can change the settings of your Fund anytime.</li>

                <li>
                  The trader can<b> Reallocate</b> <b>3%</b> of their Fund{" "}
                  <b>per day</b> (cumulative). Example: you can change 30% of
                  the Fund's allocation after 10 days.
                </li>

                <li>
                  Automatic <b>Fund rebalance </b>takes place{" "}
                  <b>every three days.</b> If there was a reallocation, the
                  rebalance will happen in three days after it, not after the
                  last rebalance session.
                </li>

                <li>
                  Manager can withdraw his own investment from a Fund but he
                  needs to leave at least <b>50 GVT</b> to keep the Fund
                  running. In order to withdraw the whole amount the manager
                  will have to close the Fund.
                </li>

                <li>
                  In the History tab you can see all the events that happened to
                  the Fund, such as investments, withdrawals, reallocations,
                  rebalancing, Funds challenge winners.
                </li>
              </ul>
            </section>

            <section>
              <h3>Fees</h3>
              <p>
                The manager sets <b>entry fee</b> and <b>exit fee</b> by
                himself.
              </p>
              <p>
                <b>Entry fee</b> is the commission the investor pays to the
                manager for investing in the Fund. Set by the manager and
                calculated as a percentage of the amount invested. Fee range is
                0-10%.
              </p>
              <p>
                <b>Exit fee</b> is the commission that the investor pays the
                manager for withdrawing funds from the Fund. Set by the manager
                and calculated as a percentage of the amount invested. Fee range
                is 0-10%. Both entry and exit fees get added to the manager’s
                share in his Fund. Note: if you close the Fund the investor will
                not have to pay an exit fee in order to withdraw his investment.
              </p>
            </section>

            <section>
              <h3>Fund closing</h3>
              <p>
                At <b>any time</b> you can close your Fund. In this case, your
                own funds are withdrawn and Fund becomes unavailable for new
                investments. Existing investors can keep their money as long as
                they want. Withdrawals from the closed Fund are not subjected to
                exit fee.
              </p>
            </section>
          </>
        ),
        linkInfo: {
          link: CREATE_FUND_PAGE_ROUTE,
          label: "Create Fund"
        }
      },
      {
        id: "managing-2",
        canonicalName: "managing-programs",
        name: "Programs with the periods",
        content: (
          <>
            <section>
              <h3>How to create a Program?</h3>
              <ol>
                <li>
                  Login to your account and follow to the{" "}
                  <GuideLink link={DASHBOARD_ROUTE}>
                    <b>Dashboard</b>
                  </GuideLink>
                  .
                </li>
                <li>
                  Find the button <b>“Select product”</b> on the right and
                  choose Program. Choose the <b>broker</b>{" "}
                  <em>(Current brokers are Roboforex, Exante, Huobi)</em>.
                  <ConversationImages
                    bottomOffset={false}
                    size={"large"}
                    images={[
                      {
                        id: Programs1,
                        resizes: [
                          {
                            height: 0,
                            width: 0,
                            logoUrl: Programs1,
                            quality: "Original"
                          },
                          {
                            height: 0,
                            width: 0,
                            logoUrl: Programs1,
                            quality: "Low"
                          }
                        ]
                      }
                    ]}
                  />
                </li>
                <li>
                  Fill in the required details:
                  <ul>
                    <li>
                      <b>Base currency</b> of his trading account
                    </li>
                    <li>Name, Description and Avatar for this Program</li>
                    <li>
                      <b>Period</b> (duration of the reporting period is up to a
                      maximum of 90 days)
                    </li>
                    <li>
                      <b>Stop out</b> level (10-100%).{" "}
                      <b>Stop out is the maximum drawdown level</b> for the
                      reporting period at which the Program is stopped, and all
                      investments return to investors
                    </li>
                    <li>
                      <b>Trades delay</b> (5, 10 minutes,...,6 hours). Managers
                      have the ability to delay the public display of their
                      trades and open positions to protect their strategy.
                      <ConversationImages
                        bottomOffset={false}
                        size={"large"}
                        images={[
                          {
                            id: Programs2,
                            resizes: [
                              {
                                height: 0,
                                width: 0,
                                logoUrl: Programs2,
                                quality: "Original"
                              },
                              {
                                height: 0,
                                width: 0,
                                logoUrl: Programs2,
                                quality: "Low"
                              }
                            ]
                          }
                        ]}
                      />
                    </li>
                    <li>
                      <b>Management fee</b> (0-20%) The manager can set his own
                      fee, which is charged for the actual asset management
                      period. Management fee is defined in annual percentage and
                      is charged at the end of each reporting period.
                    </li>
                    <li>
                      <b>Success fee</b> (0-50%). A fee charged upon the total
                      profit made within the reporting period. It is calculated
                      according to the HWM system
                    </li>
                    <li>
                      <b>Investment Limit.</b> At any time you can enter or
                      cancel certain limitations on av. to invest, or even
                      prohibit new investments if your Investment limit is 0. If
                      the investment limit you've entered is larger than the av.
                      to invest value calculated for your current level, then
                      you will only be able to attract the av. to invest value.
                    </li>
                  </ul>
                </li>
                <li>Make at least a minimum investment to your Program.</li>
                <li>
                  Click <b>“Create Program”</b>.
                  <ConversationImages
                    bottomOffset={false}
                    size={"large"}
                    images={[
                      {
                        id: Programs3,
                        resizes: [
                          {
                            height: 0,
                            width: 0,
                            logoUrl: Programs3,
                            quality: "Original"
                          },
                          {
                            height: 0,
                            width: 0,
                            logoUrl: Programs3,
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
              <h3>
                How much money from investors can I attract for management?
              </h3>
              <p>
                If the manager trades <b>without KYC</b> the limit is{" "}
                <b>1000 USD</b>{" "}
                <em>(or the equivalent in the account currency).</em> Otherwise,
                the available limit is set in the range from <b>5000 USD</b> to{" "}
                <b>300 000 USD.</b>
              </p>
              <p>
                The amount of funds available for investment in each particular
                Program depends on several factors:
              </p>
              <ul>
                <li>
                  The <b>age</b> of the Program
                </li>
                <li>
                  The manager’s <b>balance</b>
                </li>
                <li>
                  Trading <b>volume</b> and <b>success</b> of the trading
                  manager
                </li>
                <li>
                  You can get the exact number by using the <b>calculator</b>{" "}
                  available on the Program’s Settings page.
                </li>
              </ul>
              <p>
                More information can be found in{" "}
                <a
                  href="https://blog.genesis.vision/genesis-vision-update-a-level-up-d01ef51c42a"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <b>the article</b>
                </a>
                .
              </p>
            </section>

            <section>
              <h3>What happens at the end of the reporting period?</h3>
              <p>
                At the end of each reporting period (either after the set
                interval or forced by the manager) the following operations are
                performed:
              </p>
              <ol>
                <li>All the manager’s open positions are closed</li>
                <li>Profit/Losses are calculated and distributed</li>
                <li>Manager and platform success fees are charged</li>
                <li>Investment and Withdrawal requests are processed</li>
              </ol>
              <p>
                All the open trades get automatically closed at the end of the
                period. If it is a Forex Program and the reporting period ends
                during the weekend, the period will be closed on the following
                Monday, as soon as the Forex market opens.
              </p>
            </section>

            <section>
              <h3>Some important notes to consider:</h3>
              <ul>
                <li>
                  All investment requests get accepted automatically at the end
                  of the current period.
                </li>
                <li>
                  Withdrawal requests get processed at the end of the current
                  period.
                </li>

                <li>
                  The period could be closed early, it could be done in the
                  Settings.
                </li>

                <li>
                  A manager can’t withdraw all of his own funds from a Program,
                  the minimum investment has to stay.
                </li>
                <li>
                  After the creation of the Program, you can edit all of the
                  settings except for t<b>he period of the Program</b> and{" "}
                  <b>the leverage</b>. You can also change a broker to any
                  available one, it is done in the Program Settings.
                </li>
                <li>
                  Post about your strategies and plans in{" "}
                  <GuideLink link={SOCIAL_ROUTE}>
                    <b>Social</b>
                  </GuideLink>{" "}
                  to build your investor’s loyalty.
                </li>
              </ul>
            </section>

            <section>
              <h3>Program closing</h3>
              <p>
                Manager can close the Program. It can be done in the Program
                settings. After pressing the button <b>“Сlose program”</b> all
                of the invested funds remaining in the Program are returned to
                the investors and the manager.
              </p>
              <p>
                Read more about the GV Programs in this{" "}
                <a
                  href="https://blog.genesis.vision/genesis-vision-programs-9700fe637f5d"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <b>article</b>
                </a>
                .
              </p>
            </section>
          </>
        ),
        linkInfo: {
          link: CREATE_PROGRAM_PAGE_ROUTE,
          label: "Create Program"
        }
      },
      {
        id: "managing-3",
        canonicalName: "managing-programs-without-periods",
        name: "Programs without periods",
        content: (
          <>
            <section>
              <h3>About the Programs without periods</h3>
              <p>
                Programs are similar to PAMM accounts. A trader creates an
                investment program, where he sets the fees and other parameters.
              </p>
              <p>
                A trader will have the opportunity to trade cryptocurrency on{" "}
                <b>Binance exchange</b> using <b>Trading terminal</b> on GV
                platform to earn profits for himself and investors.
              </p>
              <p>
                Programs without periods are now only available on{" "}
                <b>Genesis Markets broker</b>.
              </p>
              <p>
                The manager trades with his own and investors’ cumulative
                balance. Profits or losses are equally distributed among the
                investors based on their share of the program.
              </p>
              <p>The main feature of these Programs:</p>
              <ul>
                <li>
                  Programs <b>don’t</b> <b>have periods</b>
                </li>

                <li>
                  Investor and manager requests will be processed{" "}
                  <b>in real time</b> or once a day at the chosen time by the
                  manager
                </li>

                <li>
                  Investors will have <b>maximum control of their capital</b>
                </li>

                <li>
                  <b>Orders will not be closed</b> at the time of requests
                  processing
                </li>
              </ul>
            </section>

            <section>
              <h3>How to create a Program?</h3>
              <ol>
                <li>
                  Login to your account and follow to the{" "}
                  <a
                    href="https://genesis.vision/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <b>Dashboard</b>
                  </a>
                  .
                </li>

                <li>
                  Find the button <b>“Select product”</b> on the right and
                  choose Program. To create a Program without period choose{" "}
                  <b>Genesis Markets broker</b>.
                  <ConversationImages
                    bottomOffset={false}
                    size={"large"}
                    images={[
                      {
                        id: ManProgramsWP1,
                        resizes: [
                          {
                            height: 0,
                            width: 0,
                            logoUrl: ManProgramsWP1,
                            quality: "Original"
                          },
                          {
                            height: 0,
                            width: 0,
                            logoUrl: ManProgramsWP1,
                            quality: "Low"
                          }
                        ]
                      }
                    ]}
                  />
                </li>

                <li>
                  Fill in the required details:
                  <ul>
                    <li>
                      The<b> base currency</b> of his trading account
                    </li>

                    <li>Name, Description and Avatar for this Program</li>

                    <li>
                      <b>Processing</b>. <b>Real time</b> or every day{" "}
                      <b>at a scheduled time</b> (for example, you can set an
                      investment/withdrawal at 5 pm)
                    </li>

                    <li>
                      <b>Trades delay</b> (5, 10 minutes,...,6 hours). Managers
                      have the ability to delay the public display of their
                      trades and open positions to protect their strategy.
                      <ConversationImages
                        bottomOffset={false}
                        size={"large"}
                        images={[
                          {
                            id: ManProgramsWP2,
                            resizes: [
                              {
                                height: 0,
                                width: 0,
                                logoUrl: ManProgramsWP2,
                                quality: "Original"
                              },
                              {
                                height: 0,
                                width: 0,
                                logoUrl: ManProgramsWP2,
                                quality: "Low"
                              }
                            ]
                          }
                        ]}
                      />
                    </li>

                    <li>
                      <b>Management fee</b> (0-20%) The manager can set his own
                      fee, which is charged for the actual asset management
                      period. Management fee is defined in annual percentage and
                      is charged at the end of each reporting period.
                    </li>

                    <li>
                      <b>Success fee</b> (0-50%). A fee charged upon the total
                      profit made within the reporting period. It is calculated
                      according to the HWM system
                    </li>

                    <li>
                      <b>Investment Limit.</b> At any time you can enter or
                      cancel certain limitations on av. to invest, or even
                      prohibit new investments if your Investment limit is 0. If
                      the investment limit you've entered is larger than the av.
                      to invest value calculated for your current level, then
                      you will only be able to attract the av. to invest value.
                    </li>
                  </ul>
                </li>
                <li>Make at least a minimum investment to your Program.</li>

                <li>
                  Click <b>“Create Program”</b>.
                  <ConversationImages
                    bottomOffset={false}
                    size={"large"}
                    images={[
                      {
                        id: ManProgramsWP3,
                        resizes: [
                          {
                            height: 0,
                            width: 0,
                            logoUrl: ManProgramsWP3,
                            quality: "Original"
                          },
                          {
                            height: 0,
                            width: 0,
                            logoUrl: ManProgramsWP3,
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
              <h3>
                What happens during the processing of investment/withdrawal
                request?
              </h3>
              <p>
                During the processing investment/withdrawal request<b> </b>of
                the following operations are performed:
              </p>
              <ol>
                <li>Trading in the Program is temporarily suspended.</li>

                <li>All Limit orders are cancelled.</li>

                <li>Profit/Losses are calculated and distributed.</li>

                <li>Management and platform Success fees are charged.</li>

                <li>Investment and Withdrawal requests are processed.</li>

                <li>
                  Limit orders are placed back with reduced volume, proportional
                  to all withdrawals.
                </li>

                <li>
                  Trading in the Program resumes. The manager continues to
                  trade.
                </li>
              </ol>
              <p>
                <em>
                  Note: Processing of requests in real time takes several
                  minutes.
                </em>
              </p>
            </section>

            <section>
              <h3>Investing and withdrawing funds from the Program</h3>
              <ol>
                <li>
                  <b>Invest in a Program</b>
                  <p>
                    Managers have the opportunity to choose when requests for
                    the investment/withdrawal of funds in the Program will be
                    processed. This can be in real time or every day at a
                    scheduled time (for example, you can set an
                    investment/withdrawal at 5 pm).
                  </p>
                  <p>
                    All invested funds are entered into the Program in the
                    currency of the trading account (USDT or BTC). Investors are
                    given shares in current assets according to their invested
                    amount.
                  </p>
                  <p>
                    <em>
                      Note: You can invest in a Program with any currency in
                      your wallet.
                    </em>
                  </p>
                  <p>
                    For example:
                    <br />
                    Program balance now is 100 GVT (all money is in GVT). The
                    currency of the Program (trading account) - USDT.
                    <br />
                    In program 2 investor. Investor-1 share 30%, Investor-2
                    share 20% and Manager 50% (50 GVT).
                    <br />
                    Investor-3 input 100 USDT.
                    <br />
                    The account will have 100 USDT and 100 GVT. (1 GVT = 1
                    USDT).
                    <br />
                    The shares will be distributed as follows:
                    <br />
                    Investor-1 - 15% (15 GVT, 15 USDT).
                    <br />
                    Investor-2 - 10% (10 GVT, 10 USDT).
                    <br />
                    Investor-3 - 50% (50 GVT, 50 USDT).
                    <br />
                    Manager - 25% (25 GVT, 25 USDT)
                  </p>
                </li>
                <li>
                  <b>Withdraw from the Program</b>
                  <p>
                    Current coins are partially sold, in proportion to the
                    number of withdrawn shares.
                  </p>
                  <p>
                    Next, we withdraw funds to the investor/manager (according
                    to his application), the rest is distributed among all
                    participants.
                  </p>
                  <p>
                    All funds are withdrawn to users in the Program currency, to
                    a similar wallet (USDT, BTC). After processing all
                    withdrawal requests, the shares of the remaining
                    participants are recalculated.
                  </p>
                  <p>
                    <em>
                      Note: Withdrawal from Programs is made as a percentage.
                      This is due to all the underlying commissions, minimum lot
                      size and conversions that take place upon submission of
                      the trades to the selected withdrawal currency.
                    </em>
                  </p>
                </li>
              </ol>
            </section>

            <section>
              <h3>Rebates from the Program</h3>
              <p>
                Genesis Vision Token holders who select <b>Genesis Markets</b>{" "}
                as their broker will receive discounted transaction fees.
              </p>
              <p>Rate and general rules for obtaining the trading discount:</p>
              <ul>
                <li>
                  Commission rate directly depends on the amount of GVT stored
                  in the wallet
                </li>

                <li>There must be more than 1 GVT stored in the wallet</li>

                <li>
                  The wallet is checked for GVT balance
                  <b> once per week at a random time</b>
                </li>

                <li>
                  Manager will get these rebates <b>to his wallet</b> in a
                  Program currency (BTC or USDT)
                </li>
              </ul>
              <p>Conditions for obtaining discounts</p>

              <table>
                <tr>
                  <td>
                    <b>Wallet</b>
                  </td>
                  <td>
                    <b>Amount</b>
                  </td>
                </tr>
                <tr>
                  <td>From 1 GVT up to 25</td>
                  <td>5%</td>
                </tr>
                <tr>
                  <td>Up to 50 GVT</td>
                  <td>10%</td>
                </tr>
                <tr>
                  <td>Up to 100 GVT</td>
                  <td>15%</td>
                </tr>
                <tr>
                  <td>Up to 500 GVT</td>
                  <td>20%</td>
                </tr>
                <tr>
                  <td>500 GVT+</td>
                  <td>25%</td>
                </tr>
              </table>
            </section>

            <section>
              <h3>
                What is the difference between Programs with and without
                periods?
              </h3>
              <table>
                <tr>
                  <td></td>
                  <td>
                    <b>Genesis Markets Program (without periods)</b>
                  </td>
                  <td>
                    <b>Program with periods</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Min Deposit to create a Program</b>
                  </td>
                  <td>
                    <b>Genesis Markets</b> 50 USD, 0,003 BTC
                  </td>
                  <td>
                    <b>Roboforex</b> 100 USD
                    <br />
                    <b>Exante</b> 100 USD
                    <br />
                    <b>Huobi</b> 100 USDT 0.01 BTC 0.5 ETH
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Trading platform</b>
                  </td>
                  <td>
                    <b>GV Trading terminal</b>
                  </td>
                  <td>
                    <b>Roboforex</b> - MetaTrader 4
                    <br />
                    <b>Exante</b> - Exante terminal
                    <br />
                    <b>Huobi</b> - Huobi terminal
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Available instruments</b>
                  </td>
                  <td>
                    Access assets from <b>Binance exchange</b>
                  </td>
                  <td>
                    <b>Crypto, Forex, Metals, Commodities, Indices, Shares</b>
                    <br />
                    (depends on the broker)
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Investments attraction (AUM)</b>
                  </td>
                  <td>
                    Investments are accepted in <b>Real time</b> or{" "}
                    <b>Every day</b> at a scheduled time (for example, you can
                    set an investment/withdrawal at 5 pm)
                  </td>
                  <td>
                    Investments are accepted at the end of the reporting period
                    (maximum of 90 days)
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Investment limit</b>
                  </td>
                  <td>
                    <b>Without KYC</b> the limit is <b>1000 USD</b> Otherwise
                    the available limit is set in the range from <b>5000 USD</b>{" "}
                    to <b>300 000 USD</b>
                  </td>
                  <td>
                    <b>Without KYC</b> the limit is <b>1000 USD</b> Otherwise
                    the available limit is set in the range from <b>5000 USD</b>{" "}
                    to <b>300 000 USD</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Deposits</b>
                  </td>
                  <td>
                    Your deposit is accepted in <b>Real time</b> or{" "}
                    <b>Every day</b> at a scheduled time.
                  </td>
                  <td>
                    Your deposit is accepted at the end of the reporting period
                    (maximum of 90 days)
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Withdrawals (for both manager and investor)</b>
                  </td>
                  <td>
                    All withdrawals are accepted in <b>Real time</b> or{" "}
                    <b>Every day</b> at a scheduled time.
                    <br />
                    Manager needs to leave min Deposit
                  </td>
                  <td>
                    All withdrawals are accepted at the end of the reporting
                    period
                    <br />
                    Manager needs to leave min Deposit
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Requests processing</b>
                  </td>
                  <td>
                    <b>Deposit/Investment</b> - The balance of USDT or BTC
                    increases by the size of the request
                    <br />
                    <b>Withdrawals</b> - Current coins are partially sold, in
                    proportion to the number of withdrawn shares
                  </td>
                  <td>
                    <b>Deposi</b>t<b>/ Investment</b> -{" "}
                    <b>All open positions are closed</b> and then the period is
                    processed
                    <br />
                    <b>Withdrawals</b> - <b>All open positions are closed</b>{" "}
                    and then the period is processed
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Commissions (the manager gets)</b>
                  </td>
                  <td>
                    <b>Management fee </b>0-20%
                    <br />
                    <b>Success fee</b> 0-50% (HWM system)
                  </td>
                  <td>
                    <b>Management fee </b>0-20%
                    <br />
                    <b>Success fee</b> 0-50% (HWM system)
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Edit current Settings</b>
                  </td>
                  <td>
                    After the creation of the Program, you can edit all of the
                    settings except <b>the Broker</b>
                  </td>
                  <td>
                    After the creation of the Program, you can edit all of the
                    settings except for the <b>period of the Program</b> and
                    <b> the leverage</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Ability to close the Program</b>
                  </td>
                  {tableCellDone()}
                  {tableCellDone()}
                </tr>
              </table>
            </section>
          </>
        ),
        linkInfo: {
          link: CREATE_PROGRAM_PAGE_ROUTE,
          label: "Create Program"
        }
      },
      {
        id: "managing-4",
        canonicalName: "signal-providing",
        name: "Signal providing",
        content: (
          <>
            <section>
              <h3>How can I become a signal provider?</h3>
              <p>
                First of all, you need to have a Binance account. If you don’t
                please find out how to register on Binance{" "}
                <a
                  href="https://www.binance.com/en/support/faq/115003764911"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <b>here</b>
                </a>{" "}
                and create a new account. Now you need to follow these steps to
                make your Binance account a signal provider:
              </p>
              <ol>
                <li>
                  Attach your Binance account to your GV account. You can read
                  how to do that here.
                </li>
                <li>
                  Find your Binance account in the{" "}
                  <GuideLink link={TRADING_ROUTE}>
                    <b>trading section</b>
                  </GuideLink>{" "}
                  and press three dots on the right upper corner.
                  <ConversationImages
                    bottomOffset={false}
                    size={"large"}
                    images={[
                      {
                        id: Signalproviding1,
                        resizes: [
                          {
                            height: 0,
                            width: 0,
                            logoUrl: Signalproviding1,
                            quality: "Original"
                          },
                          {
                            height: 0,
                            width: 0,
                            logoUrl: Signalproviding1,
                            quality: "Low"
                          }
                        ]
                      }
                    ]}
                  />
                </li>
                <li>
                  Choose <b>“Make signal account”</b>.
                </li>
                <li>Fill in the required information and set the fees.</li>
                <li>
                  Press the <b>“Create signal account”</b> button.
                </li>
              </ol>
              <p>
                Your account will appear as “Pending Binance account” for a few
                minutes before it becomes active.
              </p>
              <p>
                Tip: you can access the Binance terminal fast in the trading
                account menu.
              </p>
            </section>

            <section>
              <h3>Notes:</h3>
              <ul>
                <li>
                  If you are providing signals - you <b>do not</b> need to keep
                  money in the GV platform.
                </li>
                <li>
                  You <b>do not require KYC</b> if you are using your external
                  accounts with GV Follow.
                </li>
                <li>
                  You can <b>revoke the API</b> key at any time through the
                  exchange interface and trades will no longer be copied.
                </li>
              </ul>
            </section>

            <section>
              <h3>Fees</h3>
              <p>
                The signal provider sets the following fees to his signal
                trading account/Program:
              </p>
              <ol>
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
                  transaction when copy trading. Success fee varies from 0 to
                  50%.
                </li>
                <li>
                  The <b>volume fee</b> is a volume commission charged for each
                  transaction. It varies from 0 to 30% of the amount of paid
                  trading fee by the trader.
                </li>
              </ol>
              <p>
                You can see the commission you get from each subscriber on your
                signal trading account/Program page in the tab “Subscribers”
                along with the other information about a subscription.
              </p>
              <p>
                You <b>get the commission in GVT</b> and it is added{" "}
                <b>to your wallet</b>.
              </p>
            </section>
          </>
        ),
        linkInfo: {
          link: ATTACH_ACCOUNT_PAGE_ROUTE,
          label: "Attach Binance account"
        }
      }
    ]
  },
  {
    id: "guides-5",
    name: "Social",
    guides: [
      {
        id: "social-1",
        canonicalName: "social",
        name: "Social",
        content: (
          <>
            <section>
              <h3>How to use GV Social?</h3>
              <p>
                <b>GV Social</b> is an internal social network for traders and
                investors to communicate, share news, and information.
              </p>
              <p>
                GV Social has 4 sections: Feed, Users, your Profile, and Media.
              </p>
              <ConversationImages
                bottomOffset={false}
                size={"large"}
                images={[
                  {
                    id: Social1,
                    resizes: [
                      {
                        height: 230,
                        width: 100,
                        logoUrl: Social1,
                        quality: "Original"
                      },
                      {
                        height: 0,
                        width: 0,
                        logoUrl: Social1,
                        quality: "Low"
                      }
                    ]
                  }
                ]}
              />
              <p>
                Feed shows all the posts on the platform, the most popular ones,
                and the ones of the accounts you are subscribed to.
              </p>
              <ConversationImages
                bottomOffset={false}
                size={"large"}
                images={[
                  {
                    id: Social2,
                    resizes: [
                      {
                        height: 100,
                        width: 100,
                        logoUrl: Social2,
                        quality: "Original"
                      },
                      {
                        height: 0,
                        width: 0,
                        logoUrl: Social2,
                        quality: "Low"
                      }
                    ]
                  }
                ]}
              />
              <p>
                Apart from that, you can find Top strategies, Hot topics, and
                Trending assets in the Feed section.
              </p>
              <ConversationImages
                bottomOffset={false}
                size={"large"}
                images={[
                  {
                    id: Social3,
                    resizes: [
                      {
                        height: 0,
                        width: 0,
                        logoUrl: Social3,
                        quality: "Original"
                      },
                      {
                        height: 0,
                        width: 0,
                        logoUrl: Social3,
                        quality: "Low"
                      }
                    ]
                  }
                ]}
              />
              <p>
                Users section allows you to see all the users, the number of
                subscribers, and AUM (Assets under management).
              </p>
              <p>
                My profile section will lead you to your personal account page
                where you can manage your posts and your personal information.
              </p>
              <p>
                The media page shows the latest world blockchain and crypto news
                to help you stay tuned.
              </p>
            </section>

            <section>
              <h3>How do I make a post?</h3>
              <p>
                You can create a new post from both your profile page and the
                feed. To create a post follow these easy steps:
              </p>
              <ol>
                <li>
                  Open Feed or My profile section and click on the{" "}
                  <b>“What’s new”</b> field.
                </li>
                <li>
                  Type any text you like. You can tag a particular Program or a
                  Fund if you type @ and then the name of the product. Select
                  the needed one from the opened menu and it will appear in your
                  post.
                </li>
                <li>
                  Click on the image icon near the “Send” button to attach an
                  image from your device if needed.
                </li>
                <li>
                  Press Enter or <b>“Send”</b> button.
                  <ConversationImages
                    bottomOffset={false}
                    size={"large"}
                    images={[
                      {
                        id: Social4,
                        resizes: [
                          {
                            height: 0,
                            width: 0,
                            logoUrl: Social4,
                            quality: "Original"
                          },
                          {
                            height: 0,
                            width: 0,
                            logoUrl: Social4,
                            quality: "Low"
                          }
                        ]
                      }
                    ]}
                  />
                </li>
              </ol>
              <p>
                You can edit your post during a few hours after the publication.
                The option could be found on the menu when you click three dots
                on the right upper corner of your post. You will also be able to
                pin your post, delete it or share it on the same menu.
              </p>
              <ConversationImages
                bottomOffset={false}
                size={"large"}
                images={[
                  {
                    id: Social5,
                    resizes: [
                      {
                        height: 270,
                        width: 100,
                        logoUrl: Social5,
                        quality: "Original"
                      },
                      {
                        height: 0,
                        width: 0,
                        logoUrl: Social5,
                        quality: "Low"
                      }
                    ]
                  }
                ]}
              />
              <p>
                If you deleted your post by accident, you can restore it by
                clicking “Undo” right away.
              </p>
              <ConversationImages
                bottomOffset={false}
                size={"large"}
                images={[
                  {
                    id: Social6,
                    resizes: [
                      {
                        height: 100,
                        width: 50,
                        logoUrl: Social6,
                        quality: "Original"
                      },
                      {
                        height: 0,
                        width: 0,
                        logoUrl: Social6,
                        quality: "Low"
                      }
                    ]
                  }
                ]}
              />
            </section>
          </>
        ),
        linkInfo: {
          link: SOCIAL_ROUTE,
          label: "Social"
        }
      }
    ]
  }
];
