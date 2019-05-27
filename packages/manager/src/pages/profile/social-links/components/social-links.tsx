import "./social-links.scss";

import * as React from "react";

import {
  SocialLink,
  fetchSocialLinks,
  updateSocialLink
} from "../services/social-links.service";
import SocialLinkForm from "./social-link/social-link-form";

class SocialLinks extends React.PureComponent<{}, State> {
  state: State = {
    socialLinks: []
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
      this.setState({ socialLinks: data });
    });
  };

  render() {
    const { socialLinks } = this.state;
    return (
      <div className="social-links">
        {socialLinks.map(x => (
          <SocialLinkForm
            key={x.id}
            socialLink={x}
            onSubmit={this.handleSubmitSocialLink}
          />
        ))}
      </div>
    );
  }
}

export default SocialLinks;

interface State {
  socialLinks: SocialLink[];
}
