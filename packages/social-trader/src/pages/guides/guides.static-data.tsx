import ImageBaseElement from "components/avatar/image-base.element";
import Deposit1 from "media/guides/guides-1/Deposit1.png";
import Deposit2 from "media/guides/guides-1/Deposit2.png";
import Deposit3 from "media/guides/guides-1/Deposit3.png";
import Withdrawal1 from "media/guides/guides-1/Withdrawal1.png";
import { WALLET_TOTAL_PAGE_ROUTE } from "pages/wallet/wallet.paths";
import React from "react";

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

const linkInfoDeposit = {
  link: WALLET_TOTAL_PAGE_ROUTE,
  label: "Deposit"
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
                Open your <b>GV wallet</b>.
              </li>

              <li>
                Press <b>“+”</b> for the deposit through the crypto wallet
              </li>

              <li>
                Copy your wallet address and head over to your external crypto
                wallet to use it for the transfer.
              </li>
            </ol>
            <p>The deposit will appear in your GV wallet instantly.</p>
            <ImageBaseElement
              alt={"Deposit via crypto wallet"}
              src={Deposit1}
            />
          </>
        ),
        linkInfo: linkInfoDeposit
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
                Open your <b>GV wallet</b>.
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
              </li>
              <li>
                Fill in all the required details. The system will remember this
                information for future deposits.
              </li>
            </ol>
            <ImageBaseElement alt={"Deposit via bank card"} src={Deposit2} />
            <ImageBaseElement alt={"Deposit via bank card"} src={Deposit3} />
          </>
        ),
        linkInfo: linkInfoDeposit
      },
      {
        id: "deposit-3",
        canonicalName: "withdrawal",
        name: "Withdrawal",
        content: (
          <>
            <h3>To withdraw from your GV wallet follow the simple steps:</h3>
            <ol>
              <li>Log in to your account.</li>
              <li>
                Open your <b>GV wallet</b>.
              </li>
              <li>
                Press the <b>“↑“</b> sign and fill in the data in the window
                opened: your crypto wallet address and the amount to withdraw.
              </li>
              <li>
                <b>Confirm</b> your withdrawal in the confirmation email sent to
                your e-mail address.
              </li>
            </ol>
            <ImageBaseElement alt={"Withdrawal"} src={Withdrawal1} />
          </>
        ),
        linkInfo: linkInfoDeposit
      }
    ]
  }
];
