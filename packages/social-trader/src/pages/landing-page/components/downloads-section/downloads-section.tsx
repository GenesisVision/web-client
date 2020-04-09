import "./downloads-section.scss";

import ImageBaseElement from "components/avatar/image-base.element";
import MetatraderLogo from "pages/landing-page/images/internal/metatrader.png";
import React from "react";

const MetatraderPCLink =
  "https://download.mql5.com/cdn/web/15879/mt5/genesismarketsltd5setup.exe";
const MetatraderIOSLink =
  "https://download.mql5.com/cdn/mobile/mt5/ios?server=GenesisMarketsLtd-Demo,GenesisMarketsLtd-Live";
const MetatraderAndroidLink =
  "https://download.mql5.com/cdn/mobile/mt5/android?server=GenesisMarketsLtd-Demo,GenesisMarketsLtd-Live";
const MetatraderLoginLink = "https://genesis.vision/trade/mt5";

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
          <a title={"Download Metatrader for PC"} href={MetatraderPCLink}>
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
            href={MetatraderIOSLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Version for IOS
          </a>
          <br />
          <a
            title={"Download Metatrader for Android"}
            href={MetatraderAndroidLink}
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
          <a title={"Login to MetaTrader platform"} href={MetatraderLoginLink}>
            Login to platform
          </a>
        </p>
      </article>
    </section>
  );
};

export default DownloadsSection;
