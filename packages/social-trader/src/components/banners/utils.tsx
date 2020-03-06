import {
  ProgramFollowDetailsFull,
  ProgramProfitPercentCharts
} from "gv-api-web";
import unfetch from "isomorphic-unfetch";
import { NextApiRequest, NextApiResponse } from "next";
import React from "react";
import ReactDOM from "react-dom/server";
import programsApi from "services/api-client/programs-api";
import filesService from "services/file-service";
import sharp from "sharp";

export type LogoOptions = {
  size: 21 | 25;
  position: {
    x: number;
    y: number;
  };
};

type PngOptions = LogoOptions & {
  href?: string | null;
};

export interface BannerApiContext extends NextApiRequest {
  query: { id: string };
}

export type BannerProps = {
  chart: ProgramProfitPercentCharts;
  details: ProgramFollowDetailsFull;
  logo?: string;
};

export type BannerComponent = React.ComponentType<BannerProps>;

const Mask: React.FC<{ size: 21 | 25 }> = ({ size }) => {
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

export const createPng = async (
  svgReactStream: NodeJS.ReadableStream,
  pngOptions: PngOptions
): Promise<Buffer> => {
  const buffer = svgReactStream.read();
  const image = sharp(buffer);

  if (pngOptions.href !== null && pngOptions.href !== undefined) {
    try {
      const req = await unfetch(filesService.getFileUrl(pngOptions.href));
      const result = await req.arrayBuffer();
      const buffer = Buffer.from(result);

      const logo = await sharp(buffer)
        .resize(pngOptions.size, pngOptions.size)
        .toBuffer();

      const mask = ReactDOM.renderToStaticNodeStream(
        <Mask size={pngOptions.size} />
      ).read();

      const maskPng = sharp(mask).png();

      maskPng
        .composite([
          {
            input: logo,
            blend: "in"
          }
        ])
        .withMetadata();

      image.composite([
        {
          input: await maskPng.toBuffer(),
          top: pngOptions.position.y,
          left: pngOptions.position.x
        }
      ]);
    } catch (e) {
      console.error(e);
    }
  }
  return image.png().toBuffer();
};

async function createBanner(
  Banner: React.ReactElement,
  pngOptions?: PngOptions
): Promise<Buffer | string> {
  const svgReactStream = ReactDOM.renderToStaticNodeStream(Banner);

  if (pngOptions !== undefined) {
    return await createPng(svgReactStream, pngOptions);
  }

  return await svgReactStream.read();
}

export default function createBannerApi(
  Banner: BannerComponent,
  logoOptions?: LogoOptions
) {
  return async (req: BannerApiContext, res: NextApiResponse) => {
    const {
      query: { id }
    } = req;

    try {
      const details = await programsApi.getProgramDetails(id as string);
      const chart = await programsApi.getProgramProfitPercentCharts(details.id);

      const banner = await createBanner(
        <Banner chart={chart} details={details} />,
        logoOptions
          ? {
              href: details.publicInfo.logo,
              ...logoOptions
            }
          : undefined
      );

      res.statusCode = 200;
      res.setHeader("Content-Type", `image/${logoOptions ? "png" : "svg+xml"}`);
      res.send(banner);
    } catch (e) {
      console.error(e);
      res.statusCode = 500;
      res.end();
    }
  };
}
