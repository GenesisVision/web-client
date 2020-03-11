import "./downloads-section.scss";

import ImageBaseElement from "components/avatar/image-base.element";
import MetatraderLogo from "pages/landing-page/images/internal/metatrader.png";
import React from "react";

const DownloadsSection: React.FC = () => {
  return (
    <section className="downloads-section">
      <article className="internal__article" id="pc">
        <h1>Genesis Vision Downloads</h1>
        <h2>MetaTrader 5 for PC</h2>
        <p>
          One of the most technically advanced and popular in the world of
          terminals for exchange trading with direct access to the order books
          and other new features.
          <br />
          <a
            title={"Download Metatrader for PC"}
            href="https://download.mql5.com/cdn/web/11830/mt5/genesismarketslp5setup.exe"
          >
            Download for PC
            <br />
            <ImageBaseElement src={MetatraderLogo} alt="metatrader logo" />
          </a>
        </p>
      </article>
      <article className="internal__article" id="mobile">
        <h2>Mobile terminal</h2>
        <p>
          The application provides advanced mobile trading through your
          favourite gadget. It supports all of the basic functionality of
          MetaTrader 5, user alerts for events on transactions, and is easy to
          connect and install.
          <br />
          <a
            title={"Download Metatrader for IOS"}
            href="https://itunes.apple.com/app/metatrader-5-forex-stocks/id413251709"
            target="_blank"
            rel="noopener noreferrer"
          >
            Version for IOS
          </a>
          <br />
          <a
            title={"Download Metatrader for Android"}
            href="https://play.google.com/store/apps/details?id=net.metaquotes.metatrader5"
            target="_blank"
            rel="noopener noreferrer"
          >
            Version for Android
          </a>
        </p>
      </article>
      <article className="internal__article" id="web">
        <h2>Web platform</h2>
        <p>
          All the advanced functionality of the MetaTrader 5 platform right in
          your browser. No need to download and install. Compatible with any
          operating system (Windows, Mac OS, Linux).
          <br />
          <a
            title={"Login to platform"}
            href="https://genesismarkets.io/profile/webterminal"
            target="_blank"
            rel="noopener noreferrer"
          >
            Login to platform
          </a>
        </p>
      </article>
    </section>
  );
};

export default DownloadsSection;
