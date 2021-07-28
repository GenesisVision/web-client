import Link from "components/link/link";
import { normalizeLinkFrom, useToLink } from "components/link/link.helper";
import { RowItem } from "components/row-item/row-item";
import { Text } from "components/text/text";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { $labelColor } from "utils/style/colors";
import { adaptiveMargin } from "utils/style/mixins";
import { $paddingSmall, $paddingXsmall } from "utils/style/sizes";

type BreadCrumbType = {
  href: string;
  label: string;
};

interface Props {
  items: BreadCrumbType[];
}

const Container = styled.ul`
  display: flex;
  padding: 0px;
  ${adaptiveMargin("bottom", $paddingSmall)}
`;

const StyledRowItem = styled(RowItem)`
  &:not(:last-child) {
    &:after {
      content: "/";
      color: ${$labelColor};
      ${adaptiveMargin("left", $paddingXsmall)}
    }
  }
`;

const _BreadCrumbs: React.FC<Props> = ({ items }) => {
  const { linkCreator } = useToLink();
  const { asPath } = useRouter();
  return (
    <Container itemScope itemType="https://schema.org/BreadcrumbList">
      {items.map(({ href, label }, index) => {
        const isCurrent = asPath === normalizeLinkFrom(href);
        return (
          <StyledRowItem
            key={href}
            as={"li"}
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            {isCurrent ? (
              <Text itemProp="name">{label}</Text>
            ) : (
              <Link itemProp={"item"} to={linkCreator(href)}>
                <Text itemProp="name" muted>
                  {label}
                </Text>
              </Link>
            )}
            <meta itemProp="position" content={`${index + 1}`} />
          </StyledRowItem>
        );
      })}
    </Container>
  );
};

const BreadCrumbs = React.memo(_BreadCrumbs);
export default BreadCrumbs;
