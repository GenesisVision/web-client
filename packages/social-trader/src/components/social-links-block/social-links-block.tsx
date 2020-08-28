import SocialLinkImage from "components/avatar/social-link/social-link";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { SocialLinkViewModel } from "gv-api-web";
import * as React from "react";
import styled from "styled-components";

const StyledA = styled.a`
  display: inline-flex;

  &:hover {
    transform: translateY(-0.5px);
    box-shadow: 0 6px 6px -3px rgb(0, 0, 0);
    border-radius: 50%;
  }
`;

const _SocialLinksBlock: React.FC<Props> = ({ socialLinks }) => {
  return (
    <Row wrap>
      {socialLinks.map(socialLink => {
        const value = "value" in socialLink ? socialLink.value : 0;
        return (
          <RowItem bottomOffset size={"small"} key={socialLink.name}>
            <StyledA
              title={socialLink.name}
              key={socialLink.type}
              href={socialLink.url + value}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialLinkImage url={socialLink.logoUrl} alt={socialLink.name} />
            </StyledA>
          </RowItem>
        );
      })}
    </Row>
  );
};

const SocialLinksBlock = React.memo(_SocialLinksBlock);
export default SocialLinksBlock;

interface Props {
  socialLinks: Array<SocialLinkViewModel>;
}
