import Dialog from "components/dialog/dialog";
import { DialogBottom } from "components/dialog/dialog-bottom";
import GVButton from "components/gv-button";
import { Li } from "components/li/li";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { KYC_ROUTE } from "components/profile/profile.constants";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import { Ul } from "components/ul/ul";
import * as React from "react";
import { useTranslation } from "react-i18next";

import styles from "./investment-limit-popup.module.scss";

interface Props {
  open: boolean;
  onClose: () => void;
}

const _InvestmentLimitPopup: React.FC<Props> = ({ open, onClose }) => {
  const { linkCreator } = useToLink();
  const [t] = useTranslation();
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogBottom className={styles["investment-limit-popup"]}>
        <Row />
        <Row>
          <RowItem wide>
            <h3>{t("dashboard-page:kyc-limit.text-1")}</h3>
          </RowItem>
          <RowItem>
            <Link to={linkCreator(KYC_ROUTE, KYC_ROUTE)}>
              <GVButton color="primary">
                {t("dashboard-page:kyc-limit.text-2")}
              </GVButton>
            </Link>
          </RowItem>
        </Row>
        <Row>
          <Ul>
            <Li>
              <Text muted>{t("dashboard-page:kyc-limit.text-3")}</Text>
            </Li>
            <Li>
              <Text muted>{t("dashboard-page:kyc-limit.text-4")}</Text>
            </Li>
            <Li>
              <Text muted>{t("dashboard-page:kyc-limit.text-5")}</Text>
            </Li>
            <Li>
              <Text muted>{t("dashboard-page:kyc-limit.text-6")}</Text>
            </Li>
            <Li>
              <Text muted>{t("dashboard-page:kyc-limit.text-7")}</Text>
            </Li>
            <Li>
              <Text muted>{t("dashboard-page:kyc-limit.text-8")}</Text>
            </Li>
          </Ul>
        </Row>
        <Row size={"xlarge"}>
          <h3>{t("dashboard-page:kyc-limit.text-9")}</h3>
        </Row>
        <Row>
          <Ul>
            <Li>
              <Text muted>{t("dashboard-page:kyc-limit.text-10")}</Text>
            </Li>
            <Li>
              <Text muted>{t("dashboard-page:kyc-limit.text-11")}</Text>
            </Li>
            <Li>
              <Text muted>{t("dashboard-page:kyc-limit.text-12")}</Text>
            </Li>
          </Ul>
        </Row>
        <Row size={"xlarge"}>
          <Text muted>{t("dashboard-page:kyc-limit.text-13")}</Text>
        </Row>
      </DialogBottom>
    </Dialog>
  );
};

export const InvestmentLimitPopup = React.memo(_InvestmentLimitPopup);
