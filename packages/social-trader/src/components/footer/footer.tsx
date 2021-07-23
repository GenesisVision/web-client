import { Center } from "components/center/center";
import Link from "components/link/link";
import { RowItem } from "components/row-item/row-item";
import { Text } from "components/text/text";
import { GUIDES_TOTAL_PAGE_ROUTE } from "pages/guides/guides.paths";
import {
  FAQ_ROUTE,
  FEES_ROUTE,
  REFERRAL_PROGRAM_ROUTE
} from "pages/landing-page/static-data/nav-links";
import React from "react";
import { useTranslation } from "react-i18next";

const links = [
  { label: "footer.faq", href: FAQ_ROUTE },
  { label: "footer.partners", href: REFERRAL_PROGRAM_ROUTE },
  { label: "footer.fees", href: FEES_ROUTE },
  { label: "footer.guides", href: GUIDES_TOTAL_PAGE_ROUTE }
];

const _Footer: React.FC = () => {
  const [t] = useTranslation();
  return (
    <Center wrap>
      <RowItem size={"xlarge"}>
        <Text weight={"bold"} muted>
          Copyright © 2018 - {new Date().getFullYear()} genesis.vision
        </Text>
      </RowItem>
      {links.map(({ label, href }) => (
        <RowItem size={"xlarge"}>
          <Link to={href}>
            <Text weight={"bold"} muted>
              {t(label)}
            </Text>
          </Link>
        </RowItem>
      ))}
    </Center>
  );
};

export const Footer = React.memo(_Footer);
