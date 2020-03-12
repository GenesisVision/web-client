import SettingsBlock from "components/settings-block/settings-block";
import withLoader from "decorators/with-loader";
import { SocialLinkViewModel, UpdateSocialLinkViewModel } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import * as React from "react";
import { useCallback } from "react";

import {
  fetchSocialLinks,
  updateSocialLink
} from "../services/social-links.service";
import SocialLinkForm from "./social-link/social-link-form";
import SocialLinksLoader from "./social-links-loader";
import "./social-links.scss";

const _Links: React.FC<ILinksProps> = ({
  socialLinks,
  onSubmit,
  errorMessage
}) => (
  <div>
    {socialLinks.map(link => (
      <SocialLinkForm
        errorMessage={errorMessage}
        key={link.type}
        socialLink={link}
        onSubmit={onSubmit}
      />
    ))}
  </div>
);
const Links = React.memo(withLoader(_Links));

export type TOnEditLinkSubmitFunc = (
  values: UpdateSocialLinkViewModel
) => Promise<void>;

interface ILinksProps {
  errorMessage?: string;
  socialLinks: SocialLinkViewModel[];
  onSubmit: TOnEditLinkSubmitFunc;
}

const _SocialLinksContainer: React.FC = () => {
  const { data: socialLinks, sendRequest: getSocialLinks } = useApiRequest<
    SocialLinkViewModel[]
  >({ request: fetchSocialLinks, fetchOnMount: true });
  const { sendRequest: setSocialLinks, errorMessage } = useApiRequest({
    middleware: [getSocialLinks],
    request: updateSocialLink,
    successMessage: "profile-page.social-links.notifications.edit-success"
  });

  const handleSubmitSocialLink = useCallback(
    ({ type, value }: UpdateSocialLinkViewModel) =>
      setSocialLinks({ type, value }),
    []
  );

  return (
    <SettingsBlock>
      <Links
        errorMessage={errorMessage}
        condition={socialLinks !== undefined}
        loader={<SocialLinksLoader />}
        socialLinks={socialLinks!}
        onSubmit={handleSubmitSocialLink}
      />
    </SettingsBlock>
  );
};

const SocialLinksContainer = React.memo(_SocialLinksContainer);
export default SocialLinksContainer;
