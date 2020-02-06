import "./fees-info.scss";

import ImageBaseElement from "components/avatar/image-base.element";
import FeesTradingDiscount from "pages/landing-page/components/fees-info/fees-trading-discount";
import CHFlag from "pages/landing-page/images/flags/ch.png";
import ESFlag from "pages/landing-page/images/flags/es.png";
import FRFlag from "pages/landing-page/images/flags/fr.png";
import GBFlag from "pages/landing-page/images/flags/gb.png";
import GEFlag from "pages/landing-page/images/flags/ge.png";
import HKFlag from "pages/landing-page/images/flags/hk.png";
import JPFlag from "pages/landing-page/images/flags/jp.png";
import NLFlag from "pages/landing-page/images/flags/nl.png";
import React from "react";

interface Props {
  className?: string;
}

const _FeesTrading: React.FC<Props> = ({ className }) => (
  <div className="fees-info">
    <div className="fees-info__section">
      <div className="internal__container">
        <div className="fees-info__wrapper">
          <h2 className="fees-info__title">Crypto</h2>
        </div>
        <div className="fees-info__table-wrapper">
          <table className="fees-table ">
            <thead className="fees-table__head">
              <tr className="fees-table__row">
                <th className="fees-table__cell fees-table__cell--width-bg">
                  Amount
                </th>
                <th className="fees-table__cell">Discount</th>
                <th className="fees-table__cell">Fees</th>
              </tr>
            </thead>
            <tbody>
              <tr className="fees-table__row">
                <td className="fees-table__cell">From 1 GVT up to 10</td>
                <td className="fees-table__cell">30%</td>
                <td className="fees-table__cell">0.210%</td>
              </tr>
              <tr className="fees-table__row">
                <td className="fees-table__cell">Up to 25 GVT</td>
                <td className="fees-table__cell">35%</td>
                <td className="fees-table__cell">0.195%</td>
              </tr>
              <tr className="fees-table__row">
                <td className="fees-table__cell">Up to 50 GVT</td>
                <td className="fees-table__cell">40%</td>
                <td className="fees-table__cell">0.180%</td>
              </tr>
              <tr className="fees-table__row">
                <td className="fees-table__cell">Up to 100 GVT</td>
                <td className="fees-table__cell">45%</td>
                <td className="fees-table__cell">0.165%</td>
              </tr>
              <tr className="fees-table__row">
                <td className="fees-table__cell">Up to 500 GVT</td>
                <td className="fees-table__cell">50%</td>
                <td className="fees-table__cell">0.150%</td>
              </tr>
              <tr className="fees-table__row">
                <td className="fees-table__cell">500 GVT+</td>
                <td className="fees-table__cell">55%</td>
                <td className="fees-table__cell">0.135%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="fees-info__notes">
          <h3>Commission</h3>
          <ul className="fees-info__list-notes">
            <li className="fees-info__note-item">Regular: 0,3% trading fee</li>
            <li className="fees-info__note-item">
              GVT holders*: 30-55% discount depending on the amount of GVT
              stored in the wallet.
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="fees-info__section fees-info__section--bg-gray">
      <div className="internal__container">
        <div className="fees-info__wrapper">
          <h2 className="fees-info__title">Global</h2>
        </div>
        <div className="fees-info__table-wrapper fees-info__table-wrapper--bg-white">
          <table className="fees-table ">
            <thead className="fees-table__head">
              <tr className="fees-table__row">
                <th className="fees-table__cell">Symbol</th>
                <th className="fees-table__cell">Volume</th>
                <th className="fees-table__cell">Regular</th>
                <th className="fees-table__cell">30%</th>
                <th className="fees-table__cell">35%</th>
                <th className="fees-table__cell">40%</th>
                <th className="fees-table__cell">45%</th>
                <th className="fees-table__cell">50%</th>
                <th className="fees-table__cell">55%</th>
              </tr>
              <tr className="fees-table__row">
                <th className="fees-table__cell fees-table__cell--white" />
                <th className="fees-table__cell fees-table__cell--white" />
                <th
                  className="fees-table__cell fees-table__cell--colspan"
                  colSpan={7}
                >
                  Genesis Markets Commission rate
                </th>
              </tr>
              <tr className="fees-table__row">
                <th className="fees-table__cell fees-table__cell--white" />
                <th className="fees-table__cell fees-table__cell--white" />
                <th className="fees-table__cell fees-table__cell--white" />
                <th
                  className="fees-table__cell fees-table__cell--colspan"
                  colSpan={6}
                >
                  GVT Holder (Discount)*
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="fees-table__row">
                <td className="fees-table__cell fees-table__cell--without-border">
                  Forex
                </td>
                <td className="fees-table__cell" rowSpan={4}>
                  for 100 000 USD
                </td>
                <td className="fees-table__cell" rowSpan={4}>
                  6
                </td>
                <td className="fees-table__cell" rowSpan={4}>
                  4.2
                </td>
                <td className="fees-table__cell" rowSpan={4}>
                  3.9
                </td>
                <td className="fees-table__cell" rowSpan={4}>
                  3.6
                </td>
                <td className="fees-table__cell" rowSpan={4}>
                  3.3
                </td>
                <td className="fees-table__cell" rowSpan={4}>
                  3
                </td>
                <td className="fees-table__cell" rowSpan={4}>
                  2.7
                </td>
              </tr>
              <tr className="fees-table__row">
                <td className="fees-table__cell fees-table__cell--without-border">
                  Spot metals
                </td>
              </tr>
              <tr className="fees-table__row">
                <td className="fees-table__cell fees-table__cell--without-border">
                  Index
                </td>
              </tr>
              <tr className="fees-table__row">
                <td className="fees-table__cell">Spot commodities</td>
              </tr>
              <tr className="fees-table__row">
                <td className="fees-table__cell">Crypto-Currency</td>
                <td className="fees-table__cell">with transaction (%)</td>
                <td className="fees-table__cell">0.6</td>
                <td className="fees-table__cell">0.42</td>
                <td className="fees-table__cell">0.39</td>
                <td className="fees-table__cell">0.36</td>
                <td className="fees-table__cell">0.33</td>
                <td className="fees-table__cell">0.3</td>
                <td className="fees-table__cell">0.27</td>
              </tr>
              <tr className="fees-table__row">
                <td className="fees-table__cell">Shares USA</td>
                <td className="fees-table__cell">per share (USD)</td>
                <td className="fees-table__cell">0.2</td>
                <td className="fees-table__cell">0.14</td>
                <td className="fees-table__cell">0.13</td>
                <td className="fees-table__cell">0.12</td>
                <td className="fees-table__cell">0.11</td>
                <td className="fees-table__cell">0.1</td>
                <td className="fees-table__cell">0.09</td>
              </tr>
              <tr className="fees-table__row">
                <td className="fees-table__cell">Shares EU</td>
                <td className="fees-table__cell" />
                <td className="fees-table__cell" />
                <td className="fees-table__cell" />
                <td className="fees-table__cell" />
                <td className="fees-table__cell" />
                <td className="fees-table__cell" />
                <td className="fees-table__cell" />
                <td className="fees-table__cell" />
              </tr>
              <tr className="fees-table__row">
                <td className="fees-table__cell fees-table__cell--without-border">
                  <ImageBaseElement
                    className="fees-table__flag-img"
                    src={GBFlag}
                    alt="UK flag"
                  />{" "}
                  UK
                </td>
                <td className="fees-table__cell" rowSpan={6}>
                  order volume (%)
                </td>
                <td className="fees-table__cell">0.40</td>
                <td className="fees-table__cell">0.28</td>
                <td className="fees-table__cell">0.26</td>
                <td className="fees-table__cell">0.24</td>
                <td className="fees-table__cell">0.22</td>
                <td className="fees-table__cell">0.20</td>
                <td className="fees-table__cell">0.18</td>
              </tr>
              <tr className="fees-table__row">
                <td className="fees-table__cell fees-table__cell--without-border">
                  <ImageBaseElement
                    className="fees-table__flag-img"
                    src={GEFlag}
                    alt="Germane flag"
                  />{" "}
                  Germane
                </td>
                <td className="fees-table__cell">1.00</td>
                <td className="fees-table__cell">0.70</td>
                <td className="fees-table__cell">0.65</td>
                <td className="fees-table__cell">0.60</td>
                <td className="fees-table__cell">0.55</td>
                <td className="fees-table__cell">0.50</td>
                <td className="fees-table__cell">0.45</td>
              </tr>
              <tr className="fees-table__row">
                <td className="fees-table__cell fees-table__cell--without-border">
                  <ImageBaseElement
                    className="fees-table__flag-img"
                    src={CHFlag}
                    alt="Switzerland flag"
                  />{" "}
                  Switzerland
                </td>
                <td className="fees-table__cell">0.60</td>
                <td className="fees-table__cell">0.42</td>
                <td className="fees-table__cell">0.39</td>
                <td className="fees-table__cell">0.36</td>
                <td className="fees-table__cell">0.33</td>
                <td className="fees-table__cell">0.30</td>
                <td className="fees-table__cell">0.27</td>
              </tr>
              <tr className="fees-table__row">
                <td className="fees-table__cell fees-table__cell--without-border">
                  <ImageBaseElement
                    className="fees-table__flag-img"
                    src={FRFlag}
                    alt="France flag"
                  />{" "}
                  France
                </td>
                <td className="fees-table__cell">0.40</td>
                <td className="fees-table__cell">0.28</td>
                <td className="fees-table__cell">0.26</td>
                <td className="fees-table__cell">0.24</td>
                <td className="fees-table__cell">0.22</td>
                <td className="fees-table__cell">0.20</td>
                <td className="fees-table__cell">0.18</td>
              </tr>
              <tr className="fees-table__row">
                <td className="fees-table__cell fees-table__cell--without-border">
                  <ImageBaseElement
                    className="fees-table__flag-img"
                    src={ESFlag}
                    alt="Spain flag"
                  />{" "}
                  Spain
                </td>
                <td className="fees-table__cell">0.80</td>
                <td className="fees-table__cell">0.56</td>
                <td className="fees-table__cell">0.52</td>
                <td className="fees-table__cell">0.48</td>
                <td className="fees-table__cell">0.44</td>
                <td className="fees-table__cell">0.40</td>
                <td className="fees-table__cell">0.36</td>
              </tr>
              <tr className="fees-table__row">
                <td className="fees-table__cell">
                  {" "}
                  <ImageBaseElement
                    className="fees-table__flag-img"
                    src={NLFlag}
                    alt="Netherlands flag"
                  />{" "}
                  Netherlands
                </td>
                <td className="fees-table__cell">0.40</td>
                <td className="fees-table__cell">0.28</td>
                <td className="fees-table__cell">0.26</td>
                <td className="fees-table__cell">0.24</td>
                <td className="fees-table__cell">0.22</td>
                <td className="fees-table__cell">0.20</td>
                <td className="fees-table__cell">0.18</td>
              </tr>
              <tr className="fees-table__row">
                <td className="fees-table__cell">Shares Russia</td>
                <td className="fees-table__cell">order volume (%)</td>
                <td className="fees-table__cell">0.20</td>
                <td className="fees-table__cell">0.14</td>
                <td className="fees-table__cell">0.13</td>
                <td className="fees-table__cell">0.12</td>
                <td className="fees-table__cell">0.11</td>
                <td className="fees-table__cell">0.10</td>
                <td className="fees-table__cell">0.09</td>
              </tr>
              <tr className="fees-table__row">
                <td className="fees-table__cell">Shares Asia</td>
                <td className="fees-table__cell" />
                <td className="fees-table__cell" />
                <td className="fees-table__cell" />
                <td className="fees-table__cell" />
                <td className="fees-table__cell" />
                <td className="fees-table__cell" />
                <td className="fees-table__cell" />
                <td className="fees-table__cell" />
              </tr>
              <tr className="fees-table__row">
                <td className="fees-table__cell fees-table__cell--without-border">
                  <ImageBaseElement
                    className="fees-table__flag-img"
                    src={HKFlag}
                    alt="Hong Kong flag"
                  />{" "}
                  Hong Kong
                </td>
                <td className="fees-table__cell" rowSpan={6}>
                  order volume (%)
                </td>
                <td className="fees-table__cell">1.20</td>
                <td className="fees-table__cell">0.84</td>
                <td className="fees-table__cell">0.78</td>
                <td className="fees-table__cell">0.72</td>
                <td className="fees-table__cell">0.66</td>
                <td className="fees-table__cell">0.60</td>
                <td className="fees-table__cell">0.54</td>
              </tr>
              <tr className="fees-table__row">
                <td className="fees-table__cell">
                  <ImageBaseElement
                    className="fees-table__flag-img"
                    src={JPFlag}
                    alt="Japan flag"
                  />{" "}
                  Japan
                </td>
                <td className="fees-table__cell">0.80</td>
                <td className="fees-table__cell">0.56</td>
                <td className="fees-table__cell">0.52</td>
                <td className="fees-table__cell">0.48</td>
                <td className="fees-table__cell">0.44</td>
                <td className="fees-table__cell">0.40</td>
                <td className="fees-table__cell">0.36</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="fees-info__notes">
          <h3>Commission</h3>
          <ul className="fees-info__list-notes">
            <li className="fees-info__note-item">
              Regular: Trading fee rate depends on the tool used.The list of
              available tools and the associated fees.
            </li>
            <li className="fees-info__note-item">
              GVT holders: 30-55% discount depending on the amount of GVT stored
              in the wallet.
            </li>
          </ul>
        </div>
        <FeesTradingDiscount white />
      </div>
    </div>
  </div>
);

const FeesTrading = React.memo(_FeesTrading);
export default FeesTrading;
