import { ProfileFullViewModel } from "gv-api-web";
import * as React from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import GVButton from "shared/components/gv-button";
import CopyIcon from "shared/components/icon/copy-icon";
import { withBlurLoader } from "shared/decorators/with-blur-loader";
import Copy from "shared/decorators/with-copy";
import withLoader from "shared/decorators/with-loader";
import Email from "shared/media/email.svg";
import { rawUrlEncode } from "shared/utils/helpers";

const _InviteBlock: React.FC<{ data: ProfileFullViewModel }> = ({
  data: { refUrl, lastName, firstName }
}) => {
  const [t] = useTranslation();
  return (
    <div>
      <div className="referral-program__title">
        <h4>{t("profile-page.referral-program.title")}</h4>
      </div>
      <div className="referral-program__link-block">
        {t("profile-page.referral-program.referral-link")}
        <div className="referral-program__link">{refUrl}</div>
        <Copy>
          {({ copy }) => (
            <GVButton
              color="secondary"
              onClick={() => copy(refUrl)}
              variant="text"
            >
              <>
                <CopyIcon primary />
                &nbsp;
                {t("buttons.copy")}
              </>
            </GVButton>
          )}
        </Copy>
      </div>
      <div className="referral-program__share-block">
        {t("profile-page.referral-program.share-your-passion")}
        <ShareBlock
          condition={!!refUrl}
          firstName={firstName}
          lastName={lastName}
          refUrl={refUrl}
        />
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
    // @ts-ignore
    window.addthis.layers.refresh && window.addthis.layers.refresh();
    // @ts-ignore
  }, [window.addthis.layers]);
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
const ShareBlock = withLoader(React.memo(_ShareBlock));

export const inviteBlockLoaderData = {
  firstName: "",
  lastName: "",
  refUrl: ""
} as ProfileFullViewModel;

export const InviteBlock = withBlurLoader(React.memo(_InviteBlock));
