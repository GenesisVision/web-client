import SocialLink from "media/social-link.svg";
import * as React from "react";

import ImageBase, { IImageProps } from "../image-base";
import styles from "./social-link.module.scss";

const _SocialLinkImage: React.FC<IImageProps> = ({ url, alt }) => (
  <ImageBase
    className={styles["social-link-image"]}
    src={url}
    alt={alt}
    defaultImage={SocialLink}
  />
);

const SocialLinkImage = React.memo(_SocialLinkImage);
export default SocialLinkImage;
