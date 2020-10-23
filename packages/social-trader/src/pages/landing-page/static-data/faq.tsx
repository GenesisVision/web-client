import { TAccordion } from "pages/landing-page/components/accordion/accordion";
import { InternalTableWrapper } from "pages/landing-page/components/internal/internal.blocks";
import React from "react";

export const faqGeneral: TAccordion[] = [
  {
    id: "general-1",
    title: "What is Genesis Vision?",
    content: (
      <>
        <p>
          Genesis Vision is a multimarket social trading platform that provides
          a wide variety of opportunities for both traders and investors,
          including:
        </p>
        <ul>
          <li>
            Trade Cryptocurrencies, Forex, Metals, Stocks, Indices and
            Commodities on any brokerage/exchange within the Genesis Vision
            partnership network
          </li>
          <li>Create and manage asset management Programs or Funds</li>
          <li>Provide copy trading signals with GV Follow</li>
          <li>Invest in Programs or Funds</li>
          <li>Copy successful trading strategies with GV Follow</li>
        </ul>
      </>
    )
  },
  {
    id: "general-2",
    title: "What is this platform for?",
    content: (
      <>
        <p>
          Genesis Vision helps traders monetize their skills while providing a
          wide variety of investment opportunities. Our clients can be both
          traders and/or investors on our platform.
        </p>
        <p>
          If you are already familiar with trading, you can create your own
          asset management Program or Fund and attract investors to join. You
          can also create a signal trading account so other users can subscribe
          and copy your trades.
        </p>
        <p>
          If you are an inexperienced trader, you can practice trading on your
          personal trading account and/or copy trading strategies of Follow
          Leaders, or you can choose any Program or Fund to invest in.
        </p>
      </>
    )
  },
  {
    id: "general-3",
    title: "What assets can I trade?",
    content: (
      <>
        <p>
          Through our partners and liquidity providers, Genesis Vision traders
          and managers have a wide variety of assets available for trading.
          Users can trade:
        </p>
        <ul>
          <li>Forex</li>
          <li>Crypto (including all Binance and Huobi assets)</li>
          <li>CFD</li>
          <li>Stocks</li>
          <li>Metals</li>
          <li>Indices</li>
          <li>Commodities</li>
        </ul>
      </>
    )
  },
  {
    id: "general-4",
    title: "Where can I invest?",
    content: (
      <p>
        If you don’t want to trade, you can invest your money in Programs and
        Funds under the management of Traders. Because of the transparent nature
        of the Genesis Vision platform, you can always keep track of your
        capital investments.
      </p>
    )
  },
  {
    id: "general-5",
    title: "What is Genesis Markets?",
    content: (
      <p>
        Genesis Markets is our own broker that provides direct access to crypto
        exchanges, Forex and CFD through the popular MetaTrader 5 terminal.
      </p>
    )
  },
  {
    id: "general-6",
    title: "What is MetaTrader 5? Where can I get it?",
    content: (
      <p>
        MetaTrader 5 is the most popular trading terminal.
        <br />
        You can download it here:{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://genesis.vision/downloads"
        >
          https://genesis.vision/downloads
        </a>
        <br />
        Or you can use a web version (you need to disable your ad blocker for
        trading)
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://genesis.vision/trade/mt5"
        >
          https://genesis.vision/trade/mt5
        </a>
      </p>
    )
  },
  {
    id: "general-7",
    title: "Is MetaTrader 5 the only option for trading?",
    content: (
      <>
        <p>
          No, apart from MetaTrader you can use the trading platforms of our
          partners, such as:
        </p>
        <ul>
          <li>MetaTrader 4</li>
          <li>Exante Trading Terminal</li>
          <li>Binance</li>
          <li>Huobi</li>
        </ul>
      </>
    )
  },
  {
    id: "general-8",
    title: "Does Genesis Vision have mobile apps?",
    content: (
      <p>
        Yes, we have an{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          title={"iOS application"}
          href="https://apps.apple.com/app/genesis-vision-investor/id1369865290"
        >
          iOS application
        </a>{" "}
        and an{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          title={"Android application"}
          href="https://play.google.com/store/apps/details?id=vision.genesis.clientapp.investor"
        >
          {" "}
          Android application.
        </a>
      </p>
    )
  },
  {
    id: "general-9",
    title: "How do I create a Genesis Vision account?",
    content: (
      <p>
        To become a Genesis Vision client, you need to register on our{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          title={"Go to genesis.vision"}
          href="https://genesis.vision/signup"
        >
          website
        </a>{" "}
        or the Genesis Vision app (download the{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          title={"Android application"}
          href="https://play.google.com/store/apps/details?id=vision.genesis.clientapp.investor"
        >
          Android
        </a>{" "}
        or{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          title={"iOS application"}
          href="https://apps.apple.com/app/genesis-vision-investor/id1369865290"
        >
          iOS
        </a>{" "}
        app).
      </p>
    )
  },
  {
    id: "general-10",
    title: "What currencies can I deposit into my Genesis Vision Wallet?",
    content: (
      <p>
        You can deposit using one of the following cryptocurrencies: BTC, ETH,
        GVT, or USDT.
      </p>
    )
  },
  {
    id: "general-11",
    title: "Can I deposit with a credit card?",
    content: (
      <p>
        Yes, you can deposit BTC, ETH, or USDT directly into your Genesis Vision
        account using your credit/debit card through our payment processor
        MoonPay. It holds the transaction in EUR and then converts to the
        cryptocurrency you choose to deposit. The option «Buy with card» can be
        found in your wallet.
      </p>
    )
  },
  {
    id: "general-12",
    title:
      "I haven’t received a confirmation email after a successful registration. What should I do?",
    content: (
      <p>
        Please check all folders in your inbox, including the spam folder. If
        it’s not there, please contact our support team:{" "}
        <a
          title={"Write a email to Genesis Vision support"}
          href="mailto:support@genesis.vision"
        >
          support@genesis.vision
        </a>
        .
      </p>
    )
  },
  {
    id: "general-13",
    title: "Does Genesis Vision have a KYC procedure?",
    content: (
      <>
        <p>Without KYC you can:</p>
        <ul>
          <li>Deposit and withdraw crypto without limits</li>
          <li>Exchange cryptocurrencies</li>
          <li>Create crypto trading accounts</li>
          <li>
            Create Programs (with a maximum investment amount equivalent to
            $1,000) and Funds
          </li>
          <li>
            Bind your external trading account and use copy trading
            functionality (Follow)
          </li>
          <li>Invest in Programs and Funds up to $1,000 in total</li>
        </ul>
        <p>After you pass KYC you also can:</p>
        <ul>
          <li>Create Forex trading accounts</li>
          <li>Invest in Programs and Funds without limits</li>
          <li>Attract investments in your Programs beyond the KYC limit</li>
        </ul>
        <p>Our KYC solution is provided by Sum&Substance</p>
      </>
    )
  },
  {
    id: "general-14",
    title: "Does Genesis Vision have a referral program?",
    content: (
      <>
        <p>
          Yes, Genesis Vision has a two-level referral program. You can find the
          referral link in your personal account menu.
        </p>

        <p>
          Information about your own referral accounts can be found there as
          well.
        </p>

        <p>
          Referral program rules you can find{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            title={"Go to Referral program"}
            href="https://genesis.vision/referral-program"
          >
            here
          </a>
        </p>
      </>
    )
  },
  {
    id: "general-15",
    title: "How can I secure my account?",
    content: (
      <p>
        Genesis Vision highly recommends securing your trading account with
        two-factor authentication. You can enable two-factor authentication in
        your profile security settings.
      </p>
    )
  },
  {
    id: "general-16",
    title: "What do I do if I forgot my password?",
    content: (
      <p>
        When you sign in, you can click the forgot your password link and enter
        the email address you have used to create an account with us. You will
        receive an email with a link for resetting your password.
      </p>
    )
  },
  {
    id: "general-17",
    title: "Can I close my account?",
    content: (
      <p>
        If you wish to close your account, please send a request using the email
        address you have registered your account with to our support team:
        <a
          title={"Write a email to Genesis Vision support"}
          href="mailto:support@genesis.vision"
        >
          support@genesis.vision
        </a>
        . They will review your request within 24 hours.
      </p>
    )
  }
];

export const faqPrograms: TAccordion[] = [
  {
    id: "programs-1",
    title: "What is a Genesis Vision Program?",
    content: (
      <>
        <p>
          Programs are similar to PAMM accounts. A <b>trader</b> creates an
          investment program, where he sets the fees and the duration of the
          reporting period (up to a maximum of 90 days).
        </p>
        <p>
          Once a Program is created, the trader can start trading as they
          normally would with their personal trading account.
        </p>
        <p>
          <b>Investors</b> then make an investment request which will be
          processed at the beginning of each period (note that traders can
          manually close a period at any time).
        </p>
        <p>
          The manager trades with his own and investors’ cumulative balance.
          Profits or losses are equally distributed among the investors based on
          their share of the program (note that an investor’s request to
          withdraw their capital from a program can only be executed at the end
          of each period).
        </p>
      </>
    )
  },
  {
    id: "programs-2",
    title: "How to choose a Program to invest in?",
    content: (
      <p>
        Click on <b>Invest &gt; Programs</b>. Choose the Programs that fit your
        investment profile by using the various filters (currency type, risk
        level, trading history etc.) and key performance indicators - age of the
        Program, equity, drawdown, leverage, fees, stop out level,{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          title={"Go to sharpe ratio"}
          href="https://steemit.com/crypto/@genesisvision/sharpen-your-decision-making"
        >
          Sharpe ratio
        </a>
        ,{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          title={"Go to calmar ratio"}
          href="https://steemit.com/crypto/@genesisvision/fishing-our-best-investment-programs"
        >
          Calmar ratio
        </a>
        ,{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          title={"Go to sortino ratio"}
          href="https://steemit.com/crypto/@genesisvision/sortino-ratio"
        >
          Sortino ratio
        </a>
        .
      </p>
    )
  },
  {
    id: "programs-3",
    title: "What is the base currency of the Program?",
    content: (
      <p>
        Genesis Vision Programs can have different base currencies that allow
        traders to operate in different markets. If you don’t have the base
        currency that a particular Program requires you to have, you can choose
        any currency from your wallet to deduct the funds from during the
        investment process. Conversion of your funds to the Program base
        currency occurs instantly. Alternatively, you can exchange currencies
        within your wallet before investing in a Program.
      </p>
    )
  },
  {
    id: "programs-4",
    title: "How do I Invest?",
    content: (
      <p>
        To invest, you first need to deposit currency into your wallet. After
        topping up your balance, you can invest in Programs and Funds by
        clicking the Invest button on the page of the particular investment
        product you wish to use.
      </p>
    )
  },
  {
    id: "programs-5",
    title: "When will my investment request in the Program be accepted?",
    content: (
      <p>
        Investment requests in Programs are automatically processed at the
        beginning of the reporting period. A trader may opt to end their
        reporting period manually to force accepting pending investment
        requests, however, this is at the discretion of the trader.
      </p>
    )
  },
  {
    id: "programs-6",
    title: "Can I cancel an investment request?",
    content: (
      <p>
        Yes, you can cancel your investment request unless it’s already
        processed. You can cancel it from the dashboard section or directly on
        the program page.
      </p>
    )
  },
  {
    id: "programs-7",
    title: "What are the fees?",
    content: (
      <>
        <p>There are two fees the trader sets for their Program:</p>
        <p>Entry fee - the commission for investment.</p>
        <p>
          Success fee - the commission charged from the profit. It is calculated
          as a percentage of the profits earned over a certain period. If there
          is no profit, then there is no success fee charged.
        </p>
        <p>
          Besides the trader’s entry and success fees, there is also a platform
          entry fee of 0.5% charged on any new investment and a 10% platform
          success fee from the profit of the Programs. All success fees are
          subject to the{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.investopedia.com/terms/h/highwatermark.asp"
            title={"Go to High-Water-Mark "}
          >
            High-Water-Mark
          </a>{" "}
          system. Note that you can reduce the platform success fee by holding
          GVT in your wallet. For every 1,000 GVT stored in the wallet,
          investors receive a 10% discount up to a maximum discount of 100%
          (i.e. an investor holding 1,000 GVT will only pay a 9% platform
          success fee, whereas an investor holding 10,000 GVT will pay no
          platform success fee).
        </p>
      </>
    )
  },
  {
    id: "programs-8",
    title: "When will I receive my profit from the Program?",
    content: (
      <p>Distribution of the profit is at the end of the reporting period.</p>
    )
  },
  {
    id: "programs-9",
    title: "What do I do if I am not happy with the Program?",
    content: (
      <p>
        If you are not happy with your current investment, you can always
        request a withdrawal from the program. You can withdraw a certain amount
        or choose the “Withdraw all” option if you want to withdraw all your
        funds. Processing of your request will occur at the end of the Program’s
        reporting period.
      </p>
    )
  },
  {
    id: "programs-10",
    title: "How do I withdraw my investment from the Program?",
    content: (
      <p>
        You can withdraw your investment on the page of the Program you have
        invested your funds in. From there you will see the <b>Withdraw</b>{" "}
        button in the investing section. Alternatively, you can also withdraw
        your investment from the dashboard.
      </p>
    )
  },
  {
    id: "programs-11",
    title:
      "What happens to my investment when the reporting period ends? Will it reinvest, or will the investment return to my wallet?",
    content: (
      <p>
        It depends on whether you have the reinvestment trigger switched to “on”
        or “off.” You can enable or disable reinvestment on the page of each
        Program. If you have, reinvesting turned “on”, then all the profits at
        the end of the reporting period will be reinvested into the same
        Program. If you have, reinvesting turned “off”, all profits are paid in
        GVT at the end of the reporting period and transferred to your wallet.
        The initial investment stays in the Program in both cases until you
        withdraw your investment from the Program.
      </p>
    )
  },
  {
    id: "programs-12",
    title: "What happens if a trader closes his Program?",
    content: (
      <p>
        If a trader closes his Program, all of the invested funds remaining in
        the Program are returned to the investors.
      </p>
    )
  },
  {
    id: "programs-13",
    title: "What is a Program reporting period?",
    content: (
      <p>
        The reporting period is the interval of time in which the trader is to
        conduct trading operations of their Program and report the resulting
        profit or loss.
        <br />
        Investments made by the investors appear on the Program balance at the
        beginning of the reporting period, while all of the resulting profit is
        distributed at the end of the reporting period. When a trader creates a
        Program, he can select the duration of the reporting period by himself.
      </p>
    )
  },
  {
    id: "programs-14",
    title: "What happens at the end of the reporting period?",
    content: (
      <>
        <p>
          At the end of each reporting period (either after the set interval or
          forced by the manager) the following operations are performed:
        </p>
        <ol>
          <li>All manager’s open positions are closed</li>
          <li>Profit/Loss calculated and distributed</li>
          <li>Manager and platform success fees are charged</li>
          <li>Investment and Withdrawal requests are processed</li>
        </ol>
      </>
    )
  },
  {
    id: "programs-15",
    title:
      "What happens when the period of the Program ends and I still have open trades?",
    content: (
      <p>
        All the open trades get automatically closed at the end of the period.
        If it is a Forex Program and the reporting period ends during the
        weekend, the period will be closed on the following Monday, as soon as
        the Forex market opens.
      </p>
    )
  },
  {
    id: "programs-16",
    title: "What is a stop out?",
    content: (
      <p>
        A stop out is a compulsory closing of positions at current market prices
        when a loss reaches the stop out level. The period is automatically
        closed, and all investments are distributed to investors minus the loss.
        Investors who had investments in the program when the stop out triggered
        will not pay any entry fee if they invest in the following period.
      </p>
    )
  },
  {
    id: "programs-17",
    title: "How do I create a program?",
    content: (
      <p>
        You will first need to create a private trading account. You can do that
        in the <b>Trade</b> section on the platform. Once this is created, you
        can upgrade your private trading account to either: Program or signal
        account (Follow). Now your trading account is public and can attract
        investments or followers.
      </p>
    )
  },
  {
    id: "programs-18",
    title: "What should I write in the Program description section?",
    content: (
      <p>
        Try to keep your Program description as professional as possible. It is
        good practice to mention your trading experience and describe your
        trading strategy.
      </p>
    )
  },
  {
    id: "programs-19",
    title: "Can I edit my Program after I have created it?",
    content: (
      <p>
        Yes, you can change the details of your Program even after you have
        created it. It is possible to change the name of the Program,
        description, fees, stop out level, broker/exchange, investment
        limitation, trades delay and avatar. Please note that you cannot change
        the period duration once you have created the Program.
      </p>
    )
  },
  {
    id: "programs-20",
    title: "What is trades delay and how it works?",
    content: (
      <>
        <p>
          Trades delay option allows managers to delay the public display of
          their trades and open positions to protect their trading strategies.
          The following options are available:
        </p>
        <ul>
          <li>Without (trades appear in the list immediately)</li>
          <li>5 minutes</li>
          <li>15 minutes</li>
          <li>30 minutes</li>
          <li>1 hour</li>
          <li>6 hours</li>
        </ul>
      </>
    )
  },
  {
    id: "programs-21",
    title: "How can I accept an investment request?",
    content: (
      <p>
        Investment requests are accepted automatically at the beginning of each
        period. Alternatively, you can manually reset your period to accept
        pending investment requests.
      </p>
    )
  },
  {
    id: "programs-22",
    title: "How do I change the fees after I have created my Program?",
    content: (
      <p>
        You can change the fees after you have created the Program. They can be
        changed in the Program settings. The new fees will only affect investors
        who make investment requests after you have made the change.
      </p>
    )
  },
  {
    id: "programs-23",
    title: "Can I limit the investment amount to my Program?",
    content: (
      <p>
        Yes, you can set a maximum investment amount for your Program. You can
        change this after you have created the program. The investment limit can
        be set in the Program settings.
      </p>
    )
  },
  {
    id: "programs-24",
    title: "Can I close a Program?",
    content: (
      <p>
        Yes, you can close your Program. It can be done in the Program settings.
      </p>
    )
  },
  {
    id: "programs-25",
    title: "Can I create more than one Program?",
    content: <p>Yes, you can create an unlimited number of Programs.</p>
  },
  {
    id: "programs-26",
    title: "How much money from investors can I attract for management?",
    content: (
      <>
        <p>
          The amount of funds available for investment in each particular
          Program depends on several factors:
        </p>
        <ul>
          <li>The age of the Program</li>
          <li>The manager’s balance</li>
          <li>Trading volume and success of the trading manager</li>
        </ul>
        <p>
          You can get the exact number by using the calculator available on the
          Program’s Settings page.
        </p>
      </>
    )
  }
];

export const faqFunds: TAccordion[] = [
  {
    id: "funds-1",
    title: "What is a Genesis Vision Fund?",
    content: (
      <>
        <p>GV Funds are asset portfolios, assembled by traders.</p>
        <p>
          To create a fund, you can choose any number of assets and set their
          target, which is an initial percentage allocation (the manager decides
          the total weight of each asset in their portfolio). When you invest in
          a GV Fund, you purchase all the assets included in the fund in the
          defined proportions.
        </p>
        <p>
          Once you decide to cash out, all of the purchased assets are sold
          according to the current market prices, resulting in either profit or
          loss based on the price difference.
        </p>
      </>
    )
  },
  {
    id: "funds-2",
    title: "How do I invest in a Fund?",
    content: (
      <p>
        Investing in a GV Fund is very simple. Once you have chosen a Fund that
        suits your strategy, click the <b>Invest</b> button. You can invest in a
        GV Fund with any currency in your wallet.
      </p>
    )
  },
  {
    id: "funds-3",
    title:
      "Do I need to wait for my Fund investment request to execute, or is the investment instantaneous?",
    content: (
      <p>
        When you invest in a GV Fund, your investment is accepted
        instantaneously. The same goes for withdrawals.
      </p>
    )
  },
  {
    id: "funds-4",
    title:
      "What are the target and current percentages, and what do they mean?",
    content: (
      <p>
        Because of the changes in the price of the underlying assets included in
        the Genesis Vision Fund, the proportion of the allocated funds may
        change. The desired percentage selected by the trader is called{" "}
        <b>Target</b>, while <b>Current</b> shows the current allocation of
        Funds. Rebalancing of the Funds occurs automatically each week to meet
        their target allocation values.
      </p>
    )
  },
  {
    id: "funds-5",
    title: "What are the Funds fees?",
    content: (
      <>
        <p>There are two fees that the trader sets for their Fund:</p>
        <p>
          An entry fee is charged from the amount you are investing in the Fund.
          (with the maximum fee being 10%).
        </p>
        <p>
          An exit fee is charged from the amount you are withdrawing from the
          Fund. (with the maximum fee being 10%).
        </p>
        <p>
          Besides the trader’s entry and exit fee, there is a Genesis Vision
          commission of 0.5% charged from every investment in funds.
        </p>
      </>
    )
  },
  {
    id: "funds-6",
    title: "What are the benefits of creating a Fund?",
    content: (
      <p>
        To set up a Genesis Vision Fund, there is a requirement for the trader
        to invest 50 GVT (or an equivalent amount of BTC/ETH/USDT) of their own
        funds. Once the Fund is created, the trader will profit from the Fund on
        the same basis as their investors, with additional profit coming from
        entry and exit commissions.
      </p>
    )
  },
  {
    id: "funds-7",
    title: "What is the best way to choose a suitable Fund?",
    content: (
      <>
        <p>Pay close attention to all the data provided.</p>
        <p>
          We need to warn you that most of the ratios cannot give you sufficient
          information regarding the performance of the Fund for at least the
          first three months of its history. Always pay attention to the Fund’s
          chart and its overall structure.
        </p>
      </>
    )
  },
  {
    id: "funds-8",
    title: "How do I create a Fund?",
    content: (
      <>
        <p>To create a Fund:</p>
        <ul>
          <li>Click “Create Fund” button in the dashboard.</li>
          <li>Fill the required fields: Fund name, description and logo.</li>
          <li>
            Set the assets allocation. Please note that there is a mandatory
            minimum of 1% GVT allocation per Fund.
          </li>
          <li>Set up Entry and Exit fees for investors.</li>
          <li>
            Choose the currency and amount for the initial deposit. The minimal
            initial deposit is an equivalent of 50 GVT.
          </li>
        </ul>
      </>
    )
  },
  {
    id: "funds-9",
    title: "What changes can a trader make to their Fund?",
    content: (
      <>
        <p>
          The trader can reallocate 3% of their fund per day (cumulative).
          Example: you can change 30% of the fund's allocation after 10 days.
        </p>
        <p>
          Apart from that you can always change fees values as well as title,
          description and avatar
        </p>
      </>
    )
  },
  {
    id: "funds-10",
    title: "Can I close my Fund?",
    content: (
      <p>
        Yes, it’s possible to close your Fund. In this case, your own funds are
        withdrawn and Fund becomes unavailable for new investments. Existing
        investors can keep their money as long as they want. Withdrawals from
        the closed Fund are not subjected to exit fee.
      </p>
    )
  },
  {
    id: "funds-11",
    title: "How is the profit of a Fund calculated?",
    content: (
      <p>
        When you invest in a Fund, you purchase all the underlying assets
        included within it. The profit is received from the organic price growth
        of the assets in the Fund. Once the price of the assets goes up, so does
        the price of your share (or unit). When an investor withdraws their
        investment, all their funds held within the Fund are sold, and the
        resulting balance is withdrawn to their Genesis Vision wallet.
      </p>
    )
  },
  {
    id: "funds-12",
    title: "Why is the withdrawal amount reflected as a percentage?",
    content: (
      <p>
        Withdrawal from Funds is made as a percentage because it is almost
        impossible to calculate the exact investors share upon the time of
        withdrawal. This is due to all the underlying commissions and
        conversions that take place upon submission of the trades to the
        selected withdrawal currency.
      </p>
    )
  }
];

export const faqFollow: TAccordion[] = [
  {
    id: "follow-1",
    title: "What is Genesis Vision Follow",
    content: (
      <>
        <p>
          Genesis Vision <b>Follow</b> is an innovative copy trading product. It
          allows you to copy trades opened and managed by another trader while
          keeping control of your capital. You can find <b>Follow</b> in the{" "}
          <b>Invest</b> section. To subscribe to the trades, you need to choose
          a Follow account, and Genesis Vision will automatically copy the
          trades to your account. You will have control over the trades and you
          can close them whenever you want. You will also be able to unsubscribe
          at any moment to stop copying the trades.
        </p>
        <p>
          If you wish to create your own Follow account, you will need to create
          a private trading account first. After that, you can upgrade it to a
          signal trading account or signal Program.
        </p>
      </>
    )
  },
  {
    id: "follow-2",
    title: "How do I subscribe to Follow?",
    content: (
      <p>
        In the <b>Follow</b> section, you can choose a trader whose trades you
        would like to subscribe to. To follow trades, you need to have a trading
        account. So when you click the <b>Follow Trades</b> button on the
        trader’s page, it will offer you to choose an existing account of yours,
        or to open a new account and deposit funds to it. When you do this, the
        trades will start copying to your trading account according to the
        chosen subscription type.
      </p>
    )
  },
  {
    id: "follow-3",
    title: "How to attach an external account?",
    content: (
      <>
        <ul>
          <li>Navigate to the Trading page.</li>
          <li>Press Attach external account</li>
          <li>Input your Binance account API key and API secret</li>
        </ul>
        <p>
          After that your new account will appear in the Private section with
          Pending status.
          <br />
          Status will be changed to Active as soon as the input data is
          validated. Validation process usually takes around 5 minutes.
        </p>
      </>
    )
  },
  {
    id: "follow-4",
    title: "Where do I get Binance account API key and API secret?",
    content: (
      <p>
        Please follow the official{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          title={"Go to guide"}
          href="https://binance.zendesk.com/hc/en-us/articles/360002502072"
        >
          guide
        </a>{" "}
        to create Binance API key and secret
      </p>
    )
  },
  {
    id: "follow-5",
    title: "What are the fees?",
    content: (
      <>
        <p>
          There are two fees the trader sets for their Genesis Vision Follow
          account: success fee and volume fee.
        </p>
        <p>
          The success fee is the commission charged from copy trading profits.
          It calculates the fee according to the method of the{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            title={"Go to High-Water-Mark"}
            href="https://www.investopedia.com/terms/h/highwatermark.asp"
          >
            High-Water-Mark
          </a>
          . With this method, it does not take the percentage from the profit
          for the period, but from the difference between the investors’
          investments and the previous maximum profit. The success fee can vary
          from 0 to 50%.
        </p>
        <p>
          The volume fee is a volume commission charged for opening the
          transaction. It varies from 0 to 30% of the amount of paid trading fee
          by the trader.
        </p>
        <p>
          Genesis Vision charges the platform success fee (0-10% depending on
          the user’s GVT balance) from the profit.
        </p>
      </>
    )
  },
  {
    id: "follow-6",
    title: "What types of subscription are available?",
    content: (
      <>
        <p>
          There are three types of subscription available: by balance,
          percentage and fixed.
        </p>
        <p>
          <b>By balance.</b> When choosing this subscription, the volume of the
          position opened is proportional to the trading account balance of the
          leader and the follower. For example, Provider balance = 100 USD, he
          opens a trade with a volume of 10 USD. Subscriber balance = 20 USD,
          this means it will open the position for the same asset but with a
          volume of 5 times lower which is 2 USD.
        </p>
        <p>
          <b>Percentage.</b> When you choose this subscription, you set the
          volume percentage of the Provider’s opened position that the
          subscription will copy. Meaning if the Provider has opened a trade for
          100 USD while the percentage the Subscriber has set is 30%, it will
          open the trade on the Subscriber trade account for 30 USD.
        </p>
        <p>
          <b>Fixed.</b> By choosing this subscription type, the positions will
          open only for the fixed amount that the Subscriber has set in the USD
          equivalent field when subscribing to the signal program/trading
          account. It does not depend on the size of the trade of the provider.
        </p>
        <p>
          For each subscription type, you will need to set a{" "}
          <b>Tolerance percentage</b> (maximum possible deviation of the trade
          price from 0% to 20%). This means if you set it to 0% for the chosen
          subscription type, the trade must open at the exact same price as the
          provider’s trade. If a subscriber's price at the moment of the opening
          is worse than than the original trade price for more than the set{" "}
          <b>Tolerance percentage</b>, the trade won’t be opened.
        </p>
      </>
    )
  },
  {
    id: "follow-7",
    title: "I want to close the trade by myself. Can I do that?",
    content: (
      <p>
        Yes. To do that you need to login to your account. In the trading
        section, you will see all the opened trades. You can choose one and
        close it in the opened window.
      </p>
    )
  },
  {
    id: "follow-8",
    title: "How do I cancel my subscription to the trading account?",
    content: (
      <>
        <p>
          You can cancel your subscription on the trader’s page or in your
          dashboard.
          <br />
          There are three ways to cancel your subscription: close only, close
          all immediately, and manual closing.
        </p>
        <p>
          <b>Close only.</b> The new trades will stop opening, and the remaining
          opened trades are closed when the Provider closes their trades.
        </p>
        <p>
          <b>Close all immediately.</b> The signal provider subscription gets
          cancelled, and all the opened trades are closed immediately.
        </p>
        <p>
          <b>Manual closing.</b> You unsubscribe from the signal provider, but
          all the opened trades stay open. The Subscriber can close the open
          trades manually at any time. This means when the Provider closes their
          trades they will not be closed on the Subscribers trading account.
        </p>
      </>
    )
  }
];

export const faqGVT: TAccordion[] = [
  {
    id: "gvt-1",
    title: "What is GVT?",
    content: (
      <p>
        Genesis Vision has its own token: GVT (Genesis Vision Token). GVT is
        based on the ERC20 Ethereum token standard. GVT can be used for all
        investment operations and has a set of its own perks and features when
        used on the platform, such as various discounts and more.
      </p>
    )
  },
  {
    id: "gvt-2",
    title: "Is GVT a security?",
    content: (
      <p>
        We have received a conclusion on the Howey Test passage that GVT cannot
        be deemed as a security.{" "}
        <a
          title={"Download memorandum"}
          href="https://storage-s3.genesis.vision/assets/genesis-vision-memorandum.pdf"
        >
          genesis-vision-memorandum.pdf
        </a>
      </p>
    )
  },
  {
    id: "gvt-3",
    title: "How can I use GVT on the platform?",
    content: (
      <>
        <p>
          If you hold GVT on your account balance, there are trading bonuses
          available.
        </p>
        <ul>
          <li>
            For each 1,000 GVT locked away Genesis Vision clients get a 1%
            reduction from the platform success fee;
          </li>
          <li>
            Genesis Vision clients can reach up to 55% Genesis Markets trading
            fee reduction by holding up to 500 GVT.
          </li>
        </ul>
        <InternalTableWrapper>
          <thead>
            <tr>
              <th>Wallet</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>From 1 GVT up to 10</td>
              <td>30%</td>
            </tr>
            <tr>
              <td>Up to 25 GVT</td>
              <td>35%</td>
            </tr>
            <tr>
              <td>Up to 50 GVT</td>
              <td>40%</td>
            </tr>
            <tr>
              <td>Up to 100 GVT</td>
              <td>45%</td>
            </tr>
            <tr>
              <td>Up to 500 GVT</td>
              <td>50%</td>
            </tr>
            <tr>
              <td>500 GVT+</td>
              <td>55%</td>
            </tr>
          </tbody>
        </InternalTableWrapper>
        <p>To be eligible for a trading discount</p>
        <ul>
          <li>There must be more than 1 GVT stored in the wallet</li>
          <li>
            The "Using GVT to pay for fees" function must be enabled. The fee
            will be charged at a discount depending on the amount of GVT stored
            in the wallet.
          </li>
          <li>
            The discounted fee will be charged from the GVT wallet, not from the
            trading account.
          </li>
        </ul>
        <p>
          <b>Note</b>
        </p>
        <ul>
          <li>
            If you switch this function off, the fee will become "Regular" and
            charge 100%.
          </li>
          <li>
            If you have enabled the "Using GVT to pay for fees" function but
            have an insufficient amount of GVT stored in the wallet, this
            function will no longer work and the fee will become Regular.
          </li>
        </ul>
        <p>
          There are also other purposes for storing GVT on a Genesis Vision
          account:
        </p>
        <ul>
          <li>Follow subscriptions have to be paid by investors in GVT</li>
          <li>Each fund must allocate at least 1% of its composition to GVT</li>
          <li>
            Profits made by the traders are paid out to the investors in GVT
          </li>
          <li>
            At the end of each quarter, 3% of GVT received as profit on the
            platform is burned.
          </li>
        </ul>
      </>
    )
  },
  {
    id: "gvt-4",
    title: "Do you have a token burn?",
    content: <p>Yes, the token burn occurs at the end of each quarter.</p>
  }
];

export const faqICO: TAccordion[] = [
  {
    id: "ico-1",
    title: "What was the ICO price?",
    content: <p>The price at ICO was 1 GVT = $1</p>
  },
  {
    id: "ico-2",
    title: "When was the ICO?",
    content: (
      <p>
        The Genesis Vision crowdsale campaign was held from 15th October 2017 to
        15th November 2017.
      </p>
    )
  },
  {
    id: "ico-3",
    title: "What is the total supply of GVT?",
    content: <p>The total supply of GVT was 4,436,643.</p>
  },
  {
    id: "ico-4",
    title: "What happened to unsold tokens?",
    content: <p>All the unsold tokens were burned.</p>
  }
];
