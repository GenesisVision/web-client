import classNames from "classnames";
import ImageBaseElement from "components/avatar/image-base.element";
import { Row } from "components/row/row";
import { withBlurLoader } from "decorators/with-blur-loader";
import { ProfileFullViewModel } from "gv-api-web";
import Email from "media/email.svg";
import CopyButton from "modules/copy-button/copy-button";
import * as React from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { rawUrlEncode } from "utils/helpers";

import styles from "./referral-program.module.scss";

const _InviteBlock: React.FC<{ data: ProfileFullViewModel }> = ({
  data: { refUrl, lastName, firstName, userName }
}) => {
  const [t] = useTranslation();
  return (
    <div>
      <Row>
        <h4>{t("profile-page:referral-program.title")}</h4>
      </Row>
      <Row className={styles["referral-program__link-block"]}>
        {t("profile-page:referral-program.referral-link")}
        <div className={styles["referral-program__link"]}>{refUrl}</div>
        <CopyButton value={refUrl} />
      </Row>
      <Row onlyOffset className={styles["referral-program__share-block"]}>
        {t("profile-page:referral-program.share-your-passion")}
        {refUrl && (
          <ShareBlock
            userName={userName}
            firstName={firstName}
            lastName={lastName}
            refUrl={refUrl}
          />
        )}
      </Row>
    </div>
  );
};

const _ShareBlock: React.FC<{
  userName: string;
  firstName: string;
  lastName: string;
  refUrl: string;
}> = ({ userName, firstName, lastName, refUrl }) => {
  const name = firstName || lastName || userName || "";
  const shareMessage = `Hey! ${name} has invited you to join Genesis Vision!`;
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5db2b33a238474cd";
    document.getElementsByTagName("head")[0].appendChild(script);
  }, []);
  useEffect(() => {
    // @ts-ignore
    window.addthis &&
      // @ts-ignore
      window.addthis.layers.refresh &&
      // @ts-ignore
      window.addthis.layers.refresh();
  }, [window]);
  return (
    <div className={styles["referral-program__share-buttons"]}>
      <div
        className={"addthis_inline_share_toolbox"}
        data-title={shareMessage}
        data-url={refUrl}
      />
      <div
        className={classNames(
          styles["referral-program__share-buttons--email"],
          "at-icon-wrapper"
        )}
      >
        <a
          title={"Email"}
          target="_blank"
          rel="noopener noreferrer"
          href={`mailto:?body=${rawUrlEncode(`${shareMessage} ${refUrl}`)} `}
        >
          <ImageBaseElement alt={"Email"} src={Email} />
        </a>
      </div>
    </div>
  );
};
const ShareBlock = React.memo(_ShareBlock);

export const inviteBlockLoaderData = {
  userName: "",
  firstName: "",
  lastName: "",
  refUrl: ""
} as ProfileFullViewModel;

export const InviteBlock = withBlurLoader(React.memo(_InviteBlock));
