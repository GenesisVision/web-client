import { BitcoinIcon } from "pages/landing-page/components/social-icons/bitcoin";
import { FacebookIcon } from "pages/landing-page/components/social-icons/facebook";
import { GithubIcon } from "pages/landing-page/components/social-icons/github";
import { LinkedinIcon } from "pages/landing-page/components/social-icons/linkedin";
import { MediumIcon } from "pages/landing-page/components/social-icons/medium";
import { RedditIcon } from "pages/landing-page/components/social-icons/reddit";
import { TelegramIcon } from "pages/landing-page/components/social-icons/telegram";
import { TwitterIcon } from "pages/landing-page/components/social-icons/twitter";
import { YoutubeIcon } from "pages/landing-page/components/social-icons/youtube";
import { TIconLinks } from "pages/landing-page/static-data/app-links";

export const socialLinks: TIconLinks[] = [
  {
    name: "landing-page.social.links.telegram",
    href: "https://t.me/genesisvision",
    icon: TelegramIcon
  },
  {
    name: "landing-page.social.links.twitter",
    href: "https://twitter.com/genesis_vision/",
    icon: TwitterIcon
  },
  {
    name: "landing-page.social.links.facebook",
    href: "https://www.facebook.com/GenesisVisionProject/",
    icon: FacebookIcon
  },
  {
    name: "landing-page.social.links.github",
    href: "https://github.com/GenesisVision/",
    icon: GithubIcon
  },
  {
    name: "landing-page.social.links.youtube",
    href: "https://www.youtube.com/channel/UCnx2ja9luqWjgRt35tWR99w",
    icon: YoutubeIcon
  },
  {
    name: "landing-page.social.links.reddit",
    href: "https://www.reddit.com/r/genesisvision/",
    icon: RedditIcon
  },
  {
    name: "landing-page.social.links.linkedin",
    href: "https://www.linkedin.com/company/genesis-vision/",
    icon: LinkedinIcon
  },
  {
    name: "landing-page.social.links.medium-blog",
    href: "https://blog.genesis.vision/",
    icon: MediumIcon
  }
];
