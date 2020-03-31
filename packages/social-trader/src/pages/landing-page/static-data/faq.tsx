import { TAccordion } from "pages/landing-page/components/accordion/accordion";
import React from "react";

export const faqGeneral: TAccordion[] = [
  {
    id: 0,
    title: "What is Genesis Vision?",
    contents: [
      {
        text:
          "Genesis Vision is a decentralized asset management platform built on blockchain technology. It’s designed to connect people who want to trade (or access the investment landscape) with individuals who actually know how to trade. Genesis Vision investors trust their funds to Genesis Vision managers, who trade using the pool of attracted funds, subsequently sharing the resulting profit with all of their investors at the end of a set period (set individually by the manager)."
      }
    ]
  },
  {
    id: 1,
    title: "Who are GV managers?",
    contents: [
      {
        text:
          "GV managers are companies/individuals with proven trading history, ready to acquire investors' money for management on the investors behalf. The profit, received as a result of management of the total funds, is shared proportionally between the managers and investors. Managers charge commissions for their service and they can select these themselves."
      }
    ]
  },
  {
    id: 2,
    title: "Who are GV investors?",
    contents: [
      {
        text:
          "GV investors are the market participants who do not trade within the market directly. Instead, investors transfer their funds to experienced traders who manage the funds for them. Investors get their shares from their managers’ profits."
      }
    ]
  },
  {
    id: 3,
    title: "Does Genesis Vision have mobile apps?",
    contents: [
      {
        text: (
          <>
            Yes, we have{" "}
            <a
              title={"Get iOS application"}
              href="https://itunes.apple.com/app/genesis-vision-investor/id1369865290"
              target="_blank"
              rel="noopener noreferrer"
            >
              iOS application
            </a>{" "}
            and{" "}
            <a
              title={"Get Android application"}
              href="https://play.google.com/store/apps/details?id=vision.genesis.clientapp.investor"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Android application{" "}
            </a>
            for investors. For managers there is only a web version available at
            the moment.
          </>
        )
      }
    ]
  }
];

export const faqAccount: TAccordion[] = [
  {
    id: 4,
    title:
      "I haven’t received a confirmation email after successful registration. What should I do?",
    contents: [
      {
        text: (
          <>
            First of all check all the folders in your inbox, including the spam
            folder. The email might be there, if it’s not there, kindly contact
            our Support team:{" "}
            <a
              title={"Write a email to Genesis Vision support"}
              href="mailto:support@genesis.vision"
            >
              support@genesis.vision
            </a>
            .
          </>
        )
      }
    ]
  },
  {
    id: 5,
    title: "I would like to stay anonymous. Can I put fake data to my profile?",
    contents: [
      {
        text:
          "As per our Terms and Conditions, the Client is obliged to provide genuine personal data. However, in accordance with the Privacy policy, we won't disclose our clients' personal details. The manager decides what information to include in their public profile."
      }
    ]
  },
  {
    id: 6,
    title: "Does GV have a KYC procedure?",
    contents: [
      {
        text: "Yes, the KYC solution is provided by the company Sum&Substance."
      },
      {
        text:
          "Without verification, an investor can invest in investment programs or GV Funds up to 500GVT. As soon as the investor passes the verification procedure, they can invest without any limits."
      },
      {
        text:
          "There is a different situation for managers. Without passing the KYC procedure a manager is stuck on the 1st level. On the first level, a manager can attract the equivalent of 1000 USD. Once the verification is passed, the manager receives a second level and he can attract the equivalent of 5000 USD."
      }
    ]
  },
  {
    id: 7,
    title: "How can I secure my account?",
    contents: [
      {
        text:
          "We highly recommend securing your trading account with the help of 2FA, which can be enabled in the account settings."
      }
    ]
  },
  {
    id: 8,
    title: "I forgot my password. What should I do?",
    contents: [
      {
        text: (
          <>
            When you sign in, you can click the 'Forgot your password?' link and
            enter the email address you have used to create an account with us.
            You will get an email with a link for resetting your password.
          </>
        )
      }
    ]
  },
  {
    id: 9,
    title: "Can I close my account?",
    contents: [
      {
        text: (
          <>
            If you wish to terminate your account please send an official
            request using the e-mail address you have registered your account
            with to our Support team:{" "}
            <a
              title={"Write a email to Genesis Vision support"}
              href="mailto:support@genesis.vision"
            >
              support@genesis.vision
            </a>
            . They will review your request within a 24 hour timeframe.
          </>
        )
      }
    ]
  }
];

export const faqPrograms: TAccordion[] = [
  {
    id: 10,
    title: "What is an investment program?",
    contents: [
      {
        text:
          "Investment programs are an investment product similar to PAMM accounts. A manager creates an investment program, where he chooses the sizes of the fees and the duration of the reporting period. A manager then proceeds to trade, while his activity results are allocated between all of the GV investors who have invested in his program."
      }
    ]
  },
  {
    id: 11,
    title: "What is the reporting period?",
    contents: [
      {
        text:
          "The reporting period is a period used to determine the interval of time in which the manager is supposed to conduct trading operations and report about the resulting profit or loss."
      },
      {
        text:
          "Investments made by the GV investors appear on the managers' balance at the beginning of the reporting period, while all of the resulting profit is being distributed at the end of the reporting period. When a manager creates an investment program, he can select the duration of the reporting period by himself."
      }
    ]
  },
  {
    id: 12,
    title: "What are the fees?",
    contents: [
      {
        text:
          "Investment programs have two fees and their size is determined by the manager. An entry fee is a commission for investment, which is charged upon every investment in the program. A success fee is a commission payment for the successful work of the manager, and it is charged from your total profit."
      },
      {
        text:
          "There is also a platform fee of 0,5% charged upon every investment and the platform also charges a 10% success fee from the profit from both investment programs and GV Funds."
      }
    ]
  },
  {
    id: 13,
    title: "What do stop-outs mean?",
    contents: [
      {
        text: (
          <>
            <b>Stop out</b> is a compulsory closing of positions at current
            market prices when a loss reaches the Stop out level. The period is
            automatically closed and all money is distributed to investors minus
            a loss. If the current reporting period of an investment program was
            ended due to the Stop out trigger, then in the next period the
            investors who had investments in the program when Stop Out have
            triggered, the Entry fee = 0.
          </>
        )
      }
    ]
  }
];

export const faqFunds: TAccordion[] = [
  {
    id: 14,
    title: "How do I invest in a GV Fund?",
    contents: [
      {
        text:
          "The investment process is similar to an investment in an Investment Program: you can top up your Genesis Vision account balance using BTC/ETH/GVT/USDT, and then use them to invest in your chosen GV Fund. To do that just click «invest», while you’re on the specified GV Fund page."
      }
    ]
  },
  {
    id: 15,
    title:
      "Do I need to wait for my GV Funds investment request to be executed, or is the investment instantaneous?",
    contents: [
      {
        text:
          "No, GV Funds don’t have reporting periods, so when you invest your GVT into a GV Fund, your investment is accepted almost immediately. The same goes for withdrawals as well."
      }
    ]
  },
  {
    id: 16,
    title:
      "What are the target and current percentages? & What do they actually mean?",
    contents: [
      {
        text:
          "Due to the changes in the price of the underlying assets included in the fund, the proportion of the allocated funds may change over time. The desired percentage selected by the manager is called “target”, while “current” shows the current allocation of funds. All of the funds are automatically reallocated each week to meet their target allocation values."
      }
    ]
  },
  {
    id: 17,
    title: "What are the GV Funds fees?",
    contents: [
      {
        text:
          "GV Funds have two separate fees, one of them being the entry fee and the other one being an exit fee. Both fees are pretty self-explanatory: entry fee is charged from the amount that you are investing in the GV Fund, and the exit fee is charged upon your withdrawal amount. The platform fee of 0,5% will also be charged from every investment in both investment programs and GV Funds. Just like in the case with investment programs, the managers are able to select the sizes of their fees for themselves (with the maximum fee being 10%)."
      }
    ]
  },
  {
    id: 18,
    title: "What are the benefits of creating a GV Fund for a manager?",
    contents: [
      {
        text:
          "In order to set up a GV Fund, a manager is required to invest the equivalent of 50 GVT of his own funds. Once the GV Fund is up and running, a GV manager will be able to profit from the fund on the same basis as his investors, with additional profit coming from entry and exit commissions."
      }
    ]
  },
  {
    id: 19,
    title: "What’s the best way to choose a suitable fund?",
    contents: [
      {
        text:
          "Pay close attention to all of the data that is provided. We need to warn you, that almost all of the ratios will not be able to give you sufficient information about the performance of the fund, for at least the first three months of the GV Fund history. Always pay attention to the fund’s chart and its overall structure."
      }
    ]
  },
  {
    id: 20,
    title: "What changes can a manager make to his/her own fund?",
    contents: [
      {
        text:
          "Once every 30 days, a manager can reallocate his fund, meaning that he can change the target percentages and remove or add new assets. A manager is also able to edit the fund, changing its title, description and picture."
      }
    ]
  },
  {
    id: 21,
    title: "How are GV Funds profit formed?",
    contents: [
      {
        text:
          "When you invest in a GV Fund, you basically purchase all of the underlying assets, that are included within it. The profit is received from the organic price growth of the assets in the GV Fund. Once the price of the assets goes up, so does the price of your share (or unit). When an investor decides to withdraw his or her investment, all of the funds held within the fund are sold off, and the resulting profit is converted back into GVT."
      }
    ]
  },
  {
    id: 22,
    title: "Why is the withdrawal amount reflected as a percentage?",
    contents: [
      {
        text:
          "Withdrawal from GV Funds is made as a percentage because it is almost impossible to calculate the exact investors share upon the time of withdrawal, due to all underlying commissions and conversions that will take place upon submission of the trades, ready for withdrawal."
      }
    ]
  }
];

export const faqInvestorAccount: TAccordion[] = [
  {
    id: 23,
    title: "How to become an investor?",
    contents: [
      {
        text:
          "In order to become an investor, you simply need to register in the investor section of the website."
      }
    ]
  },
  {
    id: 24,
    title: "How to make an investment?",
    contents: [
      {
        text:
          "In order to start investing, you first need to make a deposit to your account balance. Once your balance is topped up, you can invest in investment programs and GV Funds by simply clicking an “invest” button on the page of the respective investment product you wish to use."
      }
    ]
  },
  {
    id: 25,
    title: "Which currencies can I use to deposit?",
    contents: [
      {
        text:
          "You can deposit using one of the following cryptocurrencies: BTC/ETH/GVT/USDT"
      }
    ]
  },
  {
    id: 26,
    title: "What is “the currency of the investment program”?",
    contents: [
      {
        text:
          "Investment programs can have different account currencies to operate in different markets. If you don’t have a currency that a particular investment program requires you to have, you can always exchange currencies within your wallet."
      }
    ]
  },
  {
    id: 27,
    title: "When will my investment request be accepted?",
    contents: [
      {
        text:
          "Your investment request will be accepted only at the beginning of the respective reporting period."
      }
    ]
  },
  {
    id: 28,
    title: "Can I cancel an investment request?",
    contents: [
      {
        text:
          "Yes, if your investment has not yet been accepted by the manager, you can cancel it from the investor dashboard section."
      }
    ]
  },
  {
    id: 29,
    title: "When will I receive my profit?",
    contents: [
      {
        text:
          "In the case with investment programs, all of the profit is distributed at the end of the reporting period. However, an investor can withdraw the profit from a GV Fund at any moment."
      }
    ]
  },
  {
    id: 30,
    title: "What should I do if I am not happy with the program?",
    contents: [
      {
        text:
          "If you are not happy with your current investment, you can always leave a withdrawal request. It will be processed at the end of the investment program’s reporting period."
      }
    ]
  },
  {
    id: 31,
    title: "How to withdraw my investment from the program?",
    contents: [
      {
        text:
          "In order to withdraw your investment, you need to leave a withdrawal request. All of the withdrawal requests are only processed at the end of the reporting period."
      }
    ]
  },
  {
    id: 32,
    title:
      "What happens to my investment when the reporting period ends? Will it be returned to my wallet or reinvested?",
    contents: [
      {
        text:
          "It depends on if you have a “reinvestment” trigger switched on or off. You can enable or disable reinvestment on the page of the individual investment program. It works like this: if you have reinvesting turned on, then all of the profits received at the end of the reporting period will be reinvested into the same investment program. If the reinvesting feature is off, at the end of the reporting period all of the profit is withdrawn to your wallet address in the form of GVT."
      }
    ]
  },
  {
    id: 33,
    title: "What happens if a manager closes his program?",
    contents: [
      {
        text:
          "If a manager prematurely closes his investment program, all of the profit is subsequently allocated between all of his investors."
      }
    ]
  },
  {
    id: 34,
    title:
      "How can I double check the authenticity of managers trading results?",
    contents: [
      {
        list: [
          {
            text:
              "Go to Etherscan and enter the Genesis Vision contact address."
          },
          {
            text:
              "Once you opened the GV contract, press the 'Read contract button' The second item should be called “ipfsHash”. Copy it."
          },
          {
            text:
              "Once you’ve got the hash, you will need to go to the IPFS website https://gateway.ipfs.io/. Paste the hash, so that the resulting URL looks like this: https://gateway.ipfs.io/ipfs/ the hash that you’ve copied"
          },
          {
            text:
              "Once you go to that URL, you will see a list. In that list, you will need to find the name of the manager you are invested in. You can see his name on the page of the manager profile and you can use Ctrl+F in order to navigate through the IPFS list."
          },
          {
            text:
              "Once you’ve found the manager, copy his hash displayed on the right side, and paste it to the URL, just like you did before."
          },
          {
            text:
              "Now you can see the list of all of the investment programs, created by the manager. In a similar fashion, copy the hash of the investment program to the address bar of your browser."
          },
          {
            text:
              "Now you can see the trading history of the particular investment program, forever recorded within the blockchain."
          }
        ]
      }
    ]
  }
];

export const faqManagerAccount: TAccordion[] = [
  {
    id: 35,
    title: "How to become a manager?",
    contents: [
      {
        text:
          "In order to become a manager, first, you need to register via the manager section of the platform."
      }
    ]
  },
  {
    id: 36,
    title: "How to create a program?",
    contents: [
      {
        text:
          "To create a program, a manager first needs to deposit minimum investment in any supported currency into his program. The size of the investment depends on the broker you choose."
      }
    ]
  },
  {
    id: 37,
    title: "What should I write in the program description section?",
    contents: [
      {
        text:
          "Try to keep your program description as professional as  possible. It is never a bad idea to mention your trading experience and describe your trading strategy in detail."
      }
    ]
  },
  {
    id: 38,
    title: "Can I edit my program after it has been created?",
    contents: [
      {
        text:
          "Yes, you have the ability to change the details of your investment program even after it’s been created."
      }
    ]
  },
  {
    id: 39,
    title: "How can I accept an investment request?",
    contents: [
      {
        text:
          "All investment requests are accepted automatically at the beginning of each reporting period."
      }
    ]
  },
  {
    id: 40,
    title: "Can I close the program?",
    contents: [
      {
        text:
          "Yes, you can close the investment program. A manager can also finish his reporting period ahead of  time. In such a case all of the withdrawal/investment requests will be processed anticipatorily as well."
      }
    ]
  },
  {
    id: 41,
    title: "Can I create more than one program?",
    contents: [
      {
        text:
          "Yes, a manager can create an unlimited number of investment programs."
      }
    ]
  },
  {
    id: 42,
    title: "What is a manager’s level & how can I get a higher one?",
    contents: [
      {
        text:
          "A manager's level reflects the experience of the trader within the Genesis Vision platform. The higher the level of a manager shows that he has been producing consistently good results over a longer period of time."
      },
      {
        text:
          "The procedure of leveling up is very straightforward and follows a short set of rules:",
        list: [
          {
            text:
              "All managers are levelled up on the first day of each month only."
          },
          {
            text: "A manager can go up only one level at a time."
          },
          {
            text:
              "In order to level-up, you need to end up in the top 10% of investment programs ranked by profit among all of the other competing programs of the same level."
          },
          {
            text:
              "Profit is calculated as a percentage and is calculated over a certain period. The general rule of thumb is that the period of time is calculated as “managers’ level  minus one month”. For example: if your current level is 4, then the last three months of your trading will be counted."
          },
          {
            text:
              "All programs that have completed at least one trade participate in the rating."
          },
          {
            text:
              "Each level needs to have a minimum of ten participators. You can’t level up if fewer than ten people are competing against you."
          },
          {
            text:
              "The higher a manager’s level is — the more funds he can attract."
          }
        ]
      },
      {
        text:
          "The amounts that a manager can attract on each level are as follows:",
        list: [
          {
            text: <b>First level — 70 GVT</b>
          },
          {
            text: <b>Second level — 700 GVT</b>
          },
          {
            text: <b>Third level — 3,500 GVT</b>
          },
          {
            text: <b>Fourth level — 7,000 GVT</b>
          },
          {
            text: <b>Fifth level — 14,000 GVT</b>
          },
          {
            text: <b>Sixth level — 35,000 GVT</b>
          },
          {
            text: <b>Seventh level — 70,000 GVT</b>
          }
        ]
      }
    ]
  },
  {
    id: 43,
    title:
      "What happens when the period of the program ends and I still have open trades?",
    contents: [
      {
        text:
          "All the open trades get automatically closed at the end of the reporting period. If it is a Forex program and the reporting period ends during the weekend, the period will be closed on Monday, as soon as the Forex market opens."
      }
    ]
  }
];

export const faqGVT: TAccordion[] = [
  {
    id: 44,
    title: "What is GVT?",
    contents: [
      {
        text:
          "Genesis Vision has its own token: GVT (Genesis Vision Token). GVT is based on the ERC20 Ethereum token standard. GVT can be used for all investment operations and has a set of its own perks and features when used on the platform, such as various discounts and more."
      }
    ]
  },
  {
    id: 45,
    title: "Is GVT a security?",
    contents: [
      {
        text: (
          <>
            We have received a conclusion on the Howey Test passage that our
            token cannot be deemed as a security.{" "}
            <a
              title={"Read genesis vision memorandum"}
              href="https://genesis.vision/genesis-vision-memorandum.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://genesis.vision/genesis-vision-memorandum.pdf
            </a>
          </>
        )
      }
    ]
  },
  {
    id: 46,
    title: "Sell or hold? What will be the price in 2019/2020 etc.?",
    contents: [
      {
        text:
          "The team doesn’t comment or predict on the token price. The decision whether to hold GVT or sell it is entirely up to you."
      }
    ]
  }
];

export const faqICO: TAccordion[] = [
  {
    id: 47,
    title: "What was the ICO price?",
    contents: [
      {
        text: "The price at ICO was 1 GVT = $1"
      }
    ]
  },
  {
    id: 48,
    title: "When was the ICO?",
    contents: [
      {
        text:
          "The Genesis Vision crowdsale campaign was held from 15th October 2017 to 15th November 2017. There was a pre-sale procedure, based on the option’s sale."
      }
    ]
  },
  {
    id: 49,
    title: "What is the total supply of GVT?",
    contents: [
      {
        text: (
          <>
            The hard cap was 44,000,000. During the ICO the amount of 3,327,482
            GVT was sold.
            <br /> (GVT for sale - 75%;
            <br /> Bounty, marketing, advisers - 9%;
            <br /> Team tokens - 11%;
            <br /> Genesis Vision fund - 5%).
          </>
        )
      }
    ]
  },
  {
    id: 50,
    title: "What happened to unsold tokens?",
    contents: [
      {
        text:
          "All the unsold tokens were burned, resulting in a total supply of 4,436,644 GVT"
      }
    ]
  }
];
