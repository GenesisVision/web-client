import "./referral-program-section.scss";

import React from "react";
import AdvantagesList from "routes/ssr/landing-page/components/advantages-list/advantages-list";
import { refProgItems } from "routes/ssr/landing-page/static-data/referral-progs";

const renderLastItem = () => (
  <p className="advantages-container__text">
    A 2-level partner program is utilized by the Genesis Vision platform. Invite
    your friends to sign up for the Genesis Vision platform and you will be
    eligible to receive up to 30% commission from their paid fees for the 1st
    level referrals and up to 3% for the 2nd level referrals.
  </p>
);

const ReferralProgramSection: React.FC = () => {
  return (
    <section className="referral-program-section">
      <div className="internal__container">
        <h1 className="referral-program-section__title">
          Genesis Vision Referral program
        </h1>
        <h2 className="referral-program-section__subtitle">
          How to invite your friends
        </h2>
        <AdvantagesList
          advantagesItems={refProgItems}
          className="referral-program-section__adv-list"
          lastItem={renderLastItem()}
        />
        <h2 className="referral-program-section__subtitle">
          2-level partner program implementation principle
        </h2>
        <div className="referral-program-section__img" />
      </div>
      <div className="referral-program-section__wrapper">
        <div className="internal__container">
          <div className="referral-program-section__list">
            <h3>Rate and general rules for obtaining the agent's commission</h3>
            <ul className="internal__list">
              <li className="internal__list-item">
                Commission rate directly depends on the amount of GVT stored in
                the wallet.
              </li>
              <li className="internal__list-item">
                If there is less than 1 000 GVT stored in the wallet, the
                commission will be 15% of the paid fees from the 1st level
                referrals and 1,5% of the fees from the 2nd level referrals.
              </li>
              <li className="internal__list-item">
                If there is 1 000 GVT or more stored in the wallet, the
                commission will be 30% of the paid fees from the 1st level
                referrals and up to 3% of the fees from the 2nd level referrals.
              </li>
              <li className="internal__list-item">
                Agent's commissions are accrued once per day at 9:00 AM (UTC).
              </li>
              <li className="internal__list-item">
                The commissions from all your referrals are summarized each day
                and the total amount accrued for that day is transferred to the
                wallets. The wallet currency depends on the currency used by
                your referrals to pay for fees.
              </li>
              <li className="internal__list-item">
                The wallet is checked for a 1 000 GVT balance once per day at a
                random time.
              </li>
            </ul>
          </div>
          <div className="referral-program-section__list">
            <h3>The list of fees used to pay the agent’s commissions</h3>
            <ul className="internal__list">
              <li className="internal__list-item">
                Trading Fee commission: generated from each transaction if the
                referral is trading on Genesis Markets Crypto.
              </li>
              <li className="internal__list-item">
                Entry Fee commission: the Entry Fee that is charged to investors
                entering the referrals' programs created with any trading
                account other than Genesis Markets Crypto.
              </li>
              <li className="internal__list-item">
                Platform Success fee commission: It is calculated according to
                the HWM system as a percentage of the profit received from a
                program during the reporting period or from a trade transaction
                when copy trading. No profit means no Platform Success fee is
                charged.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReferralProgramSection;
