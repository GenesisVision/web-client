import "./social-links.scss";

import * as React from "react";

import { ReactComponent as Default } from "../media/default.svg";
import { ReactComponent as Facebook } from "../media/facebook.svg";
import { ReactComponent as LinkedIn } from "../media/linkedin.svg";
import { ReactComponent as Twitter } from "../media/twitter.svg";
import { ReactComponent as YouTube } from "../media/youtube.svg";
import { SocialLink, fetchSocialLinks } from "../services/social-links.service";
import SocialLinkLayout from "./social-link/social-link-layout";

class SocialLinks extends React.PureComponent<{}, State> {
  state: State = {
    socialLinks: []
  };

  componentDidMount() {
    fetchSocialLinks().then(data => {
      this.setState({ socialLinks: data });
    });
  }

  render() {
    return (
      <div className="social-links">
        {this.state.socialLinks.map(x => (
          <SocialLinkLayout key={x.id} socialLink={x} />
        ))}
      </div>
    );
  }
}

export default SocialLinks;

interface State {
  socialLinks: SocialLink[];
}
