import Link from "components/link/link";
import { useTranslation } from "i18n";
import React from "react";
import styled, { css } from "styled-components";
import { $landingLinkHover, $mainColor } from "utils/style/colors";
import { mediaBreakpointTablet } from "utils/style/media";
import { transition } from "utils/style/mixins";

import styles from "./seo-list.module.scss";

interface ISeoItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  state?: string;
  name: string;
  href: string;
  icon?: JSX.Element;
  onClick?(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void;
}

const linkStyle = css`
  ${transition("color")};
  display: block;
  font-size: 14px;
  padding-top: 20px;
  padding-bottom: 20px;
  color: ${$mainColor};

  &:hover,
  &:active {
    color: ${$landingLinkHover};
  }

  ${mediaBreakpointTablet(`
    font-weight: 500;
    font-size: 14px;
    padding-bottom: 40px;
    padding-top: 0;
  `)}
`;

const StyledA = styled.a`
  ${linkStyle}
`;
const StyledLink = styled(Link)`
  ${linkStyle}
`;

const _SeoItem: React.FC<ISeoItemProps> = ({ href, name, state, onClick }) => {
  const { t } = useTranslation();
  const title = t(name);
  return (
    <li className={styles["seo-list__item"]}>
      {href.includes("http") ? (
        <StyledA title={title} href={href}>
          {title}
        </StyledA>
      ) : (
        <StyledLink
          title={title}
          onClick={onClick}
          to={{ pathname: href as string, state }}
        >
          {title}
        </StyledLink>
      )}
    </li>
  );
};
const SeoItem = React.memo(_SeoItem);
export default SeoItem;
