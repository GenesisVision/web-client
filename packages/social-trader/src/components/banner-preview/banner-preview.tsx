import GVTextField from "components/gv-text-field";
import React from "react";

type Props = {
  url: string;
  title: string;
  type?: "png" | "svg";
};

const BannerPreview: React.FC<Props> = ({ url, title, type = "png" }) => (
  <div>
    {type === "png" && <img src={url} alt={title} />}
    {type === "svg" && <embed src={url} />}
    <GVTextField wide value={url} name={"src"} />
  </div>
);

export default BannerPreview;
