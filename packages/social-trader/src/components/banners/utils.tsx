import { PostPreview } from "components/banners/post-preview";
import {
  DEFAULT_PERIOD,
  getWeekPeriod
} from "components/chart/chart-period/chart-period.helpers";
import { getPost } from "components/conversation/conversation.service";
import { getImageByQuality } from "components/conversation/conversation-image/conversation-image.helpers";
import { ASSET } from "constants/constants";
import {
  AbsoluteProfitChart,
  AccountBalanceChart,
  FundBalanceChart,
  FundDetailsFull,
  FundProfitPercentCharts,
  ProgramBalanceChart,
  ProgramFollowDetailsFull,
  ProgramProfitPercentCharts
} from "gv-api-web";
import unfetch from "isomorphic-unfetch";
import { NextApiRequest, NextApiResponse } from "next";
import React from "react";
import ReactDOM from "react-dom/server";
import { api } from "services/api-client/swagger-custom-client";
import filesService from "services/file-service";
import sharp from "sharp";

export type LogoOptions = {
  useMask?: boolean;
  containerSize?: { width: number; height: number };
  size: { width?: number; height: number };
  position?: {
    x?: number;
    y?: number;
  };
};

type PngOptions = LogoOptions & {
  href?: string | null;
};

export interface BannerApiContext extends NextApiRequest {
  query: { id: string };
}

const CURRENCY = "USD";

export const formatEquity = (balance: number) => {
  return Math.round(balance);
};

export const formatProfit = (profit: number) => {
  return `$${profit.toFixed(2)}`;
};

export type BannerProps = {
  chart: ProgramProfitPercentCharts | FundProfitPercentCharts;
  details: ProgramFollowDetailsFull | FundDetailsFull;
  absoluteChart: AbsoluteProfitChart;
  balanceChart: ProgramBalanceChart | AccountBalanceChart | FundBalanceChart;
  logo?: string;
};

export type BannerComponent = React.ComponentType<BannerProps>;

const Mask: React.FC<{ size: number }> = ({ size }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width={size} height={size} rx="7" fill="white" />
    </svg>
  );
};

const maskImage = (logo: Buffer, size: number) => {
  const mask = ReactDOM.renderToStaticNodeStream(<Mask size={size} />).read();

  const maskPng = sharp(mask).png();

  return maskPng
    .composite([
      {
        input: logo,
        blend: "in"
      }
    ])
    .withMetadata();
};

export const createPng = async (
  svgReactStream: string,
  pngOptions: PngOptions
): Promise<Buffer> => {
  const image = sharp(Buffer.from(svgReactStream));
  if (pngOptions.href !== null && pngOptions.href !== undefined) {
    try {
      const req = await unfetch(pngOptions.href);
      const result = await req.arrayBuffer();
      const buffer = Buffer.from(result);

      const sharpedImage = sharp(buffer);

      const metadata = await sharpedImage.metadata();
      const imageRatio = metadata.height! / metadata!.width!;
      const imageWidth = Math.floor(pngOptions.size.height / imageRatio);

      const logo = await sharpedImage
        .resize(imageWidth, pngOptions.size.height)
        .toBuffer();

      const maskPng = maskImage(logo, pngOptions.size.height);

      const input = pngOptions.useMask ? await maskPng.toBuffer() : logo;

      const calculatedTop = pngOptions.containerSize
        ? Math.floor(
            pngOptions.containerSize.height / 2 - metadata!.height! / 2
          )
        : undefined;
      const top =
        pngOptions.position?.y === undefined
          ? calculatedTop || 0
          : pngOptions.position?.y;
      const calculatedLeft = pngOptions.containerSize
        ? Math.floor(pngOptions.containerSize.width / 2 - imageWidth / 2)
        : undefined;
      const left =
        pngOptions.position?.x === undefined
          ? calculatedLeft || 0
          : pngOptions.position?.x;

      image.composite([
        {
          input,
          top,
          left
        }
      ]);
    } catch (e) {
      console.error("error 1:", e);
    }
  }

  return await image.toBuffer();
};

const createPostPreview = async (href: string): Promise<Buffer | string> => {
  const containerSize = { height: 250, width: 350 };
  const svgReactStream = `
  <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
  ${ReactDOM.renderToStaticMarkup(
    <PostPreview containerSize={containerSize} />
  )}
  `;

  try {
    return await createPng(svgReactStream, {
      href,
      containerSize,
      position: { y: 0 },
      size: { height: containerSize.height }
    });
  } catch (e) {
    console.error("Error 3: ", e.stack);
  }

  return svgReactStream;
};

async function createBanner(
  Banner: React.ReactElement,
  pngOptions?: PngOptions
): Promise<Buffer | string> {
  const svgReactStream = `
  <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
  ${ReactDOM.renderToStaticMarkup(Banner)}
  `;

  if (pngOptions !== undefined) {
    try {
      return await createPng(svgReactStream, pngOptions);
    } catch (e) {
      console.error("Error 3: ", e.stack);
    }
  }

  return svgReactStream;
}

export async function fetchFundData(id: string) {
  const { start, end } = getWeekPeriod();
  const details = await api.funds().getFundDetails(id as string);
  const percentChart = await api
    .funds()
    .getFundProfitPercentCharts(details.id, {
      dateFrom: start,
      dateTo: end,
      currencies: [CURRENCY]
    });

  const absoluteChart = await api
    .funds()
    .getFundAbsoluteProfitChart(details.id, {
      dateFrom: start,
      dateTo: end,
      currency: CURRENCY
    });

  const balanceChart = await api.funds().getFundBalanceChart(details.id, {
    dateFrom: start,
    dateTo: end,
    maxPointCount: 100,
    currency: CURRENCY
  });

  return { details, chart: percentChart, absoluteChart, balanceChart };
}

export async function fetchFollowData(id: string) {
  const { start, end } = DEFAULT_PERIOD;
  const details = await api.follows().getFollowAssetDetails(id as string);
  const percentChart = await api.follows().getProfitPercentCharts(details.id, {
    dateFrom: start,
    dateTo: end,
    currencies: [CURRENCY]
  });

  const absoluteChart = await api.follows().getAbsoluteProfitChart(details.id, {
    dateFrom: start,
    dateTo: end,
    currency: CURRENCY
  });

  const balanceChart = await api.follows().getBalanceChart(details.id, {
    dateFrom: start,
    dateTo: end,
    maxPointCount: 100,
    currency: CURRENCY
  });

  return { details, chart: percentChart, absoluteChart, balanceChart };
}

export async function fetchProgramData(id: string) {
  const { start, end } = DEFAULT_PERIOD;
  const details = await api.programs().getProgramDetails(id as string);
  const percentChart = await api
    .programs()
    .getProgramProfitPercentCharts(details.id, {
      dateFrom: start,
      dateTo: end,
      currencies: [CURRENCY]
    });

  const absoluteChart = await api
    .programs()
    .getProgramAbsoluteProfitChart(details.id, {
      dateFrom: start,
      dateTo: end,
      currency: CURRENCY
    });

  const balanceChart = await api.programs().getProgramBalanceChart(details.id, {
    dateFrom: start,
    dateTo: end,
    maxPointCount: 100,
    currency: CURRENCY
  });

  return { details, chart: percentChart, absoluteChart, balanceChart };
}

export const createPostPreviewApi = () => {
  return async (req: BannerApiContext, res: NextApiResponse) => {
    const {
      query: { id }
    } = req;

    try {
      const { images } = await getPost({ id: id as string });

      const previewImage = images.length
        ? getImageByQuality(images[0].resizes, "Low").logoUrl
        : "";

      const banner = await createPostPreview(previewImage);

      res.statusCode = 200;
      res.setHeader("Content-Type", `image/png`);
      res.setHeader("Cache-Control", `max-age=86400`);
      res.send(banner);
    } catch (e) {
      console.error("error 2: ", e);
      res.statusCode = 500;
      res.end();
    }
  };
};

const getFetchMethod = (asset: ASSET) => {
  switch (asset) {
    case ASSET.FOLLOW:
      return fetchFollowData;
    case ASSET.FUND:
      return fetchFundData;
    case ASSET.PROGRAM:
      return fetchProgramData;
  }
};

export function createBannerApi(
  Banner: BannerComponent,
  asset: ASSET,
  logoOptions?: LogoOptions
) {
  return async (req: BannerApiContext, res: NextApiResponse) => {
    const {
      query: { id }
    } = req;

    try {
      const method = getFetchMethod(asset);
      const { chart, details, absoluteChart, balanceChart } = await method(
        id as string
      );

      const banner = await createBanner(
        <Banner
          chart={chart}
          details={details}
          absoluteChart={absoluteChart}
          balanceChart={balanceChart}
        />,
        logoOptions
          ? {
              href: filesService.getFileUrl(details.publicInfo.logo),
              ...logoOptions
            }
          : undefined
      );

      res.statusCode = 200;
      res.setHeader("Content-Type", `image/${logoOptions ? "png" : "svg+xml"}`);
      res.setHeader("Cache-Control", `max-age=86400`);
      res.send(banner);
    } catch (e) {
      console.error("error 2: ", e);
      res.statusCode = 500;
      res.end();
    }
  };
}
