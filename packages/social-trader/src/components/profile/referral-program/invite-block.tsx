import GVButton from "components/gv-button";
import CopyIcon from "components/icon/copy-icon";
import { withBlurLoader } from "decorators/with-blur-loader";
import { ProfileFullViewModel } from "gv-api-web";
import useCopy from "hooks/copy.hook";
import Email from "media/email.svg";
import * as React from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { rawUrlEncode } from "utils/helpers";

const _InviteBlock: React.FC<{ data: ProfileFullViewModel }> = ({
  data: { refUrl, lastName, firstName }
}) => {
  const copy = useCopy();
  const [t] = useTranslation();
  return (
    <div>
      <div className="referral-program__title">
        <h4>{t("profile-page.referral-program.title")}</h4>
      </div>
      <div className="referral-program__link-block">
        {t("profile-page.referral-program.referral-link")}
        <div className="referral-program__link">{refUrl}</div>
        <GVButton color="secondary" onClick={() => copy(refUrl)} variant="text">
          <>
            <CopyIcon primary />
            &nbsp;
            {t("buttons.copy")}
          </>
        </GVButton>
        )}
      </div>
      <div className="referral-program__share-block">
        {t("profile-page.referral-program.share-your-passion")}
        {refUrl && (
          <ShareBlock
            firstName={firstName}
            lastName={lastName}
            refUrl={refUrl}
          />
        )}
      </div>
    </div>
  );
};

const _ShareBlock: React.FC<{
  firstName: string;
  lastName: string;
  refUrl: string;
}> = ({ firstName, lastName, refUrl }) => {
  const shareMessage = `Hey! ${
    firstName ? `${firstName} ` : ""
  }${lastName} has invited you to join Genesis Vision!`;
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
    <div className="referral-program__share-buttons">
      <div
        className="addthis_inline_share_toolbox"
        data-title={shareMessage}
        data-url={refUrl}
      />
      <div className="referral-program__share-buttons--email at-icon-wrapper">
        <a
          target="_blank"
          href={`mailto:?body=${rawUrlEncode(`${shareMessage} ${refUrl}`)} `}
        >
          <img src={Email} />
        </a>
      </div>
    </div>
  );
};
const ShareBlock = React.memo(_ShareBlock);

export const inviteBlockLoaderData = {
  firstName: "",
  lastName: "",
  refUrl: ""
} as ProfileFullViewModel;

export const InviteBlock = withBlurLoader(React.memo(_InviteBlock));
