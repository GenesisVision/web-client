import "./social-links.scss";

import { CancelablePromise, SocialLinkViewModel } from "gv-api-web";
import * as React from "react";
import withLoader from "shared/decorators/with-loader";

import {
  fetchSocialLinks,
  updateSocialLink
} from "../services/social-links.service";
import SocialLinkForm from "./social-link/social-link-form";
import SocialLinksLoader from "./social-links-loader";

const _Links: React.FC<ILinksProps> = ({ socialLinks, onSubmit }) => (
  <>
    {socialLinks.map(x => (
      <SocialLinkForm key={x.id} socialLink={x} onSubmit={onSubmit} />
    ))}
  </>
);
const Links = React.memo(withLoader(_Links));

interface ILinksProps {
  socialLinks: SocialLinkViewModel[];
  onSubmit(id: string, value: string): CancelablePromise<void>;
}

class SocialLinks extends React.PureComponent<{}, State> {
  state: State = {
    socialLinks: undefined
  };

  componentDidMount() {
    this.updateSocialLinks();
  }

  handleSubmitSocialLink = (id: string, value: string) => {
    return updateSocialLink(id, value).then(() => {
      this.updateSocialLinks();
    });
  };

  updateSocialLinks = () => {
    fetchSocialLinks().then(data => {
      this.setState({ socialLinks: data.socialLinks });
    });
  };

  render() {
    const { socialLinks } = this.state;
    return (
      <div className="social-links">
        <Links
          condition={socialLinks !== undefined}
          loader={<SocialLinksLoader />}
          socialLinks={socialLinks!}
          onSubmit={this.handleSubmitSocialLink}
        />
      </div>
    );
  }
}

export default SocialLinks;

interface State {
  socialLinks?: SocialLinkViewModel[];
}
