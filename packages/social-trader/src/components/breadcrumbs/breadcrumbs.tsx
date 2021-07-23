import Link from "components/link/link";
import { normalizeLinkFrom, useToLink } from "components/link/link.helper";
import { Row } from "components/row/row";
import { RowItem } from "components/row-item/row-item";
import { Text } from "components/text/text";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import styled from "styled-components";
import { $labelColor } from "utils/style/colors";

type BreadCrumbType = {
  href: string;
  label: string;
};

interface Props {
  items: BreadCrumbType[];
}

const StyledLink = styled(Link)<{ isCurrent: boolean }>`
  color: ${props => (props.isCurrent ? "white" : $labelColor)};
`;

const _BreadCrumbs: React.FC<Props> = ({ items }) => {
  const { linkCreator } = useToLink();
  const { pathname } = useRouter();
  return (
    <Row>
      {items.map(({ href, label }, index) => {
        const isCurrent = pathname === normalizeLinkFrom(href);
        return (
          <Fragment key={href}>
            {index !== 0 && (
              <RowItem>
                <Text muted>/</Text>
              </RowItem>
            )}
            <RowItem>
              <StyledLink to={linkCreator(href)} isCurrent={isCurrent}>
                {label}
              </StyledLink>
            </RowItem>
          </Fragment>
        );
      })}
    </Row>
  );
};

const BreadCrumbs = React.memo(_BreadCrumbs);
export default BreadCrumbs;
