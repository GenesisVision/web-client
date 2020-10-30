import { Center } from "components/center/center";
import Link from "components/link/link";
import { RowItem } from "components/row-item/row-item";
import { Text } from "components/text/text";
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
  { label: "footer.fees", href: FEES_ROUTE }
];

const _Footer: React.FC = () => {
  const [t] = useTranslation();
  return (
    <Center>
      {links.map(({ label, href }) => (
        <RowItem size={"xxlarge"}>
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
