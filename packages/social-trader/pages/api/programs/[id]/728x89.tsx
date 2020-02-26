import SimpleChart from "components/chart/simple-chart";
import {
  ProgramFollowDetailsFull,
  ProgramProfitPercentCharts
} from "gv-api-web";
import { NextApiRequest, NextApiResponse } from "next";
import React from "react";
import ReactDOM from "react-dom/server";
import programsApi from "services/api-client/programs-api";
import filesService from "services/file-service";

type Position = { y: number };

const Title: React.FC<Position> = ({ children, y }) => {
  return (
    <text
      fontSize={12}
      fill="rgba(255,255,255,0.5)"
      fontFamily={
        "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu, Helvetica Neue, sans-serif"
      }
    >
      <tspan x={138} y={y}>
        {children}
      </tspan>
    </text>
  );
};

const Value: React.FC<Position> = ({ children, y }) => {
  return (
    <text
      fontSize={16}
      fill="#fff"
      textAnchor="end"
      fontWeight={"bold"}
      fontFamily={
        "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu, Helvetica Neue, sans-serif"
      }
    >
      <tspan x={300} y={y}>
        {children}
      </tspan>
    </text>
  );
};

const Label: React.FC = ({ children }) => {
  return (
    <text
      fontSize={14}
      fill="#fff"
      fontFamily={
        "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu, Helvetica Neue, sans-serif"
      }
    >
      <tspan x={25} y={66}>
        {children}
      </tspan>
    </text>
  );
};

const Logo: React.FC<{ href?: string }> = ({ href }) => {
  if (!href) return null;
  return (
    <svg xmlns="http://www.w3.org/2000/svg">
      <defs>
        <rect id="rect" x="25" y="19" width="25" height="25" rx="7" />
        <clipPath id="clip">
          <use xlinkHref="#rect" />
        </clipPath>
      </defs>

      <use xlinkHref="#rect" strokeWidth="0" stroke="black" />
      <image
        x="25"
        y="19"
        href={filesService.getFileUrl(href)}
        width="25"
        height="25"
        clipPath="url(#clip)"
      />
    </svg>
  );
};

const Banner1 = (props: {
  chart: ProgramProfitPercentCharts;
  details: ProgramFollowDetailsFull;
}) => {
  const points = props.chart.charts[0];
  const statistic = props.chart.statistic;

  let title = props.details.publicInfo.title;
  if (title.length > 10) {
    title = title.slice(0, 10) + "...";
  }

  return (
    <svg
      width="728"
      height="89"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="728" height="89" fill="#1F2B35" />
      <rect x="588" width="140" height="89" fill="#131E26" />
      <Logo href={props.details.publicInfo.logo} />
      <GV />
      <Label>{title}</Label>
      <Title y={39}>Monthly Profit</Title>
      <Value y={39}>{`${statistic.profitPercent} %`}</Value>
      <Title y={66}>Equity</Title>
      <Value y={66}>{`${statistic.balance} ${points.currency}`}</Value>
      <SimpleChart data={points.chart} width={259} height={66} x={329} y={12} />
    </svg>
  );
};

const App = (props: {
  chart: ProgramProfitPercentCharts;
  details: ProgramFollowDetailsFull;
}) => {
  return ReactDOM.renderToStaticNodeStream(
    <Banner1 chart={props.chart} details={props.details} />
  );
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id }
  } = req;

  try {
    const details = await programsApi.getProgramDetails(id as string);
    const chart = await programsApi.getProgramProfitPercentCharts(details.id);

    res.statusCode = 200;
    res.setHeader("Content-Type", "image/svg+xml");
    res.send(App({ chart, details }));
  } catch (e) {
    res.statusCode = 500;
    res.end();
  }
};

const GV = () => {
  return (
    <svg
      width="97"
      height="19"
      viewBox="0 0 97 19"
      fill="none"
      y={35}
      x={611}
      xmlns="http://www.w3.org/2000/svg"
    >
      <svg
        width="34"
        height="19"
        viewBox="0 0 34 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M33.4085 2.22526C33.4085 11.284 25.9149 18.6541 16.7042 18.6541C7.49367 18.6541 0 11.284 0 2.22526C0 1.54858 0.0416716 0.881655 0.123932 0.22644L3.12465 0.22644C3.02561 0.878817 2.97402 1.54663 2.97402 2.22526C2.97402 9.67126 9.1333 15.7289 16.7042 15.7289C23.9273 15.7289 29.8665 10.2143 30.3968 3.24117L9.16018 3.24117C9.66565 6.89161 12.8558 9.71419 16.7042 9.71419C19.6833 9.71419 22.2687 8.02249 23.5188 5.56468H26.7339C25.3161 9.67427 21.3546 12.6392 16.7042 12.6392C10.8662 12.6392 6.11562 7.96695 6.11562 2.22526C6.11562 1.54166 6.18309 0.873849 6.3119 0.22644L33.2846 0.22644C33.3669 0.881655 33.4085 1.54858 33.4085 2.22526Z"
          fill="#16B9AD"
        />
      </svg>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M49.9899 3.66954H52.1109V6.74071C51.6914 7.02035 51.1745 7.25093 50.56 7.43247C49.9454 7.614 49.3718 7.705 48.8388 7.705C48.0642 7.705 47.3697 7.53905 46.7551 7.20715C46.1405 6.87526 45.6591 6.41753 45.3111 5.83396C44.9629 5.25063 44.7891 4.59188 44.7891 3.85818C44.7891 3.13136 44.9701 2.47628 45.3325 1.89294C45.6947 1.30938 46.1958 0.853482 46.8353 0.524797C47.4745 0.196569 48.1956 0.0322266 48.9987 0.0322266C49.5811 0.0322266 50.1656 0.136975 50.752 0.346701C51.3381 0.556198 51.8301 0.835833 52.2282 1.18538L50.8317 2.85195C50.583 2.60739 50.2898 2.41348 49.9526 2.27022C49.6151 2.12697 49.2935 2.05522 48.988 2.05522C48.6752 2.05522 48.3911 2.13384 48.1355 2.29108C47.8796 2.44832 47.6806 2.66309 47.5384 2.93585C47.3962 3.20837 47.3254 3.51597 47.3254 3.85818C47.3254 4.20773 47.3981 4.52037 47.544 4.79633C47.6894 5.07253 47.8903 5.2889 48.146 5.44614C48.4019 5.60338 48.6897 5.682 49.0094 5.682C49.2793 5.682 49.6063 5.59811 49.9899 5.43056V3.66954Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M53.6665 0.188599L59.9867 0.188599V2.0335H56.1392V2.93498H59.6348V4.77965H56.1392V5.69167H60.0825V7.53658H53.6665V0.188599Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M66.6801 0.188599L68.9184 0.188599V7.53658H66.8505L63.9089 3.78397V7.53658H61.6602V0.188599L63.7278 0.188599L66.6801 3.96206V0.188599Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M70.6221 0.188599L76.9423 0.188599V2.0335H73.0948V2.93498H76.5903V4.77965H73.0948V5.69167H77.038V7.53658H70.6221V0.188599Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M82.8572 2.12775C82.3599 1.95309 81.9548 1.86576 81.6423 1.86576C81.3368 1.86576 81.1839 1.97418 81.1839 2.19055C81.1839 2.35833 81.2816 2.4876 81.4771 2.57837C81.6724 2.66937 81.9833 2.77068 82.4095 2.8823C82.9425 3.02922 83.3849 3.17592 83.7365 3.32261C84.0882 3.46953 84.3956 3.70195 84.6585 4.01964C84.9211 4.33778 85.0528 4.75517 85.0528 5.27226C85.0528 5.80357 84.9123 6.24892 84.6317 6.60878C84.3511 6.96887 83.9726 7.23612 83.4967 7.41055C83.0206 7.58521 82.4913 7.67277 81.9087 7.67277C81.248 7.67277 80.5817 7.56618 79.9103 7.35302C79.2391 7.13986 78.6581 6.8483 78.168 6.4779L79.0846 4.64354C79.4609 4.96489 79.9333 5.23926 80.502 5.46617C81.0702 5.69332 81.5463 5.80701 81.9299 5.80701C82.1147 5.80701 82.2604 5.77377 82.3669 5.7073C82.4736 5.64106 82.527 5.53792 82.527 5.3981C82.527 5.23032 82.4256 5.09944 82.2231 5.005C82.0206 4.9108 81.7027 4.81109 81.2694 4.70635C80.7434 4.57363 80.3048 4.43565 79.9529 4.29217C79.6012 4.14914 79.2976 3.92726 79.0419 3.62677C78.786 3.32628 78.6581 2.92448 78.6581 2.42113C78.6581 1.93223 78.7895 1.50407 79.0524 1.13711C79.3153 0.770371 79.6882 0.489132 80.1715 0.293387C80.6546 0.0978722 81.2161 0 81.8553 0C82.438 0 83.0187 0.0802231 83.5981 0.241128C84.177 0.401803 84.6797 0.614967 85.106 0.880391L84.2108 2.73561C83.8058 2.50502 83.3546 2.3024 82.8572 2.12775Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M86.3311 7.53658H88.8037V0.188599L86.3311 0.188599V7.53658Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M94.7508 2.12775C94.2535 1.95309 93.8484 1.86576 93.5359 1.86576C93.2304 1.86576 93.0775 1.97418 93.0775 2.19055C93.0775 2.35833 93.1751 2.4876 93.3707 2.57837C93.5659 2.66937 93.8768 2.77068 94.3031 2.8823C94.8361 3.02922 95.2784 3.17592 95.6301 3.32261C95.9818 3.46953 96.2892 3.70195 96.5521 4.01964C96.8147 4.33778 96.9464 4.75517 96.9464 5.27226C96.9464 5.80357 96.8059 6.24892 96.5253 6.60878C96.2447 6.96887 95.8662 7.23612 95.3903 7.41055C94.9142 7.58521 94.3849 7.67277 93.8023 7.67277C93.1416 7.67277 92.4753 7.56618 91.8038 7.35302C91.1326 7.13986 90.5516 6.8483 90.0615 6.4779L90.9781 4.64354C91.3545 4.96489 91.8269 5.23926 92.3956 5.46617C92.9637 5.69332 93.4399 5.80701 93.8235 5.80701C94.0083 5.80701 94.1539 5.77377 94.2604 5.7073C94.3672 5.64106 94.4206 5.53792 94.4206 5.3981C94.4206 5.23032 94.3192 5.09944 94.1167 5.005C93.9141 4.9108 93.5962 4.81109 93.163 4.70635C92.637 4.57363 92.1984 4.43565 91.8465 4.29217C91.4948 4.14914 91.1911 3.92726 90.9355 3.62677C90.6796 3.32628 90.5516 2.92448 90.5516 2.42113C90.5516 1.93223 90.6831 1.50407 90.946 1.13711C91.2088 0.770371 91.5817 0.489132 92.0651 0.293387C92.5482 0.0978722 93.1096 0 93.7489 0C94.3315 0 94.9123 0.0802231 95.4917 0.241128C96.0706 0.401803 96.5733 0.614967 96.9995 0.880391L96.1044 2.73561C95.6993 2.50502 95.2481 2.3024 94.7508 2.12775Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M44.5762 10.6704H47.2192L48.7646 15.492L50.2995 10.6704H52.8253L49.969 18.0184H47.411L44.5762 10.6704Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M53.9438 18.0184H56.4165V10.6704H53.9438V18.0184Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M62.3636 12.6097C61.8663 12.435 61.4612 12.3477 61.1487 12.3477C60.8431 12.3477 60.6903 12.4561 60.6903 12.6725C60.6903 12.8405 60.7879 12.9698 60.9834 13.0605C61.1787 13.1513 61.4896 13.2528 61.9159 13.3645C62.4489 13.5114 62.8912 13.6579 63.2429 13.8048C63.5946 13.9515 63.902 14.1839 64.1649 14.5018C64.4275 14.8199 64.5592 15.2373 64.5592 15.7544C64.5592 16.2855 64.4187 16.7309 64.1381 17.0909C63.8575 17.4508 63.479 17.7181 63.0031 17.8927C62.527 18.0674 61.9977 18.1547 61.4151 18.1547C60.7544 18.1547 60.0881 18.0481 59.4166 17.8352C58.7454 17.622 58.1644 17.3302 57.6743 16.9598L58.5909 15.1255C58.9673 15.4471 59.4397 15.7212 60.0084 15.9481C60.5765 16.1755 61.0527 16.2889 61.4363 16.2889C61.6211 16.2889 61.7667 16.2557 61.8732 16.1892C61.98 16.123 62.0334 16.0201 62.0334 15.8803C62.0334 15.7125 61.932 15.5814 61.7295 15.4872C61.5269 15.3927 61.209 15.2933 60.7758 15.1883C60.2498 15.0558 59.8112 14.9176 59.4593 14.7743C59.1076 14.6311 58.8039 14.4094 58.5483 14.1087C58.2924 13.8082 58.1644 13.4064 58.1644 12.9033C58.1644 12.4142 58.2959 11.986 58.5588 11.6193C58.8216 11.2523 59.1945 10.9713 59.6779 10.7756C60.161 10.58 60.7224 10.4819 61.3617 10.4819C61.9443 10.4819 62.5251 10.5624 63.1045 10.7231C63.6834 10.884 64.1861 11.0969 64.6123 11.3626L63.7172 13.2178C63.3121 12.987 62.8609 12.7846 62.3636 12.6097Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M65.8369 18.0184H68.3096V10.6704H65.8369V18.0184Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M72.9842 12.7724C72.7391 12.9299 72.5435 13.1446 72.3981 13.4172C72.2522 13.6897 72.1797 13.9973 72.1797 14.3395C72.1797 14.6819 72.2522 14.9914 72.3981 15.2673C72.5435 15.5433 72.7391 15.7615 72.9842 15.9222C73.2294 16.0831 73.4942 16.1633 73.7782 16.1633C74.0623 16.1633 74.3217 16.0847 74.5562 15.9277C74.7909 15.7702 74.9754 15.552 75.1104 15.2724C75.2453 14.993 75.3129 14.6819 75.3129 14.3395C75.3129 13.9973 75.2453 13.6879 75.1104 13.4119C74.9754 13.1359 74.7909 12.9209 74.5562 12.7674C74.3217 12.6138 74.0623 12.5368 73.7782 12.5368C73.4942 12.5368 73.2294 12.6152 72.9842 12.7724ZM75.8555 11.006C76.4808 11.3347 76.9695 11.7888 77.321 12.3687C77.6729 12.949 77.8486 13.6023 77.8486 14.3289C77.8486 15.0626 77.6729 15.7231 77.321 16.3101C76.9695 16.8969 76.4808 17.3565 75.8555 17.6884C75.2305 18.0203 74.5269 18.1862 73.7455 18.1862C72.9638 18.1862 72.2602 18.0203 71.6352 17.6884C71.0099 17.3565 70.5216 16.8969 70.1697 16.3101C69.818 15.7231 69.6421 15.0626 69.6421 14.3289C69.6421 13.5952 69.818 12.9385 70.1697 12.3583C70.5216 11.7784 71.0099 11.3258 71.6352 11.001C72.2602 10.676 72.9638 10.5137 73.7455 10.5137C74.5269 10.5137 75.2305 10.6778 75.8555 11.006Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M84.2001 10.6704H86.4384V18.0184H84.3705L81.4289 14.2658V18.0184H79.1802V10.6704H81.2478L84.2001 14.4439V10.6704Z"
        fill="white"
      />
    </svg>
  );
};
